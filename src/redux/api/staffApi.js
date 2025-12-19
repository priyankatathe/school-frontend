import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const staffApi = createApi({
    reducerPath: "staffApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/teacher`, credentials: "include" }),
    tagTypes: ["teacher"],
    endpoints: (builder) => {
        return {
            getUStaff: builder.query({
                query: () => {
                    return {
                        url: "/staff-get",
                        method: "GET"
                    }
                },
                providesTags: ["teacher"],
                transformResponse: data => data.result

            }),
            addStaff: builder.mutation({
                query: userData => {
                    return {
                        url: "/staff-add",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["teacher"]
            }),
            updateStaff: builder.mutation({
                query: ({ id, userData }) => {
                    return {
                        url: `/staff-update/${id}`,
                        method: "PUT",
                        body: userData,
                    };
                },
                invalidatesTags: ["teacher"]
            }),
            deleteStaff: builder.mutation({
                query: id => {
                    return {
                        url: `/staff-delete/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["teacher"]
            }),

        }
    }
})

export const {
    useAddStaffMutation,
    useDeleteStaffMutation,
    useGetUStaffQuery,
    useUpdateStaffMutation
} = staffApi
