function StatPill({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl bg-slate-900/70 px-3 py-2 text-xs text-slate-300 border border-white/5">
      <span className="text-[10px] uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-100">{value}</span>
    </div>
  );
}

function StatsBar({ total, completed, pending }) {
  return (
    <div
      className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-400"
      aria-label="Task statistics"
    >
      <StatPill label="Total" value={total} />
      <StatPill label="Completed" value={completed} />
      <StatPill label="Pending" value={pending} />
    </div>
  );
}

export default StatsBar;

