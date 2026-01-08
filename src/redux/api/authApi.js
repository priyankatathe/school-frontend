import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            fetchAdmin: builder.query({
                query: () => {
                    return {
                        url: "/admin-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["auth"],
                transformResponse: data => data.result

            }),
            fetchCleark: builder.query({
                query: () => {
                    return {
                        url: "/cleark-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["auth"],
                transformResponse: data => data.result

            }),
            registerAdmin: builder.mutation({
                query: () => {
                    return {
                        url: "/admin-register",
                        method: "POST"
                    }
                },
                providesTags: ["auth"],

            }),
            loginAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin-login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin-logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data.result
                }

            }),

            // Cleark 
            registerCleark: builder.mutation({
                query: userData => ({
                    url: "/cleark-register",
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ["auth"]
            }),

            loginCleark: builder.mutation({
                query: userData => {
                    return {
                        url: "/cleark-login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("cleark", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutCleark: builder.mutation({
                query: userData => {
                    return {
                        url: "/cleark-logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("cleark")
                    return data.result
                }

            }),
            findCleark: builder.query({
                query: () => {
                    return {
                        url: "/cleark-find",
                        method: "GET"
                    }
                },
                providesTags: ["auth"],
                transformResponse: data => data.result

            }),

        }
    }
})

export const {
    useFetchAdminQuery,
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useRegisterAdminMutation,

    useLoginClearkMutation,
    useLogoutClearkMutation,
    useFetchClearkQuery,
    useRegisterClearkMutation,
    useFindClearkQuery

} = authApi
