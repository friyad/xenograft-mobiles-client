import { api } from "@/redux/api/apiSlice";
import store from "@/redux/store";
import { ISmartPhone2, UpdateSpArg } from "@/types/globalTypes";
import {
  getFilterItemsFromData,
  handlePhoneErr,
} from "@/utils/smartphoneUtils";
import { setFilterInit } from "./filter/filterSlice";

const inventoryAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getSmartphones: builder.query({
      query: () => ({
        url: "/smartphones",
        credentials: "include",
      }),
      transformResponse: (result: any) => {
        const filterData = getFilterItemsFromData(result.data);
        store.dispatch(
          setFilterInit({
            items: filterData,
            phones: [...result.data],
          })
        );
        return result;
      },
      providesTags: ["smartphones"],
    }),
    getSingleSmartphone: builder.query({
      query: (id: string) => ({
        url: `/smartphone/${id}`,
        credentials: "include",
      }),
      providesTags: (_res, _err, arg) => [{ type: "singlePhone", id: arg }],
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
      invalidatesTags: (_res, _err, arg: UpdateSpArg) => [
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
  useLazyGetSmartphonesQuery,
  useAddSmartphoneMutation,
  useGetSingleSmartphoneQuery,
  useLazyGetSingleSmartphoneQuery,
  useDeleteSmartphoensMutation,
  useUpdateSmartphoneMutation,
  useDuplicateSmartphoneMutation,
} = inventoryAPI;
