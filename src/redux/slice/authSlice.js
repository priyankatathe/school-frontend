import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")),
        cleark: JSON.parse(localStorage.getItem("cleark")),
    },
    reducers: {
        adminLogout: (state) => {
            localStorage.removeItem("admin");
            state.admin = null;
        },
        clearkLogout: (state) => {
            localStorage.removeItem("cleark");
            state.cleark = null;
        },
    },
    extraReducers: (builder) =>
        builder
            // ✅ Admin login
            .addMatcher(
                authApi.endpoints.loginAdmin.matchFulfilled,
                (state, { payload }) => {
                    state.admin = payload;
                    localStorage.setItem("admin", JSON.stringify(payload));
                }
            )

            // ✅ Cleark login
            .addMatcher(
                authApi.endpoints.loginCleark.matchFulfilled,
                (state, { payload }) => {
                    state.cleark = payload;
                    localStorage.setItem("cleark", JSON.stringify(payload));
                }
            )

            // ✅ Admin logout
            .addMatcher(
                authApi.endpoints.logoutAdmin.matchFulfilled,
                (state) => {
                    state.admin = null;
                    localStorage.removeItem("admin");
                }
            )

            // ✅ Cleark logout
            .addMatcher(
                authApi.endpoints.logoutCleark.matchFulfilled,
                (state) => {
                    state.cleark = null;
                    localStorage.removeItem("cleark");
                }
            ),
});

export const { adminLogout, clearkLogout } = authSlice.actions;
export default authSlice.reducer;
