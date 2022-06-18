import React from 'react';
import { useSelector } from 'react-redux';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from "../components/StatItem";

const StatsContainer = () => {
    const { stats } = useSelector(store => store.allJobs);

    const defaultStats = [
        {
            title: "Pending Applications",
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: "#e9b949",
            bcg: "#fcefc7"
        },
        {
            title: "Inteview Scheduled",
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: "#647acb",
            bcg: "#e0e8f9"
        },
        {
            title: "Jobs Declined",
            count: stats.declined,
            icon: <FaBug />,
            color: "#d66a6a",
            bcg: "#ffeeee"
        }
    ]

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default StatsContainer;
