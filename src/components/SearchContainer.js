import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {

    const { isLoading, search, searchStatus, searchType, sort, sortOptions } = useSelector(store => store.allJobs);
    const { statusOptions, jobTypeOptions } = useSelector(store => store.job)

    const dispatch = useDispatch();

    const handleSearch = (evt) => {
        if (isLoading) return;
        const name = evt.target.name;
        const value = evt.target.value;
        dispatch(handleChange({ name, value }))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(clearFilters());
    }

    return (
        <Wrapper>
            <form className="form">
                <h4>Search Form</h4>
                <div className="form-center">

                    {/* Search Term */}
                    <FormRow
                        type="text"
                        name="search"
                        value={search}
                        handleChange={handleSearch}
                    />

                    {/* Search Status */}
                    <FormRowSelect
                        labelText="status"
                        name="searchStatus"
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={["all", ...statusOptions]}
                    />

                    {/* Search Type */}
                    <FormRowSelect
                        labelText="type"
                        name="searchType"
                        value={searchType}
                        handleChange={handleSearch}
                        list={["all", ...jobTypeOptions]}
                    />

                    {/* Sort */}
                    <FormRowSelect
                        name="sort"
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    />

                    {/* Button */}
                    <button
                        className="btn btn-block btn-danger"
                        disabled={isLoading}
                        onClick={handleSubmit}>
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer;
