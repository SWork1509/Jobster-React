import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";


export const registerUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const response = await customFetch.patch('/auth/updateUser', user, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        });

        return response.data;
    } catch (error) {
        // To check if user is on profile page and still receiving 401 #unauthorized while updating user personal data.
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            thunkAPI.rejectWithValue("Unauthorized! Logging out...");
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}