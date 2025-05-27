import {Post} from '@constants'
import {TrendingCardH} from "@cards";
interface Props{
    title: string;
    data:Post[]
}
function Suggestion({title,data}:Props) {

    return (
        <aside className={`min-w-0 flex-[1] p-1 pt-2 max-w-[400px] h-fit rounded-md  max-md:hidden ${data.length>0? ' ':'hidden'}`}>
            <h2 className={'font-bold italic text-[13px]'}>{title}</h2>{
            data.slice(0, 5).map((topic, index) => (
                <TrendingCardH key={index} imageSrc={topic.thumbnail} title={topic.title} author={topic.author.name} slug={topic.slug}
                               time={topic.timeStamp}/>
            ))
        }
        </aside>
    );
}

export default Suggestion;