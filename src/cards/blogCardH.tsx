import {FaHeart, FaRegHeart} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {Post, timeAgo} from "@constants";
import Button from "@components/button.tsx";
import {useNavigate} from "react-router";
import {likeArticle} from "@api/api_routes.ts";
import {useUser} from "@context/UserContext/useUser.ts";
import {MdDelete} from "react-icons/md";
import {CiMenuKebab} from "react-icons/ci";
import {FaEdit} from "react-icons/fa";
import {useArticles} from "@context/articlesContext/useArticle.ts";

interface BlogCardHProps {
    Post: Post;
}

const BlogCardH = ({Post}: BlogCardHProps) => {
    const{id,thumbnail,author,slug,title,meta,timeStamp,likedBy}=Post
    const {user} = useUser();
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const {deleteArticle}=useArticles();

    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likedBy?.length || 0);
    useEffect(() => {
        if (user?.id && likedBy?.includes(user.id)) {
            setLiked(true);
        }
    }, [user, likedBy]);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    }
    const handleDeleteArticle = (id:string) => {
        deleteArticle(id)
    }
    const handleEditArticle = () => {
        navigate("/new", { state: { Post ,Event:"Update"} });
    }

    return (
        <article
            className="hover:scale-[1.01] duration-150 min-w-[200px] max-w-[518px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px]
                        h-[144px] md:h-[150px] lg:h-[160px] xl:h-[170px] 2xl:h-[180px]
                        bg-white rounded-md flex p-2 max-sm:p-1 m-1 shadow-md  z-20   relative"
        >
            <div
                className={`${showOptions ? 'inline' : 'hidden'} duration-150 absolute top-4 right-7 bg-white rounded border p-2`}>
                <div className={'flex items-center gap-1 hover:text-blue-500 hover:cursor-pointer select-none'}
                onClick={()=>handleEditArticle()}>
                    <FaEdit/>
                    <p>Edit</p>
                </div>
                <hr/>
                <div className={'flex items-center gap-1 hover:text-blue-500 hover:cursor-pointer select-none'}
                onClick={()=>handleDeleteArticle(id)}>
                    <MdDelete/>
                    <p>Delete</p>
                </div>
            </div>
            <img
                src={thumbnail}
                alt={'Blog Image'}
                className="w-[122px] md:w-[140px] lg:w-[160px] xl:w-[180px] 2xl:w-[200px]
                           h-[136px] md:h-[135px] lg:h-[145px] xl:h-[155px] 2xl:h-[165px]
                           rounded-sm object-cover"
            />

            <section className="p-[5px] w-full flex flex-col justify-between">
                <div className='flex justify-between w-full overflow-hidden'>
                    <h3 className="text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]
                                 font-semibold text-[#1C1C1C] w-[84%] max-sm:w-full">
                        {title.length > 120 ? title.substring(0, 120) + '...' : title}
                    </h3>
                    <div className={'flex flex-col items-end w-fit'}>
                        <CiMenuKebab className={`${Post.author.id===user?.id? 'inline':'hidden'}`} onClick={toggleOptions}/>
                        <p className='text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] text-gray-500 max-sm:hidden select-none'>{timeAgo(timeStamp)}</p>
                    </div>
                </div>

                <div className='w-full '>
                    <p className="text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] text-gray-500">
                        {meta.length > 140 ? meta.substring(0, 140) + '...' : meta}
                    </p>
                </div>

                <div className="w-full flex justify-between items-center">
                    <Button titleStyle={'text-[8px] font-semibold'} title={author.name}/>


                    <div className='flex justify-between items-center gap-1'>
                        <p className={`${likeCount > 0 ? '' : 'hidden'}`}>{likeCount}</p>
                        {liked ? (
                            <FaHeart
                                onClick={() => {
                                    if (user?.id) {
                                        likeArticle(id, user.id);
                                        setLiked(false);
                                        setLikeCount(prevState => prevState - 1)
                                    }
                                }}
                                className="cursor-pointer text-red-500"
                            />
                        ) : (
                            <FaRegHeart
                                onClick={() => {
                                    if (user?.id) {
                                        likeArticle(id, user.id);
                                        setLiked(true);
                                        setLikeCount(prevState => prevState + 1)
                                    }
                                }}
                                className="cursor-pointer"
                            />
                        )}
                        <Button title={'Read More'} titleStyle={'text-[8px] font-semibold'}
                                onClick={() => navigate(`/single/${slug}`)}/>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default BlogCardH;
