function TaskItem({ task, onToggle, onDelete, isToggling, isDeleting }) {
  const handleToggle = () => {
    if (!isToggling && !isDeleting) {
      onToggle(task);
    }
  };

  const handleDelete = () => {
    if (!isDeleting) {
      onDelete(task);
    }
  };

  const isCompleted = Boolean(task.completed);

  return (
    <li className="group flex min-h-[3rem] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-3 text-sm backdrop-blur-sm transition-colors hover:border-emerald-500/40">
      <button
        type="button"
        onClick={handleToggle}
        role="checkbox"
        aria-checked={isCompleted}
        className="flex flex-1 items-center gap-3 rounded-xl px-1 py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500/60 bg-slate-950 shadow-sm"
          aria-hidden="true"
        >
          <span
            className={`h-2.5 w-2.5 rounded-full bg-emerald-400 transition-opacity ${
              isCompleted ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>

        <div className="flex flex-1 flex-col gap-0.5">
          <span
            className={`break-words text-[0.92rem] ${
              isCompleted ? "line-through text-slate-400 opacity-70" : "text-slate-100"
            }`}
          >
            {task.title}
          </span>
          {isCompleted && (
            <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-emerald-300">
              Completed
            </span>
          )}
        </div>
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="ml-1 inline-flex h-8 items-center rounded-full border border-red-500/40 bg-red-900/20 px-3 text-xs font-medium text-red-200 transition-colors hover:bg-red-900/40 hover:text-red-50 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        aria-label={`Delete task: ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;

