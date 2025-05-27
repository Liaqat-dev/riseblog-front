
import {useRef} from "react";
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem} from "@components/ui/carousel.tsx";
import {CategoryCard} from "@cards";
import {blogCategories} from "@constants";


function CategoryCarousel() {
    const plugin = useRef(
        Autoplay({delay: 2000, stopOnInteraction: false, active: true,}),
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full pl-2 "
        >
            <CarouselContent>
                {blogCategories.map((item, index) => (
                    <CarouselItem key={index} className={'p-5 sm:basis-1/2 md:basis-1/2  lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 '}>
                        <CategoryCard key={index} image={item.image} name={item.name} description={item.description}/>

                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

const ArticleTopics = () => {
    return (<div className={' bg-gradient-primary flex items-center h-full  max-md:max-w-screen'}>
            <section className="flex w-full  justify-center items-center gap-2 pb-10 max-md:flex-col">
                <div className="max-lg:w-[28%]  lg:w-[20%] max-md:ml-0 max-md:w-full">
                    <h1 className="text-8xl font-semibold select-none text-zinc-900 z-40  max-md:text-center  max-md:max-w-full max-md:text-3xl max-lg:text-5xl max-xl:text-6xl max-2xl:text-7xl">
                        Find Best <span className={'text-white-1'}> Posts </span> Here
                    </h1>
                </div>
                <div className="ml-5 w-[70%]   max-md:mx-auto max-sm:max-w-[280px]  ">
                    <div
                        className="flex   items-center justify-center   max-md:mt-5">
                       <CategoryCarousel/>
                    </div>
                </div>
            </section>
            <br/>
        </div>

    );
};

export default ArticleTopics;
