'use client';

import { useState, useEffect, useRef } from 'react';

export default function Tooltip({ text, children }) {
    const [show, setShow] = useState(false);
    const [mounted, setMounted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close tooltip when clicking outside
    useEffect(() => {
        if (!show) return;
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShow(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [show]);

    return (
        <span className="tooltip-wrap" ref={ref} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            <span
                className="tooltip-icon"
                role="button"
                tabIndex={0}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShow(!show); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShow(!show); } }}
                aria-label="More info"
            >
                ?
            </span>
            {mounted && show && (
                <span className="tooltip-bubble" role="tooltip">
                    {text}
                    <span className="tooltip-arrow" />
                </span>
            )}
        </span>
    );
}
