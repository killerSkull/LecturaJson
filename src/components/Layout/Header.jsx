import React, { useState, useEffect } from 'react';
import { FileJson, Calculator, Share2, Check, Sun, Moon, Download, Users, HelpCircle } from 'lucide-react';
import { exportToHtml } from '../../utils/htmlExport';
import InstructionsModal from './InstructionsModal';
import { pb } from '../../lib/pocketbase';
import CountUp from '../UI/CountUp';

const Header = ({ stats, isDarkMode, onToggleTheme, data }) => {
    const [copied, setCopied] = useState(false);
    const [visitorCount, setVisitorCount] = useState(null);
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        let unsubscribe;

        const updateVisitorCount = async () => {
            try {
                // 1. Try to get the existing counter
                const records = await pb.collection('counters').getList(1, 1, {
                    requestKey: null // Disable auto-cancellation
                });

                if (records.items.length > 0) {
                    const counter = records.items[0];

                    // 2. Check LocalStorage for deduplication
                    const hasVisited = localStorage.getItem('visitor_counted');

                    if (!hasVisited) {
                        // Atomic increment only if not visited
                        const updated = await pb.collection('counters').update(counter.id, {
                            "visitors+": 1
                        }, { requestKey: null }); // Disable auto-cancellation
                        setVisitorCount(updated.visitors);
                        localStorage.setItem('visitor_counted', 'true');
                    } else {
                        // Just display current count without incrementing
                        setVisitorCount(counter.visitors);
                    }

                    // 3. Realtime Subscription
                    unsubscribe = await pb.collection('counters').subscribe(counter.id, (e) => {
                        if (e.action === 'update') {
                            setVisitorCount(e.record.visitors);
                        }
                    });

                } else {
                    // 3. Create if doesn't exist (First ever visit)
                    const created = await pb.collection('counters').create({
                        visitors: 1
                    }, { requestKey: null }); // Disable auto-cancellation
                    setVisitorCount(created.visitors);
                    localStorage.setItem('visitor_counted', 'true');

                    // Subscribe to the newly created record
                    unsubscribe = await pb.collection('counters').subscribe(created.id, (e) => {
                        if (e.action === 'update') {
                            setVisitorCount(e.record.visitors);
                        }
                    });
                }
            } catch (error) {
                console.error("PocketBase Error:", error);
                // Fallback to local storage or just silent fail
            }
        };

        updateVisitorCount();

        // Cleanup
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <header className="h-14 bg-background-secondary border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-50 transition-colors duration-300">
                <div className="flex items-center gap-2 md:gap-3">
                    <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-accent/20" />

                    <div className="font-bold text-base md:text-lg tracking-tight bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                        <span className="block sm:hidden">Json CV</span>
                        <span className="hidden sm:block">JSON Content Viewer</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 text-sm text-text-secondary">
                    {/* Visitor Counter */}
                    {visitorCount !== null && (
                        <div className="flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/5 bg-background-primary/50 text-[10px] md:text-xs">
                            <Users size={12} className="text-accent" />
                            <span>
                                <CountUp end={visitorCount} /> <span className="hidden sm:inline">visit.</span>
                            </span>
                        </div>
                    )}

                    {stats && (
                        <div className="flex items-center gap-1.5 bg-background-primary px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/5 shadow-sm text-[10px] md:text-sm">
                            <Calculator size={14} />
                            <span>{stats.count} <span className="hidden sm:inline">Items</span></span>
                        </div>
                    )}

                    <button
                        onClick={() => setShowInstructions(true)}
                        className="p-1.5 md:p-2 rounded-full hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
                        title="Instrucciones"
                    >
                        <HelpCircle size={18} />
                    </button>

                    <div className="h-4 w-px bg-white/10 mx-0.5 md:mx-1" />

                    <button
                        onClick={() => exportToHtml(data)}
                        className="p-1.5 md:p-2 rounded-full hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
                        title="Export as HTML"
                    >
                        <Download size={18} />
                    </button>

                    <button
                        onClick={onToggleTheme}
                        className="p-1.5 md:p-2 rounded-full hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all active:scale-95 text-[10px] md:text-sm"
                        title="Copy Shareable Link"
                    >
                        {copied ? <Check size={14} /> : <Share2 size={14} />}
                        <span className="font-medium hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
                    </button>
                </div>
            </header>

            {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
        </>
    );
};

export default Header;
