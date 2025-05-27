import React from "react";

interface CategoryCardProps {
    imageSrc: string;
    category: string;
    width?: string;
    aspectRatio?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
                                                       imageSrc,
                                                       category,
                                                       width = "w-[210px]",
                                                       aspectRatio = "aspect-[0.6]",
                                                   }) => {
    return (
        <article className={`relative rounded-2xl overflow-hidden ${width} shadow-lg transition-transform duration-300 hover:scale-105`}>
            {/* Background Image */}
            <img
                src={imageSrc}
                alt={`${category} category`}
                className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                aria-label={`${category} category image`}
            />

            {/* Overlay */}
            <div className={`relative flex flex-col items-center justify-end px-5 py-6 ${aspectRatio} bg-black bg-opacity-50`}>
                <h3 className="text-xl font-semibold text-white text-center">
                    {category}
                </h3>
            </div>
        </article>
    );
};

export default CategoryCard;
