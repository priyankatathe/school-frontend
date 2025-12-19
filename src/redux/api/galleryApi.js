import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const galleryApi = createApi({
    reducerPath: "galleryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/gallery`, credentials: "include" }),
    tagTypes: ["gallery"],
    endpoints: (builder) => {
        return {
            getGallery: builder.query({
                query: () => {
                    return {
                        url: "/gallery-get",
                        method: "GET"
                    }
                },
                providesTags: ["gallery"],
                transformResponse: data => data.result

            }),
            addGallery: builder.mutation({
                query: userData => {
                    return {
                        url: "/gallery-add",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["gallery"]
            }),
            updateGallery: builder.mutation({
                query: ({ id, userData }) => {
                    return {
                        url: `/gallery-update/${id}`,
                        method: "PUT",
                        body: userData,
                    };
                },
                invalidatesTags: ["gallery"]
            }),
            deleteGallery: builder.mutation({
                query: id => {
                    return {
                        url: `/gallery-delete/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["gallery"]
            }),

        }
    }
})

export const {
    useAddGalleryMutation,
    useGetGalleryQuery,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation
} = galleryApi
