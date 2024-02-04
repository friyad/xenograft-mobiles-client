import { api } from "@/redux/api/apiSlice";
import { ISell } from "@/types/globalTypes";
import { handlePhoneErr } from "@/utils/smartphoneUtils";

const sellAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    sellNow: builder.mutation({
      query: (data: ISell) => ({
        url: "/sell-now",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      transformErrorResponse: handlePhoneErr,
      invalidatesTags: (_res, _err, arg: ISell) => [
        "sales",
        "smartphones",
        { type: "singlePhone", id: arg.product.prevID },
      ],
    }),
    getSelesHistory: builder.query({
      query: () => ({
        url: "/seles-history",
        credentials: "include",
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const { useSellNowMutation, useGetSelesHistoryQuery } = sellAPI;
