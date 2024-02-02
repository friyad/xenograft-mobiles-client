import { api } from "@/redux/api/apiSlice";
import { SignInCredentials, SignUpCredentials } from "@/types/globalTypes";
import { handleErrorResponse } from "@/utils/authUtils";

const authAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    handleSignUp: builder.mutation({
      query: (data: SignUpCredentials) => ({
        url: "/signup",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      transformErrorResponse: handleErrorResponse,
    }),

    handleSignIn: builder.mutation({
      query: (data: SignInCredentials) => ({
        url: "/signin",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      transformErrorResponse: handleErrorResponse,
    }),

    getMe: builder.query({
      query: () => ({
        url: "/me",
        credentials: "include",
        cache: "reload",
      }),
    }),

    signOut: builder.mutation({
      query: () => ({
        url: "/sign-out",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useHandleSignUpMutation,
  useHandleSignInMutation,
  useLazyGetMeQuery,
  useSignOutMutation,
} = authAPI;
