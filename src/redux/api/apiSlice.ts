import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: () => ({}),
});

export const uploadAPI = createApi({
  reducerPath: "uploadAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image`,
  }),
  endpoints: () => ({}),
});
