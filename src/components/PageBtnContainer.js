import React from 'react';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {

    const { numOfPages, page } = useSelector(store => store.allJobs)
    const dispatch = useDispatch();

    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            newPage = 1;
        }
        dispatch(changePage(newPage));
    };
    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            newPage = numOfPages
        }
        dispatch(changePage(newPage));
    };


    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })

    return (
        <Wrapper>
            {/* Prev Button */}
            <button
                className='prev-btn'
                onClick={prevPage}><HiChevronDoubleLeft />Prev
            </button>

            <div className="btn-container">
                {pages.map(pageNumber => {
                    return <button
                        type="button"
                        className={pageNumber === page ? "pageBtn active" : "pageBtn"}
                        key={pageNumber}
                        onClick={() => dispatch(changePage(pageNumber))}>
                        {pageNumber}
                    </button>
                })}
            </div>

            {/* Next Button */}
            <button
                className='next-btn'
                onClick={nextPage}>Next<HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer;
