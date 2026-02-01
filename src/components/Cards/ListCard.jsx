import React from 'react';
import { List } from 'lucide-react';

const ListCard = ({ item }) => {
    return (
        <div className="bg-background-card rounded-xl border border-white/5 p-5 animate-fade-in">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
                <List size={18} className="text-accent" />
                <h3 className="font-semibold text-text-primary">
                    {item.title || 'List'}
                </h3>
            </div>
            <ul className="space-y-2">
                {item.items?.map((listItem, idx) => {
                    const isLink = typeof listItem === 'object' && listItem.url;
                    const content = isLink ? (
                        <a
                            href={listItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline hover:text-accent/80 transition-colors"
                        >
                            {listItem.title || listItem.url}
                        </a>
                    ) : (
                        <span className="leading-relaxed">{typeof listItem === 'object' ? listItem.title : listItem}</span>
                    );

                    return (
                        <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-1.5 shrink-0" />
                            {content}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListCard;
