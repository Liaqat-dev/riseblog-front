import SearchForm from "@components/searchForm.tsx";
import {BlogCardH} from "@cards";
import Button from "@components/button.tsx";
import {useNavigate} from "react-router";
import {useUser} from "@context/UserContext/useUser.ts";
import {SignIn} from "@api/api_routes.ts";
import {useEffect, useState} from "react";
import Suggestion from "@components/Suggestion.tsx";

import PaginationBar from "@components/Pagination.tsx";


import {useArticles} from "@context/articlesContext/useArticle.ts";
import Loading from "@components/Loading.tsx";


function MyArticles() {
    const {articles,setArticles, loadingArticles, fetchMyArticles, pagination} = useArticles();
    const {user,loadingUser} = useUser()
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);


    useEffect(() => {
        if(loadingUser && !user){
            console.log('no user found');
            return
        }
        setArticles([])
        if(user){
                fetchMyArticles(user.id, currentPage, 7);
        }
    }, [user, currentPage,loadingUser,user]);

    if (user) {
        return <div
            className={'  min-w-0   mt-10 mx-auto mx-1 max-w-6xl max-md:flex max-md:flex-col max-md:items-center h-[calc(100vh-4rem)]'}>
            <div className="flex flex-col gap-2 p-2 my-1">
                <h2 className={'text-4xl text-secondary font-bold italic'}>My Articles</h2>
                <div className={'flex gap-3'}>
                    <SearchForm/>
                    <Button title={'+ New Article'} onClick={() => navigate('/new')}/>

                </div>

            </div>
            <div className={'flex max-lg:gap-3 gap-9  max-md:justify-center '}>
                <main className={'min-w-0 flex-[2]  max-w-[600px]  rounded-md px-2 max-sm:mb-14'}>
                    {loadingArticles ? <Loading/> : <div className={''}>
                        {articles.length>0? articles.map((post, index) => (
                            <BlogCardH key={index} Post={post}/>
                        )): <div>No Articles Found Written By You ☹. </div>
                        }
                        <PaginationBar pagination={pagination} setCurrentPage={setCurrentPage}/>
                    </div>}
                </main>
                {/*Popular*/}
                <Suggestion title={'Popular'} data={articles}/>
            </div>

        </div>
    } else {
        return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-2xl font-semibold mb-4">You're not logged in</h1>
            <p className="text-gray-600 mb-6">Please log in to view your articles.</p>
            <button
                onClick={() => {
                    SignIn();
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Sign In
            </button>
        </div>
    }

}

export default MyArticles;