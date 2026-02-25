export default function AdSlot({ position = 'inline', className = '' }) {
    return (
        <div
            className={`ad-slot ad-slot-${position} ${className}`}
            data-ad-position={position}
        >
            <div className="border border-dashed border-slate-600 dark:border-slate-700 rounded-lg
                      bg-slate-800/30 dark:bg-slate-800/20
                      flex items-center justify-center text-slate-500 text-xs
                      min-h-[90px] p-4">
                {/* Google AdSense code will be injected here */}
                <span>Advertisement</span>
            </div>
        </div>
    );
}
