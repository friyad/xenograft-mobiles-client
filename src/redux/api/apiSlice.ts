import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://xenograft-mobiles-server.vercel.app/api/v1",
  }),
  tagTypes: ["smartphones", "singlePhone", "sales"],
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
