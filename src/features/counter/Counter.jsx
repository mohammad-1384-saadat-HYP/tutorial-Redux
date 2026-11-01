"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  selectCount,
} from "./counterSlice";

export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(5);

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col items-center"
    >
      {/* هدر کانتر */}
      <div className="w-full flex items-center justify-between pb-5 mb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-inner">
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
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </div>
          <div className="text-right">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              شمارنده (Counter)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              مدیریت استیت سراسری با Redux Toolkit
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
          Redux State
        </span>
      </div>

      {/* نمایش عدد شمارنده */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="absolute -inset-4 bg-violet-500/20 rounded-full blur-2xl opacity-50"></div>
        <div className="relative text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 tabular-nums select-none tracking-tight">
          {count}
        </div>
      </div>

      {/* دکمه‌های کنترلی اصلی */}
      <div className="flex items-center gap-3 my-6 w-full justify-center">
        <button
          onClick={() => dispatch(decrement())}
          className="flex-1 max-w-[100px] h-12 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 active:scale-95 text-rose-300 font-bold text-xl rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center"
          title="کاهش یک واحد"
        >
          -۱
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="flex-1 max-w-[110px] h-12 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 text-zinc-300 font-semibold text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
          title="ریست شمارنده"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>ریست</span>
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="flex-1 max-w-[100px] h-12 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 active:scale-95 text-emerald-300 font-bold text-xl rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center"
          title="افزایش یک واحد"
        >
          +۱
        </button>
      </div>

      {/* افزودن مقدار سفارشی */}
      <div className="w-full pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <span className="text-xs text-zinc-400">مقدار دلخواه:</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-20 h-10 bg-black/40 border border-white/10 rounded-xl text-center font-bold text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <button
          onClick={() => dispatch(incrementByAmount(amount))}
          className="w-full sm:w-auto px-5 h-10 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-medium text-xs sm:text-sm rounded-xl shadow-lg shadow-violet-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>افزودن به شمارنده</span>
          <span className="font-bold">({amount >= 0 ? `+${amount}` : amount})</span>
        </button>
      </div>
    </div>
  );
}
