import { useEffect, useMemo, useRef, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "./api.js";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import StatsBar from "./components/StatsBar.jsx";
import AlertBanner from "./components/AlertBanner.jsx";
import Toast from "./components/Toast.jsx";
import ConfirmModal from "./components/ConfirmModal.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingToggleIds, setPendingToggleIds] = useState(new Set());
  const [pendingDeleteIds, setPendingDeleteIds] = useState(new Set());
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const toastTimeoutRef = useRef(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getTasks()
      .then((data) => {
        if (!isMounted) return;
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to load tasks");
      })
      .finally(() => {
        if (isMounted) setIsInitialLoading(false);
      });

    return () => {
      isMounted = false;
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastOpen(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setIsToastOpen(false);
    }, 2000);
  };

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      ),
    [tasks]
  );

  const totalCount = sortedTasks.length;
  const completedCount = sortedTasks.filter((task) => task.completed).length;
  const pendingCount = totalCount - completedCount;

  const handleAddTask = (title, onSuccess) => {
    if (!title.trim()) return;

    setIsAdding(true);
    setError(null);

    createTask(title)
      .then((created) => {
        setTasks((prev) => [created, ...prev]);
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        setError(err.message || "Failed to add task");
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  const handleToggle = (task) => {
    const id = task.id;
    const nextCompleted = !task.completed;

    setError(null);
    setPendingToggleIds((prev) => new Set(prev).add(id));

    const previousTasks = tasks;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
            ...t,
            completed: nextCompleted
          }
          : t
      )
    );

    updateTask(id, { completed: nextCompleted })
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
        );
        if (nextCompleted) {
          showToast(`"${task.title}" Task completed`);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to update task, reverting change");
        setTasks(previousTasks);
      })
      .finally(() => {
        setPendingToggleIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      });
  };

  const requestDelete = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    const id = taskToDelete.id;
    setError(null);

    setPendingDeleteIds((prev) => new Set(prev).add(id));
    const previousTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));

    deleteTask(id)
      .catch((err) => {
        setError(err.message || "Failed to delete task, restoring it");
        setTasks(previousTasks);
      })
      .finally(() => {
        setPendingDeleteIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        setTaskToDelete(null);
      });
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen px-4 py-10 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <main className="flex flex-1 flex-col justify-center">
          <section className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm shadow-sm">
            <header className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight text-white">
                  Task Manager
                </h1>
                <p className="text-sm text-slate-400">
                  Add tasks, complete them, and stay organized.
                </p>
              </div>

              <StatsBar
                total={totalCount}
                completed={completedCount}
                pending={pendingCount}
              />

              <div className="h-px w-full bg-white/10" />
            </header>

            {error && (
              <AlertBanner message={error} onDismiss={handleDismissError} />
            )}

            <TaskInput onAdd={handleAddTask} isAdding={isAdding} />

            <TaskList
              tasks={sortedTasks}
              isLoading={isInitialLoading}
              pendingToggleIds={pendingToggleIds}
              pendingDeleteIds={pendingDeleteIds}
              onToggle={handleToggle}
              onDelete={requestDelete}
            />
          </section>

        </main>
      </div>

      <Toast message={toastMessage} open={isToastOpen} />

      <ConfirmModal
        open={Boolean(taskToDelete)}
        title="Delete task?"
        message={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
            : ""
        }
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;

