import {Pagination} from '@constants'

interface Props {
    pagination: Pagination;
    setCurrentPage: (currentPage: number) => void;
}


function PaginationBar({pagination, setCurrentPage}: Props) {
    const {currentPage, totalPages} = pagination;
    return (
        <div className={`flex items-center justify-between w-full`}>
            <div className={`flex gap-3 mx-auto  ${ pagination.totalPosts<pagination.postsPerPage? 'hidden':''}`}>
                {
                    Array(totalPages).fill(0).map((_, index) => (
                        <p className={`inline hover:cursor-pointer ${currentPage==index? 'scale-125 text-secondary underline font-bold':''}`} onClick={() => setCurrentPage(index )} key={index}>{index + 1}</p>
                    ))
                }
            </div>


        </div>
    );
}

export default PaginationBar;