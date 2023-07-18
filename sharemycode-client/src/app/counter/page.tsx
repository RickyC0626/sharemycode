"use client";

import React from "react";
import type { RootState } from "../../../lib/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../../lib/redux/features/counter/counterSlice";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className="p-3 border-2 rounded-lg"
        >
          Increment
        </button>
        <span className="px-8">{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="p-3 border-2 rounded-lg"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
