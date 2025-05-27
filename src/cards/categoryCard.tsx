import {useNavigate} from "react-router";

interface CategoryProps {
    name: string;
    description: string;
    image: string;
}


const CategoryCard=({name, description, image}:CategoryProps) => {
    const navigate = useNavigate();
    const navigateToCategory = (category: string) => {
        navigate(`/article`,{state:{category:category}});

    }
    return (
        <article
            onClick={() => {navigateToCategory(name)}}
            className="hover:scale-[1.05] cursor-pointer duration-150 flex flex-col justify-end min-w-[200px] max-w-[280px] h-96 rounded-2xl overflow-hidden  rounded-md overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] "
            style={{backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center"}}
        >

            {/* Text Content */}
            <div className=" left-0  h-22  bg-black opacity-75  text-white pl-2 pb-1.5">
                <h2 className="text-xl font-bold select-none"><em>{name}</em></h2>
                <p className="text-xs text-white-1 opacity-80 select-none"><em>{description}</em></p>
            </div>
        </article>
    );
};

export default CategoryCard;
