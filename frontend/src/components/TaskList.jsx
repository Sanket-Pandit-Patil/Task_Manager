import TaskItem from "./TaskItem.jsx";

function SkeletonRow() {
  return (
    <div className="flex min-h-[3rem] items-center justify-between gap-3 rounded-2xl border border-white/5 bg-slate-900/60 px-3 py-3">
      <div className="flex flex-1 items-center gap-3">
        <div className="h-5 w-5 rounded-full bg-slate-800/70" />
        <div className="h-3 flex-1 rounded bg-slate-800/70" />
      </div>
      <div className="h-7 w-14 rounded-full bg-slate-800/70" />
    </div>
  );
}

function TaskList({
  tasks,
  isLoading,
  pendingToggleIds,
  pendingDeleteIds,
  onToggle,
  onDelete
}) {
  if (isLoading) {
    return (
      <div className="mt-4 space-y-2" aria-label="Loading tasks">
        <div className="space-y-2 animate-pulse">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center text-sm text-slate-400">
        <span className="text-xl">📋</span>
        <p className="max-w-xs">
          You don&apos;t have any tasks yet. Add your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-2" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isToggling={pendingToggleIds.has(task.id)}
          isDeleting={pendingDeleteIds.has(task.id)}
        />
      ))}
    </ul>
  );
}

export default TaskList;

