import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { taskApi } from "../services/taskApi";
import authReducer from "./authSlice";
import taskReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
