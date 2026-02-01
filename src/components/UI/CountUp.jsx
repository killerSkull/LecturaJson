import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const start = count; // Start from current displayed value

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation (easeOutExpo)
            const easeOutExpo = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);

            const current = Math.floor(start + (end - start) * easeOutExpo(progress));
            setCount(current);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [end, duration]); // Re-run when target 'end' changes

    return <span>{count.toLocaleString()}</span>;
};

export default CountUp;
