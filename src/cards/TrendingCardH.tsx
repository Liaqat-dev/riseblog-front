import {timeAgo} from "@constants";
import {useNavigate} from "react-router";

interface TrendingCardProps {
    imageSrc: string;
    title: string;
    time: string;
    author: string;
    slug: string;
}

const TrendingCardH = ({
                           imageSrc,
                           author,
                           title,
                           time,
    slug,
                       }: TrendingCardProps) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/single/${slug}`)}
            className=" hover:scale-[1.03] duration-150 min-w-[280px] h-[84px]
                        bg-white rounded-md flex p-0.5 m-1 shadow-md  z-20"
        >
            <img
                src={imageSrc}
                alt={'Blog Image'}
                className="w-[122px]
                           rounded-sm object-cover"
            />

            <section className="p-[5px] w-full flex flex-col justify-between">
                <h3 className="text-[11px]
                                 font-semibold text-[#1C1C1C] w-full">
                    {title.length > 120 ? title.substring(0, 120) + '...' : title}
                </h3>

                <div className="w-full flex justify-between items-center">
                    <p className='text-white text-[9px]  px-2 py-[2px] bg-blue rounded-full'>
                        {author}
                    </p>
                    <p className='text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] text-gray-500'>{timeAgo(time)}</p>

                </div>
            </section>
        </article>
    );
};

export default TrendingCardH;
