import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/contact`, credentials: "include" }),
    tagTypes: ["contact"],
    endpoints: (builder) => {
        return {
            getContact: builder.query({
                query: () => {
                    return {
                        url: "/contact-get",
                        method: "GET"
                    }
                },
                providesTags: ["contact"]
            }),
            addContact: builder.mutation({
                query: userData => {
                    return {
                        url: "/contact-add",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["contact"]
            }),
            deleteContact: builder.mutation({
                query: id => {
                    return {
                        url: `/contact-delete/${id}`,
                        method: "POST",
                    }
                },
                invalidatesTags: ["contact"]
            }),

        }
    }
})

export const {
    useAddContactMutation,
    useDeleteContactMutation,
    useGetContactQuery
} = contactApi
