import React, { useEffect } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";
import FormRowSelect from '../../components/FormRowSelect';
import { handleChange, clearValues, createJob } from "../../features/job/jobSlice";

const AddJobs = () => {

    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId,
    } = useSelector(store => store.job);

    const { user } = useSelector(store => store.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!position || !company || !jobLocation) {
            toast.error("Please fill out all fields");
            return;
        }

        dispatch(createJob({ position, company, jobLocation, jobType, status }));

    }

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({ name, value }));
    }

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>

                <div className="form-center">

                    {/* Position */}
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleJobInput}
                    />

                    {/* Company */}
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleJobInput}
                    />

                    {/* Location */}
                    <FormRow
                        type="text"
                        labelText="Job Location"
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />

                    {/* Job Status */}
                    <FormRowSelect
                        labelText="Status"
                        name="status"
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    {/* Type */}
                    <FormRowSelect
                        labelText="Job Type"
                        name="jobType"
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />

                    {/* Button Container */}
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-block clear-btn"
                            onClick={() => dispatch(clearValues())}>
                            Clear
                        </button>

                        <button
                            type="submit"
                            className="btn btn-block submit-btn"
                            disabled={isLoading}
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJobs;
