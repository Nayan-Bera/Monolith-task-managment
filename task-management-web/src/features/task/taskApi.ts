import { apiSlice } from "../../app/api/apiSlice";
import type {
  Task,
  TaskResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
} from "./type";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<TaskResponse, void>({
      query: () => "/task/get",

      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (body) => ({
        url: "/task/add",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<
      Task,
      { id: string } & UpdateTaskRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/task/update/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/task/delete/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;