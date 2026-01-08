import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./slice/authSlice"
import { departmentApi } from "./api/departmentApi";
import { functionApi } from "./api/functionApi";
import { staffApi } from "./api/staffApi";
import { studentApi } from "./api/studentApi";
import { galleryApi } from "./api/galleryApi";
import { contactApi } from "./api/contactApi";
import { addFormApi } from "./api/addFormApi";



const reduxStore = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [functionApi.reducerPath]: functionApi.reducer,
        [staffApi.reducerPath]: staffApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [galleryApi.reducerPath]: galleryApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [addFormApi.reducerPath]: addFormApi.reducer,
        Auth: authSlice

    },
    middleware: def => [...def(),
    authApi.middleware,
    departmentApi.middleware,
    functionApi.middleware,
    staffApi.middleware,
    studentApi.middleware,
    galleryApi.middleware,
    contactApi.middleware,
    addFormApi.middleware

    ]
})

export default reduxStore