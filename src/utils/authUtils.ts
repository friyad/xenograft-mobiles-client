import { setAuth } from "@/redux/features/auth/authSlice";
import store from "@/redux/store";
import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  QueryDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export const handleGetMeCall = async (
  getMe: LazyQueryTrigger<
    QueryDefinition<
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      any,
      "api"
    >
  >
) => {
  const res = await getMe(undefined, true);
  if (res.isSuccess) {
    const state = {
      isAuthenticated: true,
      user: res.data,
      isLoading: res.isLoading,
    };
    store.dispatch(setAuth(state));
  }
  if (res.isError) {
    const state = {
      isAuthenticated: false,
      user: null,
      isLoading: res.isLoading,
    };
    store.dispatch(setAuth(state));
  }
};

export const handleAuthErr = (result: any) => {
  if (result?.data?.message) {
    return {
      status: false,
      message: result.data.message,
    };
  } else if (result?.data?.error?.issues) {
    return {
      status: false,
      name: result.data.error.name,
      message: result.data.error.issues[0].message,
    };
  }
  return {
    status: false,
    message: "Something wrong here! Please try again later",
  };
};
