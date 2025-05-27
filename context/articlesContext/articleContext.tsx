import {ReactNode, useState} from "react";
import {ArticleContext} from "./useArticle";

import {Pagination, Post} from '@constants'
import {
    getArticles,
    getArticlesByAuthor,
    getArticlesByTag,
    removeArticle,
    updateArticle as editArticle
} from "@api/api_routes.ts";

interface Props {
    children: ReactNode;
}

export function ArticleProvider({children}: Props) {
    const [articles, setArticles] = useState<Post[]>([])
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [pagination, setPagination] = useState<Pagination>({
        totalPosts: 0,
        postsPerPage: 0,
        currentPage: 1,
        totalPages: 1,
    });

    const updateArticle=async (id: string,formData:FormData) => {
        const response= await editArticle(id, formData);
        console.log(response);



    }
    const deleteArticle = async (articleId: string) => {
        setLoadingArticles(true)
        const response = await removeArticle(articleId)
        if (response.status == 200) {
            setArticles(articles.filter((article) => article.id != articleId))
        }
        setLoadingArticles(false)

    }

    const fetchArticles = async (tag: string, pageNo: number, limitPerPage: number) => {

        let data;
        setLoadingArticles(true);
        if (tag == 'All') {
            data = await getArticles(pageNo, limitPerPage);
        } else {
            data = await getArticlesByTag(tag, pageNo, limitPerPage)
        }
        if (data) {
            setArticles(data.posts)
            setPagination(data.pagination)
            setLoadingArticles(false);
        }
    }
    const fetchMyArticles = async (authorId: string, pageNo: number, limitPerPage: number) => {

        setLoadingArticles(true);
        const data = await getArticlesByAuthor(authorId, pageNo, limitPerPage);

        if (data) {
            setArticles(data.posts)
            setPagination(data.pagination)
            setLoadingArticles(false);
        }
    }

    // useEffect(() => {
    //     fetchArticles('All',0,9);
    //
    // }, [])


    return <ArticleContext.Provider
        value={{
            articles,
            setLoadingArticles,
            deleteArticle,
            loadingArticles,
            updateArticle,
            setArticles,
            fetchArticles,
            fetchMyArticles,
            pagination,
            setPagination,
        }}>
        {children}
    </ArticleContext.Provider>
}