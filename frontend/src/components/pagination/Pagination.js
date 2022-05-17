import React, { useEffect } from 'react'
import "../../css/main.css"

export const Pagination = ({ pagination_data, currentPage, changePage }) => {


    let pages_array = Array.from({ length: pagination_data.total_pages }, (_, i) => i + 1)

    if (pages_array.length > 5) {
        if (currentPage + 1 < pagination_data.total_pages) {
            if (currentPage === 1) {
                pages_array = [currentPage, currentPage + 1, currentPage + 2, "...", pagination_data.total_pages]
            } else if (currentPage === 2) {
                pages_array = [1, currentPage, currentPage + 1, "...", pagination_data.total_pages]
            }
            else {
                pages_array = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", pagination_data.total_pages]
            }

        } else if (currentPage === pagination_data.total_pages) {
            pages_array = [1, "...", currentPage - 2, currentPage - 1, currentPage]
        }
        else if (currentPage + 1 === pagination_data.total_pages) {
            pages_array = [1, "...", currentPage - 1, currentPage, pagination_data.total_pages]
        }
        else if (currentPage + 2 === pagination_data.total_pages) {
            pages_array = [1, "...", currentPage - 1, currentPage, pagination_data.total_pages]
        }
    }




    const rendered_controls = pages_array.map((e, i) =>
        <div
            key={i}
            className={e === currentPage ? "page_control page_control_active" : "page_control"}
            onClick={(e !== "...") ? () => changePage(e) : undefined}
        >
            {e}
        </div >
    )

    return (
        <div className='controls_div'>
            {pagination_data.count ?
                <ul className='controls_list'>
                    {rendered_controls}
                </ul>
                :
                <></>
            }
        </div>
    )
}
