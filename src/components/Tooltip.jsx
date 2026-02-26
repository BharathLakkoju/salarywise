'use client';

import { useState } from 'react';

export default function Tooltip({ text, children }) {
    const [show, setShow] = useState(false);

    return (
        <span className="tooltip-wrap" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            <span
                className="tooltip-icon"
                onClick={(e) => { e.preventDefault(); setShow(!show); }}
                aria-label="Info"
            >
                ?
            </span>
            {show && (
                <span className="tooltip-bubble" role="tooltip">
                    {text}
                    <span className="tooltip-arrow" />
                </span>
            )}
        </span>
    );
}
