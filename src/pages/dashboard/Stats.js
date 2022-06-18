import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartContainer, StatsContainer, Loading } from "../../components";
import { showStats } from "../../features/allJobs/allJobsSlice";

const Stats = () => {
    const { isLoading, monthlyApplications } = useSelector(store => store.allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showStats());
    }, []);

    if (isLoading) {
        return <Loading center />
    }

    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartContainer />}
        </>
    )

}
export default Stats;
