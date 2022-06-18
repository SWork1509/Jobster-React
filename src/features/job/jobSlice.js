import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

const initialState = {
    isLoading: false,
    position: "",
    company: "",
    jobLocation: "",
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["interview", "declined", "pending"],
    status: "pending",
    isEditing: false,
    editJobId: ""
}


export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);


const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: () => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || ''
            }
        },
        setEditJob: (state, { payload }) => {
            return {
                ...state,
                isEditing: true,
                ...payload
            }
        }
    },
    extraReducers: {
        // CREATE JOB
        [createJob.pending]: (state) => {
            state.isLoading = true;
        },
        [createJob.fulfilled]: (state) => {
            state.isLoading = false;
            toast.success("Job Created");
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },

        // DELETE JOB
        [deleteJob.fulfilled]: (state, { payload }) => {
            toast.success(payload)
        },
        [deleteJob.rejected]: (state, { payload }) => {
            toast.error(payload);
        },

        // EDIT JOB
        [editJob.pending]: (state) => {
            state.isLoading = true;
        },
        [editJob.fulfilled]: (state) => {
            state.isLoading = false;
            toast.success("Job Modified...");
        },
        [editJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        }
    }
});

export default jobSlice.reducer;
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;