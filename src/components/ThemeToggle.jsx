'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [dark, setDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme');
        if (stored === 'light') {
            setDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        if (next) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    if (!mounted) return <div className="w-10 h-10" />;

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative w-10 h-10 rounded-full bg-slate-700 dark:bg-slate-700 hover:bg-slate-600
                 flex items-center justify-center transition-all duration-300
                 shadow-md hover:shadow-lg group"
        >
            <span className="text-lg transition-transform duration-500 group-hover:rotate-45">
                {dark ? '🌙' : '☀️'}
            </span>
        </button>
    );
}
