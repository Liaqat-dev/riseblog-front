import {FaSearch} from "react-icons/fa";
import {IoClose} from "react-icons/io5";

import {useEffect, useState} from "react";
// import {searchArticles} from "@api/api_routes.ts";


function SearchForm() {
    const [query, setQuery] = useState("");
    // const { handleSearch, resetSearch} = useSearch();
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (!query.trim())
    //         return;
    //     handleSearch(query);
    // }
    const handleReset = () => {
        console.log('handleReset');
        // resetSearch();
        setQuery('')
    }
    useEffect( () => {
        // searchArticles(query)

    },[query])

    return <form className={'relative flex items-center w-fit max-sm:w-[55%]  '}
        // onSubmit={handleSubmit}
    >
        <input className={'w-full bg-gray-200 outline-none  rounded-3xl px-3 pl-8 py-1'} placeholder={'Search here...'}
               value={query}
               onChange={(e) => {
                   setQuery(e.target.value);

               }}/>

        <div className={'absolute  left-3 w-fit '}>{
            query.trim() ?
                <IoClose className={'text-gray-400  cursor-pointer hover:scale-110'} onClick={() => handleReset()}/>
                : <FaSearch className={'text-gray-400 cursor-pointer hover:scale-110'} onClick={() => handleReset()}/>}</div>
    </form>
}

export default SearchForm;