import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/student`, credentials: "include" }),
    tagTypes: ["student"],
    endpoints: (builder) => {
        return {
            getStudent: builder.query({
                query: () => {
                    return {
                        url: "/student-get",
                        method: "GET"
                    }
                },
                providesTags: ["student"],
                transformResponse: data => data.result

            }),
            addStudent: builder.mutation({
                query: userData => {
                    return {
                        url: "/student-add",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["student"]
            }),
            updateStudent: builder.mutation({
                query: ({ id, userData }) => {
                    return {
                        url: `/student-update/${id}`,
                        method: "PUT",
                        body: userData,
                    };
                },
                invalidatesTags: ["student"]
            }),
            deleteStudent: builder.mutation({
                query: id => {
                    return {
                        url: `/student-delete/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["student"]
            }),

        }
    }
})

export const {
    useAddStudentMutation,
    useDeleteStudentMutation,
    useGetStudentQuery,
    useUpdateStudentMutation
} = studentApi
