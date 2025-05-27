import React, {createContext, useContext} from "react";
import {Post,Pagination} from '@constants'

interface ArticleContextType{

    articles:Post[],
    setArticles: React.Dispatch<React.SetStateAction<Post[]>>,
    updateArticle:(postId:string,formData: FormData)=>void,
    fetchArticles:(tag:string,pageNumber: number,limitPerPage:number) => void,
    deleteArticle:(articleId:string) => void,
    fetchMyArticles:(authorId:string,pageNumber:number,limitPerPage:number) => void,
    pagination:Pagination,
    setPagination: React.Dispatch<React.SetStateAction<{
        currentPage: number;
        postsPerPage: number;
        totalPages: number;
        totalPosts: number;
    }>>,
    loadingArticles: boolean,
    setLoadingArticles:React.Dispatch<React.SetStateAction<boolean>>

}

export const ArticleContext = createContext<ArticleContextType>({
    articles: [],
    pagination:{
        totalPosts:0,
        postsPerPage:0,
        currentPage:1,
        totalPages:1
    },
    updateArticle:()=>{},
    setArticles: () => {},
    deleteArticle:async ()=>{} ,
    fetchArticles: async () => {},
    fetchMyArticles: async () => {},
    setPagination: () => {},
    loadingArticles: true,
    setLoadingArticles: () => {},
})

export const useArticles = () => useContext(ArticleContext);