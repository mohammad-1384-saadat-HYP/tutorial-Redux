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
  const [amount, setAmount] = useState(2);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md max-w-md w-full text-white">
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
        Redux Counter
      </h2>
      <div className="text-6xl font-extrabold my-6 tabular-nums text-foreground">
        {count}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => dispatch(decrement())}
          className="px-5 py-2.5 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold rounded-lg shadow transition cursor-pointer"
        >
          -1
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 active:scale-95 text-white font-semibold rounded-lg shadow transition cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-5 py-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold rounded-lg shadow transition cursor-pointer"
        >
          +1
        </button>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-white/10 w-full justify-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || 0)}
          className="w-20 px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-center font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => dispatch(incrementByAmount(amount))}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold rounded-lg shadow transition cursor-pointer"
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
