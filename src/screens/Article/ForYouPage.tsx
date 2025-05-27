import SearchForm from "@components/searchForm.tsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React, {useEffect, useRef, useState} from "react";

import {BlogCardH} from "@cards";
import Suggestion from "@components/Suggestion.tsx";
import PaginationBar from "@components/Pagination.tsx";
import {useArticles} from "@context/articlesContext/useArticle.ts";
import Loading from "@components/Loading.tsx";
import {useLocation} from "react-router";

interface Props {
    categories: string[];
    selectedTag: string;
    setSelectedTag:  React.Dispatch<React.SetStateAction<string>>
}
function CategoryScroller({ categories,selectedTag,setSelectedTag}:Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 100;
            scrollRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative mx-1 flex items-center max-sm:w-[95%]">
            {/* Left Scroll Button */}
            <button
                className="absolute left-0 z-10 bg-white-1 p-2  shadow-md"
                onClick={() => scroll("left")}
            >
                <FaArrowLeft className={'text-secondary'} size={20} />
            </button>

            {/* Scrollable Category List */}
            <div
                ref={scrollRef}
                className="h-10 px-10  my-2 flex overflow-x-auto whitespace-nowrap px-2 no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {categories.map((category, index) => (
                    <span onClick={()=>setSelectedTag(category)} key={index} className={`px-4 py-2  select-none ${selectedTag===category? 'bg-blue-600 text-white':'bg-gray-200' } rounded-lg mx-1 cursor-pointer`}>
                        {category}
                    </span>
                ))}
            </div>

            <button
                className="absolute right-0 z-10 bg-white-1  p-2  shadow-md"
                onClick={() => scroll("right")}
            >
                <FaArrowRight  className={'text-secondary'} size={20} />
            </button>
        </div>
    );
}



function ForYouPage() {
    const location = useLocation();
    // const{category}=location.state||null
    // console.log(category)
    const {articles,loadingArticles,pagination,fetchArticles, setArticles} = useArticles();
    const [selectedTag, setSelectedTag] = useState("All");
    const [currentPage, setCurrentPage] = useState(0);

    const categories = ['All','Education','Self-Improvement','Learning','Finance','Business','Technology'];
    // useEffect(()=>{
    //     if(category){
    //         setSelectedTag(category);
    //     }
    //
    // },[])



    useEffect(() => {

        setArticles([])
        fetchArticles(selectedTag,currentPage,7)

    }, [selectedTag, currentPage]);


    return <div className={'     mt-10 mx-auto  max-w-6xl h-[calc(100vh-4rem)]'}>
        <div className="flex flex-col gap-2 p-2 my-1">
            <h2 className={'text-4xl text-secondary font-bold italic'}>For You</h2>
            <SearchForm />
        </div>
        <div className={'flex max-lg:gap-3 gap-9 '}>
            <main className={'min-w-0 flex-[2]  max-w-[600px]  rounded-md px-2  max-sm:mb-14'}>
                <CategoryScroller setSelectedTag={setSelectedTag} selectedTag={selectedTag} categories={categories}/>
                {loadingArticles ? <Loading/> : <div className={''}>
                    {articles.map((topic, index) => (
                        <BlogCardH key={index} Post={topic} />
                    ))
                    }
                    <PaginationBar pagination={pagination} setCurrentPage={setCurrentPage}/>
                </div>}

            </main>

            {/*Trending*/}
            <Suggestion title={'Trending'} data={articles}/>
        </div>

    </div>
}

export default ForYouPage;