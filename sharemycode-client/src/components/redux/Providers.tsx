"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../state/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
