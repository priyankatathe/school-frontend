import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const functionApi = createApi({
    reducerPath: "functionApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/function`, credentials: "include" }),
    tagTypes: ["function"],
    endpoints: (builder) => {
        return {
            getFunction: builder.query({
                query: () => {
                    return {
                        url: "/function-get",
                        method: "GET"
                    }
                },
                providesTags: ["function"],
                transformResponse: data => data.result
            }),
            addFunction: builder.mutation({
                query: FunctionData => {
                    return {
                        url: "/function-add",
                        method: "POST",
                        body: FunctionData
                    }
                },
                invalidatesTags: ["function"]
            }),
            updateFunction: builder.mutation({
                query: ({ id, userData }) => {
                    return {
                        url: `/function-update/${id}`,
                        method: "PUT",
                        body: userData,
                    };
                },
                invalidatesTags: ["function"],
            }),
            deleteFunction: builder.mutation({
                query: id => {
                    return {
                        url: `/function-delete/${id}`,
                        method: "DELETE",
                        // body: FunctionData
                    }
                },
                invalidatesTags: ["function"]
            }),

        }
    }
})

export const {
    useAddFunctionMutation,
    useDeleteFunctionMutation,
    useGetFunctionQuery,
    useUpdateFunctionMutation
} = functionApi
