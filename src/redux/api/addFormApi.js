import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const addFormApi = createApi({
    reducerPath: "addFormApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/addform`, credentials: "include" }),
    tagTypes: ["addForm"],
    endpoints: (builder) => {
        return {
            getAddmission: builder.query({
                query: () => {
                    return {
                        url: "/get-admissions",
                        method: "GET"
                    }
                },
                providesTags: ["addForm"]
            }),
            addaddmissionForm: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-admission",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["addForm"]
            }),
            updateFormStatus: builder.mutation({
                query: id => {
                    return {
                        url: `/update-admission-status/${id}`,
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["addForm"]
            }),

        }
    }
})

export const { 
    useAddaddmissionFormMutation,
    useGetAddmissionQuery,
    useUpdateFormStatusMutation
} = addFormApi
