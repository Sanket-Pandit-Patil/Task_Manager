function AlertBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-2 rounded-xl border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-100"
    >
      <span className="mt-0.5 text-red-300">⚠️</span>
      <p className="flex-1 leading-snug">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-red-900/60 text-[10px] text-red-200 hover:bg-red-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}

export default AlertBanner;

