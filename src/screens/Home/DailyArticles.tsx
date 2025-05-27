import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@components/ui/carousel.tsx"
import {useEffect, useRef, useState} from "react";
import Autoplay from "embla-carousel-autoplay";

import {BlogCard} from "@cards";
import {getArticles} from "@api/api_routes.ts";
import {Post} from '@constants'
function CarouselSize() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        const fetchPosts=async (pageNo: number)=>{
            const data=await getArticles(pageNo,9);

            console.log(data);
            setPosts(data.posts);
        }
        fetchPosts(0);
    },[]);

    const plugin = useRef(
        Autoplay({delay: 2000, stopOnInteraction: false, active: true})
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full pl-2 ">
            <CarouselContent>
                {posts.map((topic, index) => (
                    <CarouselItem key={index}
                                  className={' p-5 sm:basis-1/2 md:basis-1/2  lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5'}>
                        <BlogCard key={index} title={topic.title} slug={topic.slug} imageSrc={topic.thumbnail} description={topic.meta} author={topic.author.name}/>
                    </CarouselItem>
                ))
                }</CarouselContent>
        </Carousel>
    )
}


const DailyArticles = () => {


    return (
        <div className={'bg-gradient-primary flex justify-center items-center   h-[calc(100vh-4rem)]   max-md:max-w-screen max-md:pb-32'}>
            <section
                className="flex  w-full   justify-center items-center gap-2 pb-10 max-md:flex-col max-md:items-center">
                <div className="max-lg:w-[28%]  lg:w-[20%]  max-md:w-full z-10">
                    <h1 className="text-8xl select-none font-semibold text-zinc-900  max-md:text-center  max-md:max-w-full max-md:text-3xl max-lg:text-5xl max-xl:text-6xl max-2xl:text-7xl">
                        Best <span className={'text-white-1'}> Posts </span> Today
                    </h1>
                </div>
                <div className="ml-5 w-[70%]   max-md:mx-auto max-sm:max-w-[280px]   ">
                    <div className="flex   items-center justify-center   max-md:mt-5 ">
                        <CarouselSize/>
                    </div>
                </div>
            </section>
            <br/>
        </div>

    );
};

export default DailyArticles;
