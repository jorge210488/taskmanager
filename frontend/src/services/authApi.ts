import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithLogging = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers) => {
    // console.log(`Base URL: ${import.meta.env.VITE_BACKEND_URL}`);
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: async (args, api, extraOptions) => {
    // console.log(`Solicitud: [${args.method || "GET"}] ${args.url}`);
    const result = await baseQueryWithLogging(args, api, extraOptions);
    // console.log("Resultado:", result);
    return result;
  },
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllUsers: builder.query({
      query: () => "/auth",
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/auth/${id}`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/auth/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi;
