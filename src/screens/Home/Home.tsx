import RingContainer from "@components/Rings/ringContainer.tsx";
import {Home_Section1_Components} from "@constants";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import DailyArticles from "@screens/Home/DailyArticles.tsx";


import {useState} from "react";

function Home() {


    const [componentNumber, setComponentNumber] = useState(0);
    const handleNavigate = (op: string) => {
        setComponentNumber((Prev) => {
            let activeComponentNumber = Prev;
            if (op === '+') {
                activeComponentNumber = (Prev + 1) % Home_Section1_Components.length;
            } else if (op === '-') {
                activeComponentNumber = (Prev - 1 + Home_Section1_Components.length) % Home_Section1_Components.length;
            }
            return activeComponentNumber;
        });
    };

    return <div>
        <RingContainer>
            {
            Home_Section1_Components[componentNumber].element
        }
            <div className={'absolute  bottom-19  flex  w-full justify-center '}>
                <div className={' flex justify-center gap-7'}>
                    <FaArrowLeft size={40} className={'text-primary cursor-pointer hover:scale-125'}
                                 onClick={() => handleNavigate('-')}/>
                    <FaArrowRight size={40} className={'text-primary cursor-pointer hover:scale-125'}
                                  onClick={() => handleNavigate('+')}/>
                </div>
            </div>
        </RingContainer>
        <DailyArticles/>
    </div>
}

export default Home
