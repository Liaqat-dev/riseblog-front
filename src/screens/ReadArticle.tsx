
import RenderContent from "@components/textEditor/viewContent.tsx";
import {getArticleBySlug, getSimilarArticles} from "@api/api_routes.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Suggestion from "@components/Suggestion.tsx";
import {Post} from "@constants";

function ReadArticle() {
    const { slug } = useParams();
    const[recommendedArticles, setRecommendedArticles] =useState<Post[]>([]);
    const [post,setPost]=useState<Post>({
        author: {
            name:'',
            id:''
        },
        content: "",
        timeStamp: '',
        likedBy:[],
        meta: "",
        tags: [],
        slug:'',
        thumbnail: " ",
        title: "",
        id:''
    });
    const getArticle = async (slug:string) => {
        const article=await getArticleBySlug(slug)
        setPost(article);
    }
    const getRecommendedArticle = async (id:string) => {
        const data=await getSimilarArticles(id);
        console.log(data.posts);
        setRecommendedArticles(data.posts);
    }
    useEffect(() => {
        getRecommendedArticle(post.id);

    }, [post.id]);
    useEffect(() => {
        if(slug)
            getArticle(slug);



    },[slug])

    return <div className={'  min-w-0   mt-10 mx-auto  max-w-6xl h-[calc(100vh-4rem)]'}>

        <div className={'flex max-lg:gap-3 gap-9 '}>
            <main className={'min-w-0 flex-[2]  max-w-[800px]  rounded-md px-2  max-sm:mb-14'}>
                <div className={'flex flex-col '}>
                    <img
                        className={'rounded-md mx-auto my-2'}
                        src={post.thumbnail} alt={'Thumbnail'}
                    />

                    <h2 className={'text-secondary font-bold italic text-[27px]'}>
                        {post.title}
                    </h2>
                    <RenderContent   content={post.content} />
                </div>


            </main>
            {/*Trending*/}
            <Suggestion title={'Recommended Articles'} data={recommendedArticles} />


        </div>

    </div>
}
export default ReadArticle;