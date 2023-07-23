import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import fileExplorerReducer from "./file-explorer/fileExplorerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fileExplorer: fileExplorerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
