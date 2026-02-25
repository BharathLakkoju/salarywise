'use client';

import { useRef, useEffect, useState } from 'react';
import { formatINR, formatINRCompact } from '@/lib/taxEngine';

// ─── Hook: re-render when dark mode toggles ──
function useDarkMode() {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);
    return isDark;
}

// ─── Color Palette ────────────────────
const COLORS = {
    emerald: '#34d399',
    blue: '#60a5fa',
    amber: '#fbbf24',
    rose: '#fb7185',
    violet: '#a78bfa',
};

const PIE_COLORS = [COLORS.emerald, COLORS.blue, COLORS.amber, COLORS.rose, COLORS.violet];

// ─── Detect theme via class, not CSS vars (canvas can't resolve @theme inline) ──
function getThemeColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark
        ? { text: '#ffffff', muted: '#ffffff', bg: '#18181b' }
        : { text: '#000000', muted: '#000000', bg: '#ffffff' };
}

// ─── Pie Chart ────────────────────────
function PieChart({ data, title, isDark }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const colors = getThemeColors();

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(cx, cy) - 40;
        const total = data.reduce((s, d) => s + d.value, 0);

        ctx.clearRect(0, 0, w, h);

        let startAngle = -Math.PI / 2;
        data.forEach((item, i) => {
            const sliceAngle = (item.value / total) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = PIE_COLORS[i % PIE_COLORS.length];
            ctx.fill();

            // percentage label inside slice
            if (item.value / total > 0.05) {
                const midAngle = startAngle + sliceAngle / 2;
                const labelRadius = radius * 0.65;
                const lx = cx + Math.cos(midAngle) * labelRadius;
                const ly = cy + Math.sin(midAngle) * labelRadius;
                ctx.fillStyle = '#fff';
                ctx.font = '600 11px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${Math.round((item.value / total) * 100)}%`, lx, ly);
            }
            startAngle += sliceAngle;
        });

        // inner circle (donut hole)
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = colors.bg;
        ctx.fill();

        // center label
        ctx.fillStyle = colors.text;
        ctx.font = '700 14px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(title || '', cx, cy);
    }, [data, title, isDark]);

    return (
        <div>
            <canvas ref={canvasRef} className="w-full" style={{ height: 260 }} />
            <div className="flex flex-wrap justify-center gap-3 mt-3">
                {data.map((item, i) => (
                    <div key={item.label} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--foreground)' }}>
                        <span
                            className="w-3 h-3 rounded-sm inline-block"
                            style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                        />
                        <span>{item.label}: {formatINR(item.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Bar Chart ─────────────────────────
function BarChart({ newRegime, oldRegime, isDark }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const colors = getThemeColors();

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const padding = { top: 40, right: 20, bottom: 60, left: 20 };
        const chartW = w - padding.left - padding.right;
        const chartH = h - padding.top - padding.bottom;

        ctx.clearRect(0, 0, w, h);

        const categories = [
            { label: 'Taxable Income', newVal: newRegime.taxableIncome, oldVal: oldRegime.taxableIncome },
            { label: 'Total Tax', newVal: newRegime.totalTax, oldVal: oldRegime.totalTax },
            { label: 'Monthly Net', newVal: newRegime.monthlyTakeHome, oldVal: oldRegime.monthlyTakeHome },
        ];

        const maxVal = Math.max(...categories.flatMap((c) => [c.newVal, c.oldVal])) * 1.2;
        const groupWidth = chartW / categories.length;
        const barWidth = groupWidth * 0.22;
        const gap = barWidth * 1.2; // wider gap between paired bars

        categories.forEach((cat, i) => {
            const groupX = padding.left + i * groupWidth + groupWidth / 2;

            // New regime bar
            const newH = maxVal > 0 ? (cat.newVal / maxVal) * chartH : 0;
            const newX = groupX - barWidth - gap / 2;
            const newY = padding.top + chartH - newH;

            const r = 3;
            if (newH > 0) {
                ctx.beginPath();
                ctx.moveTo(newX + r, newY);
                ctx.lineTo(newX + barWidth - r, newY);
                ctx.quadraticCurveTo(newX + barWidth, newY, newX + barWidth, newY + r);
                ctx.lineTo(newX + barWidth, newY + newH);
                ctx.lineTo(newX, newY + newH);
                ctx.lineTo(newX, newY + r);
                ctx.quadraticCurveTo(newX, newY, newX + r, newY);
                ctx.closePath();
                ctx.fillStyle = COLORS.emerald;
                ctx.fill();
            }

            // Old regime bar
            const oldH = maxVal > 0 ? (cat.oldVal / maxVal) * chartH : 0;
            const oldX = groupX + gap / 2;
            const oldY = padding.top + chartH - oldH;

            if (oldH > 0) {
                ctx.beginPath();
                ctx.moveTo(oldX + r, oldY);
                ctx.lineTo(oldX + barWidth - r, oldY);
                ctx.quadraticCurveTo(oldX + barWidth, oldY, oldX + barWidth, oldY + r);
                ctx.lineTo(oldX + barWidth, oldY + oldH);
                ctx.lineTo(oldX, oldY + oldH);
                ctx.lineTo(oldX, oldY + r);
                ctx.quadraticCurveTo(oldX, oldY, oldX + r, oldY);
                ctx.closePath();
                ctx.fillStyle = COLORS.blue;
                ctx.fill();
            }

            // Value labels — placed ABOVE each bar, staggered so they don't overlap
            ctx.font = '600 10px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';

            // New regime label — offset left and higher
            if (cat.newVal > 0) {
                ctx.fillStyle = '#059669';
                ctx.fillText(formatINRCompact(cat.newVal), newX + barWidth / 2, newY - 8);
            }
            // Old regime label — offset right, slightly lower position
            if (cat.oldVal > 0) {
                ctx.fillStyle = '#3b82f6';
                ctx.fillText(formatINRCompact(cat.oldVal), oldX + barWidth / 2, oldY - 8);
            }

            // Category label — single line below x-axis
            ctx.fillStyle = colors.text;
            ctx.font = '500 11px Inter, system-ui, sans-serif';
            ctx.fillText(cat.label, groupX, padding.top + chartH + 20);
        });

        // Legend at bottom
        const legendY = h - 14;
        ctx.fillStyle = COLORS.emerald;
        ctx.fillRect(w / 2 - 100, legendY - 9, 10, 10);
        ctx.fillStyle = colors.text;
        ctx.font = '500 11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('New Regime', w / 2 - 86, legendY);

        ctx.fillStyle = COLORS.blue;
        ctx.fillRect(w / 2 + 16, legendY - 9, 10, 10);
        ctx.fillStyle = colors.text;
        ctx.fillText('Old Regime', w / 2 + 30, legendY);
    }, [newRegime, oldRegime, isDark]);

    return <canvas ref={canvasRef} className="w-full" style={{ height: 320 }} />;
}

// ─── Main Charts Component ──────────────
export default function Charts({ result, regime }) {
    const isDark = useDarkMode();
    if (!result) return null;

    const { newRegime, oldRegime, inputs } = result;
    const activeData = regime === 'old' ? oldRegime : newRegime;

    const pieData = [
        { label: 'Take-Home', value: activeData.annualTakeHome },
        { label: 'Income Tax', value: activeData.totalTax },
        { label: 'Basic', value: inputs.basic },
        { label: 'HRA', value: inputs.hra },
    ].filter((d) => d.value > 0);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-center">
                <span className="gradient-text">📊 Visual Breakdown</span>
            </h3>

            <div className={`grid gap-6 ${regime === 'compare' ? 'md:grid-cols-2' : 'grid-cols-1 max-w-lg mx-auto'}`}>
                {/* Pie Chart */}
                <div className="chart-card">
                    <h4 className="chart-title">Salary Composition</h4>
                    <PieChart data={pieData} title={regime === 'old' ? 'Old' : 'New'} isDark={isDark} />
                </div>

                {/* Bar Chart (compare only) */}
                {regime === 'compare' && (
                    <div className="chart-card">
                        <h4 className="chart-title">Regime Comparison</h4>
                        <BarChart newRegime={newRegime} oldRegime={oldRegime} isDark={isDark} />
                    </div>
                )}
            </div>
        </div>
    );
}
