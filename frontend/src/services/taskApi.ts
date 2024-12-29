import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

const baseQueryWithLogging = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    console.log(`Base URL: ${import.meta.env.VITE_BACKEND_URL}`);
    return headers;
  },
});

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: async (args, api, extraOptions) => {
    const method = typeof args === "string" ? "GET" : args.method || "GET";
    const url = typeof args === "string" ? args : args.url || "unknown";
    console.log(`Solicitud: [${method}] ${url}`);
    const result = await baseQueryWithLogging(args, api, extraOptions);
    console.log("Resultado:", result);
    return result;
  },
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    getTasks: builder.query({
      query: (status) => {
        const queryParam = status ? `?status=${status}` : "";
        return `/tasks${queryParam}`;
      },
      providesTags: ["Task"],
    }),
    getTasksByUserId: builder.query({
      query: (userId) => `/tasks/user/${userId}`,
      providesTags: ["Task"],
    }),
    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetTasksByUserIdQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
