import {useNavigate} from "react-router";

interface BlogCardProps {
    imageSrc: string;
    title: string;
    description: string;
    timeAgo?: | string | "12h Ago";
    author: string;
    slug: string;
}

const BlogCard = ({
                      slug,
                      imageSrc,
                      title,
                      description,
                  }: BlogCardProps) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/single/${slug}`)}
            className=" min-w-[200px] max-w-[280px]  h-96 hover:scale-[1.05] duration-150 bg-white rounded-md overflow-hidden
            shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]  z-20 hover:cursor-pointer">
            <header className="relative">
                <img
                    src={imageSrc}
                    alt={'imageAlt'}
                    className="w-full min-h-56  object-cover"
                />
            </header>

            <section className="p-[8px] h-fit">

                    <h3 className="text-[13px] font-semibold text-[#1C1C1C] ">
                        {title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mb-[16px]">{description}</p>
            </section>
        </article>
    );
};

export default BlogCard;
