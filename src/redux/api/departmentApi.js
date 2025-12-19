import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const departmentApi = createApi({
    reducerPath: "departmentApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/department`, credentials: "include" }),
    tagTypes: ["department"],
    endpoints: (builder) => {
        return {
            // sport
            getDepartment: builder.query({
                query: () => {
                    return {
                        url: "/department-get",
                        method: "GET"
                    }
                },
                providesTags: ["department"],
                transformResponse: data => data.result

            }),
            addDepartment: builder.mutation({
                query: userData => {
                    return {
                        url: "/department-add",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["department"]
            }),
            updateDepartment: builder.mutation({
                query: ({ id, userData }) => {
                    return {
                        url: `/department-update/${id}`,
                        method: "PUT",
                        body: userData,
                    };
                },
                invalidatesTags: ["department"],
            }),

            deleteDepartment: builder.mutation({
                query: id => {
                    return {
                        url: `/department-delete/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["department"]
            }),
            // sport
            findSport: builder.query({
                query: () => {
                    return {
                        url: "/fetch-sport",
                        method: "GET",
                        // body: userData
                    }
                },
                invalidatesTags: ["department"],
                transformResponse: data => data.data

            }),

        }
    }
})

export const {
    useAddDepartmentMutation,
    useDeleteDepartmentMutation,
    useFindSportQuery,
    useGetDepartmentQuery,
    useUpdateDepartmentMutation
} = departmentApi
