import { api } from "@/redux/api/apiSlice";
import { ISmartPhone2, UpdateSpArg } from "@/types/globalTypes";
import { handlePhoneErr } from "@/utils/smartphoneUtils";

const inventoryAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getSmartphones: builder.query({
      query: () => ({
        url: "/smartphones",
        credentials: "include",
      }),
      providesTags: ["smartphones"],
    }),
    getSingleSmartphone: builder.query({
      query: (id: string) => ({
        url: `/smartphone/${id}`,
        credentials: "include",
      }),
      providesTags: (res, err, arg) => [{ type: "singlePhone", id: arg }],
    }),
    addSmartphone: builder.mutation({
      query: (data: ISmartPhone2) => ({
        url: "/smartphone",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      transformErrorResponse: handlePhoneErr,
      invalidatesTags: ["smartphones"],
    }),
    deleteSmartphoens: builder.mutation({
      query: (data: { smartphones: string[] }) => ({
        url: "/smartphones",
        method: "DELETE",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["smartphones"],
    }),
    updateSmartphone: builder.mutation({
      query: (data: UpdateSpArg) => ({
        url: `/smartphone/${data.id}`,
        method: "PUT",
        credentials: "include",
        body: data.smartphone,
      }),
      transformErrorResponse: handlePhoneErr,
      invalidatesTags: (res, err, arg: UpdateSpArg) => [
        "smartphones",
        { type: "singlePhone", id: arg.id },
      ],
    }),
    duplicateSmartphone: builder.mutation({
      query: (data: UpdateSpArg) => ({
        url: `/smartphone/duplicate/${data.id}`,
        method: "POST",
        credentials: "include",
        body: data.smartphone,
      }),
      transformErrorResponse: handlePhoneErr,
      invalidatesTags: ["smartphones"],
    }),
  }),
});

export const {
  useGetSmartphonesQuery,
  useAddSmartphoneMutation,
  useGetSingleSmartphoneQuery,
  useLazyGetSingleSmartphoneQuery,
  useDeleteSmartphoensMutation,
  useUpdateSmartphoneMutation,
  useDuplicateSmartphoneMutation,
} = inventoryAPI;
