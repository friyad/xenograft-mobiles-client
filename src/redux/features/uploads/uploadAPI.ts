import { uploadAPI } from "@/redux/api/apiSlice";

const extendedUploadAPI = uploadAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation({
      query: (data: FormData) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      transformResponse: (result: any, meta, arg) => {
        return result.secure_url;
      },
    }),
  }),
});

export const { useUploadPhotoMutation } = extendedUploadAPI;
