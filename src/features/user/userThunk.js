import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";


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
        const response = await customFetch.patch('/auth/updateUser', user);
        return response.data;
    } catch (error) {
        // To check if user is on profile page and still receiving 401 #unauthorized while updating user personal data.
        checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const clearStoreThunk = async (message, thunkAPI) => {
    try {
        // Logout User
        thunkAPI.dispatch(logoutUser(message));
        // Clear Jobs Values
        thunkAPI.dispatch(clearAllJobsState());
        // Clear Job values
        thunkAPI.dispatch(clearValues());
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
}