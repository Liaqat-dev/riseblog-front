import {ImSpinner3} from "react-icons/im";

import React, {useEffect, useState} from "react";
import ImageUploader from "@components/imgUpload.tsx";

import {blogTags} from "@constants";

import TextEditor from "@components/textEditor/textEditor.tsx";

import {useUser} from "@context/UserContext/useUser.ts";
import {SignIn, createArticle, updateArticle} from "@api/api_routes.ts";

import {ToastContainer, toast} from 'react-toastify';
import {useLocation, useNavigate} from "react-router";


const NewArticle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {Post, Event} = location.state || {};
    const {user, loadingUser} = useUser();

    useEffect(() => {
        if (!loadingUser && !user) {
            SignIn();
        }
    }, [user, loadingUser]);

    const [title, setTitle] = useState("");
    const [meta, setMeta] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [thumbnailUploading, setThumbnailUploading] = useState(false);
    const [content, setContent] = useState('');

    useEffect(() => {

        if (Post) {
            setTitle(Post.title);
            setMeta(Post.meta);
            setSelectedTags([...Post.tags]);
            setThumbnailUrl(Post.thumbnail)
            setContent(Post.content)
        }
    }, [Post]);


    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value, name} = event.target;
        if (name === "title") {
            if (title.trim().length > 120) {
                toast.warning('Title of 120 characters will be selected')
                return setTitle(value.substring(0, 120))
            }
            return setTitle(value)
        }
        if (name === "meta") {
            if (meta.trim().length > 150) {
                toast.warning("meta of 150 characters will be selected")
                return setMeta(value.substring(0, 150))
            }
            return setMeta(value)
        }

    }


    async function onSubmit(formData: FormData) {
        if (Event && Event === 'Update') {
            const response = await updateArticle(Post.id, formData);
            if (response.post) {
                toast.success('Post Updated Successfully!')
                setTimeout(() => {
                    navigate('/myArticles')

                }, 5000)
            } else
                toast.error('Error Occured While Updating');
            console.log(response);
            return
        }
        const response = await createArticle(formData);
        if (response?.post) {
            toast.success('Post successfully created!');

            setTimeout(() => {
                navigate('/myArticles')
            }, 5000)

        } else {
            toast.error('Failed to create post');
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!thumbnailUrl.trim()) return toast.error('Missing Thumbnail');
        if (!title.trim()) return toast.error('Missing title')
        if (!meta.trim()) return toast.error('Missing Description')
        if (selectedTags.length < 1) return toast.error('tags must not be empty');
        if (!content.trim()) return toast.error('Missing content');


        const slug = title
            .toLowerCase()
            .replace(/[^a-zA-Z]/g, ' ')
            .split(' ')
            .filter(item => item.trim())
            .join('-');

        const formData = new FormData();
        if (!user) {
            SignIn()
        }
        const finalPost = {
            title, meta,
            content,
            slug,
            tags: JSON.stringify(selectedTags),
            author: JSON.stringify({
                name: user?.name,
                id: user?.id,
            }),
            thumbnail: thumbnailUrl
        };
        console.log(finalPost);
        console.log("Tags JSON:", finalPost.tags);
        try {
            JSON.parse(finalPost.tags);

        } catch (err) {
            console.log("JSON parse error:", err);
        }

        for (const key in finalPost) {
            formData.append(key, finalPost[key as keyof typeof finalPost] as string);
        }

        await onSubmit(formData);
    }

    const [modalOpen, setModalOpen] = useState(false);


    const handleTagSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTag = e.target.value;
        if (!selectedTags.includes(selectedTag)) {
            setSelectedTags((prev) => [...prev, selectedTag]);

            console.log(selectedTags)
        }
    };
    const deleteSelectedTag = (tag: string) => {
        setSelectedTags((prev) => prev.filter(selectedTag => selectedTag !== tag))
    }

    return (

        <form className={'flex  gap-2 h-[calc(100vh-4rem)]  mx-auto overflow-y-auto max-w-5xl '}
              onSubmit={handleSubmit}>
            {/*Thumbnail*/}
            <ImageUploader isOpen={modalOpen} setIsOpen={() => setModalOpen(false)} setImgUrl={setThumbnailUrl}
                           setIsUploading={setThumbnailUploading}/>

            <div className={'flex flex-col flex-3     overflow-y-auto'}>
                {/*topBar*/}
                <div
                    className={'flex h-10 min-h-8 bg-blue justify-around items-center  max-sm:w-full w-4xl mx-auto rounded-md'}>
                    <h3 className={'select-none font-bold text-white'}>{Event ? 'EDIT ARTICLE' : 'NEW ARTICLE'}</h3>
                    <div className={'flex items-center'}>

                        <button type={'submit'}
                                className={'border-white select-none cursor-pointer rounded-md bg-blue-1 px-2 outline-2 hover:bg-blue'}
                        >
                            <strong
                            className={'font-bold text-white'}>{`${Event ? Event : 'Publish'}`}</strong></button>
                    </div>
                </div>
                <div className={'w-full h-0.5 bg-blue-50'}/>


                <section
                    className={'flex  max-md:flex-col justify-center p-3 gap-3 w-full'}>


                    {/*Thumbnail*/}
                    <div className={'w-sm rounded-md overflow-hidden aspect-video  max-md:w-full '}>
                        {
                            thumbnailUrl.length > 2 ?
                                <img onClick={() => setModalOpen(true)} src={thumbnailUrl} alt={'Thumbnail'}/>
                                : <div className={'flex items-center aspect-video justify-center'}
                                       onClick={() => setModalOpen(true)}>
                                    {thumbnailUploading ?
                                        <ImSpinner3 size={30} className={'animate-spin'}/> :
                                        <div
                                            className={'flex flex-col justify-center items-center border-2 w-sm max-md:w-full aspect-video border-blue-500 border-dashed aspect-video'}>
                                            <span className={'text-gray-500'}>Select Thumbnail</span>
                                            <span className={'text-gray-400 text-xs'}>Recommended Size</span>
                                            <span className={'text-gray-400 text-xs'}>1280x720</span>
                                        </div>
                                    }
                                </div>
                        }
                    </div>

                    <div className={'flex flex-col w-[50%] max-md:w-full  '}>
                        {/*title*/}
                        <label className={'select-none'} htmlFor={'title'}>Title {title.trim().length}/120</label>
                        <textarea value={title} onChange={handleTextAreaChange} name={'title'} id={'title'}
                                  className={'resize-none h-20 max-md:resize-x bg-white font-bold italic text-[17px] px-2 py-1 rounded-md outline-none   '}
                                  placeholder={`Title`}
                                  onInput={(e) => {
                                      if (window.innerWidth <= 768) {
                                          const target = e.target as HTMLTextAreaElement;
                                          target.style.height = 'auto';
                                          target.style.height = `${target.scrollHeight}px`;
                                      }
                                  }}


                        />

                        {/*Description*/}
                        <div className={'flex flex-col gap-1 justify-start '}>
                            <label className={'select-none'} htmlFor={'meta'}>Meta
                                Description {meta.trim().length}/150</label>
                            <textarea value={meta} onChange={handleTextAreaChange} name={'meta'} id={'meta'}
                                      className={'resize-none h-20 bg-white font-semibold text-[13px] text-gray-500 italic px-2 py-1 rounded-md outline-none  '}
                                      placeholder={`Meta Description`}
                                      onInput={(e) => {
                                          if (window.innerWidth <= 768) {
                                              const target = e.target as HTMLTextAreaElement;
                                              target.style.height = 'auto';
                                              target.style.height = `${target.scrollHeight}px`;
                                          }
                                      }}
                            />

                        </div>
                    </div>
                </section>

                <div className={'w-full h-0.5 my-2 bg-blue-50'}/>

                <hr/>
                {/*Tags*/}
                <div className={'flex flex-col gap-1  w-[90%] max-lg:w-full mx-auto justify-start py-2 px-2 '}>
                    <div className={'flex gap-2'}>
                        <h3 className={'select-none'}>Tags {selectedTags.length}/4</h3>
                        {selectedTags.length < 4 && (<select required={true}
                                                             className={'w-[100px] border-1 rounded-md border-amber-900'}
                                                             onChange={handleTagSelection}
                        >{
                            blogTags.map(blogTag => (
                                <option key={blogTag} className={'text-[12px]'} value={blogTag}> {blogTag}</option>
                            ))
                        }</select>)}
                    </div>

                    <div className={'flex gap-1 w-full overflow-x-auto '}>{
                        selectedTags.map((tag, index) => (
                            <span onClick={() => deleteSelectedTag(tag)}
                                  className={'border-1 text-[10px] bg-green-50 whitespace-nowrap hover:cursor-pointer hover:bg-red-400 w-fit h-4 select-none rounded-full gap-3 px-1.5 border-gray-700'}
                                  key={index}> ⊝ {tag}</span>
                        ))
                    }</div>


                    <hr/>
                    {/*Editor*/}
                    <TextEditor content={Post?.content} setContent={setContent}/>


                </div>

            </div>
            <ToastContainer/>


        </form>

    );
};

export default NewArticle;