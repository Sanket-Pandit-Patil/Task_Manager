import { useState } from "react";

function TaskInput({ onAdd, isAdding }) {
  const [value, setValue] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      setLocalError("Please enter a task before adding.");
      return;
    }

    setLocalError("");
    onAdd(trimmed, () => setValue(""));
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (localError && event.target.value.trim()) {
      setLocalError("");
    }
  };

  const errorId = localError ? "task-title-error" : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2"
      aria-label="Add task"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="task-title" className="sr-only">
          Task title
        </label>
        <input
          id="task-title"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Add a new task…"
          aria-label="Add a new task"
          aria-invalid={Boolean(localError)}
          aria-describedby={errorId}
          className="flex-1 rounded-full border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        />
        <button
          type="submit"
          disabled={isAdding}
          className="inline-flex items-center justify-center rounded-full bg-emerald-600/90 px-5 py-2.5 text-sm font-medium text-slate-50 shadow-sm transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          {isAdding ? "Adding…" : "Add"}
        </button>
      </div>

      {localError && (
        <p
          id={errorId}
          className="text-xs text-red-300"
        >
          {localError}
        </p>
      )}
    </form>
  );
}

export default TaskInput;

