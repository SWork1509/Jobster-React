import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserThunk, loginUserThunk, updateUserThunk, clearStoreThunk } from "./userThunk";
import { toast } from "react-toastify";
import { addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk('user/registerUser', (user, thunkAPI) => {
    return registerUserThunk('/auth/registerUser', user, thunkAPI);
});

export const loginUser = createAsyncThunk('user/loginUser', (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
});


export const updateUser = createAsyncThunk('user/updateUser', (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI)
});

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state, { payload }) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();

            if (payload) {
                toast.success(payload);
            }
        }
    },
    extraReducers: {
        // Register
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello there ${user.name}`)
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        // Login
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome Back ${user.name}`);
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        // Update
        [updateUser.pending]: (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success("User Updated");
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload)
        },
        // Clear Store
        [clearStore.rejected]: () => {
            toast.error("There was an error...");
        }
    }
})

// console.log(userSlice)
export default userSlice.reducer;
export const { toggleSidebar, logoutUser } = userSlice.actions;
