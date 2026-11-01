"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setTodos,
  selectTodos,
} from "./todoSlice";

export default function TodoList() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  // کنترل همگام‌سازی کلاینت با localStorage برای جلوگیری از Hydration Mismatch
  const [isMounted, setIsMounted] = useState(false);

  // استیت‌های فرم افزودن تسک
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // استیت ویرایش تسک
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // فیلتر (all, active, completed)
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("todos");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch(setTodos(parsed));
        }
      }
    } catch (e) {
      console.error("خطا در بارگذاری تسک‌ها از localStorage:", e);
    }
  }, [dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addTodo({
        title: title.trim(),
        description: description.trim(),
      }),
    );

    setTitle("");
    setDescription("");
    setIsExpanded(false);
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const saveEdit = (id) => {
    if (!editTitle.trim()) return;
    dispatch(
      editTodo({
        id,
        title: editTitle.trim(),
        description: editDescription.trim(),
      }),
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // فیلتر کردن آیتم‌ها
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.isCompleted).length;
  const activeCount = totalCount - completedCount;

  if (!isMounted) {
    return (
      <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl animate-pulse">
        <div className="h-8 bg-white/10 rounded-xl w-48 mb-6"></div>
        <div className="h-14 bg-white/5 rounded-2xl w-full mb-6"></div>
        <div className="space-y-3">
          <div className="h-16 bg-white/5 rounded-2xl w-full"></div>
          <div className="h-16 bg-white/5 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all"
    >
      {/* سربرگ و آمار */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              مدیریت وظایف (Todos)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              مدیریت تسک‌ها با قابلیت ذخیره خودکار در مرورگر
            </p>
          </div>
        </div>

        {/* برچسب‌های آمار */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-black/40 p-1.5 rounded-xl border border-white/5 text-xs font-medium">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300">
            کل: {totalCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            تکمیل: {completedCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            باقی‌مانده: {activeCount}
          </span>
        </div>
      </div>

      {/* فرم افزودن تسک جدید */}
      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="bg-black/30 border border-white/10 rounded-2xl p-3 sm:p-4 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="عنوان تسک جدید را وارد کنید..."
              className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 outline-none"
            />
            <button
              type="submit"
              disabled={!title.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>افزودن</span>
            </button>
          </div>

          {/* فیلد توضیحات اضافی که با کلیک باز می‌شود */}
          {(isExpanded || description) && (
            <div className="mt-3 pt-3 border-t border-white/5 animate-fadeIn">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="توضیحات اختیاری درباره این تسک..."
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-300 placeholder-zinc-500 outline-none resize-none"
              />
              <div className="flex justify-between items-center text-[11px] text-zinc-500 mt-1">
                <span>می‌توانید بعداً این تسک را ویرایش کنید</span>
                <button
                  type="button"
                  onClick={() => {
                    if (!description) setIsExpanded(false);
                  }}
                  className="hover:text-zinc-300 transition"
                >
                  بستن توضیحات
                </button>
              </div>
            </div>
          )}
        </div>
      </form>

      {/* تب‌های فیلتر */}
      <div className="flex items-center gap-2 mb-4 pb-2 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition cursor-pointer ${
            filter === "all"
              ? "bg-white text-black shadow-md font-semibold"
              : "text-zinc-400 hover:text-white bg-white/5"
          }`}
        >
          همه ({totalCount})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition cursor-pointer ${
            filter === "active"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
              : "text-zinc-400 hover:text-white bg-white/5"
          }`}
        >
          در حال انجام ({activeCount})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition cursor-pointer ${
            filter === "completed"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold"
              : "text-zinc-400 hover:text-white bg-white/5"
          }`}
        >
          تکمیل شده ({completedCount})
        </button>
      </div>

      {/* لیست تسک‌ها یا حالت خالی (Empty State) */}
      <div className="space-y-3 min-h-[220px]">
        {filteredTodos.length === 0 ? (
          /* Empty State با UX عالی */
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 my-4">
            <div className="w-16 h-16 rounded-3xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-zinc-400 mb-4 shadow-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              {filter === "all"
                ? "هنوز هیچ تسکی ثبت نشده است!"
                : filter === "completed"
                  ? "هیچ تسک تکمیل‌شده‌ای ندارید"
                  : "هیچ تسک در حال انجامی وجود ندارد"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-4">
              {filter === "all"
                ? "کارهای روزمره‌تان را از کادر بالا اضافه کنید تا همیشه مرتب و متمرکز بمانید."
                : "می‌توانید با تیک زدن تسک‌ها وضعیت آن‌ها را تغییر دهید."}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => {
            const isEditing = editingId === todo.id;

            return (
              <div
                key={todo.id}
                className={`group relative p-4 rounded-2xl border transition-all ${
                  todo.isCompleted
                    ? "bg-zinc-950/40 border-white/5 opacity-75"
                    : "bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.06] shadow-sm"
                }`}
              >
                {isEditing ? (
                  /* حالت ویرایش (Edit Mode) */
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="عنوان جدید..."
                      className="w-full bg-black/40 border border-indigo-500/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      autoFocus
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      placeholder="توضیحات جدید..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/40 resize-none"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white rounded-lg transition"
                      >
                        انصراف
                      </button>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        disabled={!editTitle.trim()}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow transition"
                      >
                        ذخیره تغییرات
                      </button>
                    </div>
                  </div>
                ) : (
                  /* حالت عادی نمایش */
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* دکمه چک باکس با استایل شیک */}
                      <button
                        onClick={() => dispatch(toggleTodo(todo.id))}
                        aria-label="تغییر وضعیت تسک"
                        className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                          todo.isCompleted
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30"
                            : "border-zinc-500 hover:border-indigo-400 bg-white/5"
                        }`}
                      >
                        {todo.isCompleted && (
                          <svg
                            className="w-4 h-4 stroke-[3]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-sm sm:text-base font-semibold transition-all break-words ${
                              todo.isCompleted
                                ? "line-through text-zinc-500"
                                : "text-white"
                            }`}
                          >
                            {todo.title}
                          </h4>
                          {todo.isCompleted ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                              تکمیل شد
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                              فعال
                            </span>
                          )}
                        </div>

                        {todo.description && (
                          <p
                            className={`text-xs mt-1.5 leading-relaxed break-words ${
                              todo.isCompleted
                                ? "text-zinc-600 line-through"
                                : "text-zinc-400"
                            }`}
                          >
                            {todo.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* دکمه‌های عملیات (ویرایش و حذف) */}
                    <div className="flex items-center gap-1 flex-shrink-0 opacity-90 sm:opacity-75 sm:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditing(todo)}
                        title="ویرایش تسک"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-400 hover:bg-white/5 transition"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => dispatch(deleteTodo(todo.id))}
                        title="حذف تسک"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
