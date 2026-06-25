import { apiSlice } from "../../app/api/apiSlice";
import { AuthResponse, LoginRequest, RegisterRequest } from "./type";


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation<
      AuthResponse,
      RegisterRequest
    >({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApiSlice;