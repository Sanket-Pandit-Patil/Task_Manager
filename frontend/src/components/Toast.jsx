function Toast({ message, open }) {
  if (!open || !message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div className="pointer-events-auto rounded-full border border-emerald-400/60 bg-emerald-700/90 px-4 py-2 text-xs font-medium text-slate-50 shadow-md">
        {message}
      </div>
    </div>
  );
}

export default Toast;

