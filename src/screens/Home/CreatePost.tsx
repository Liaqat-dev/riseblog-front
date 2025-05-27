import {useUser} from "@context/UserContext/useUser.ts";
import {useNavigate} from "react-router";
import {SignIn} from "@api/api_routes.ts";

function CreatePost() {
    const navigate = useNavigate();
    const {user} = useUser()
    return (
        <div className="mt-16 max-md:mt-10 px-4 mx-auto">
            <section className="flex flex-col md:flex-row items-center justify-center gap-6 pb-10 ">
                <div className="md:w-1/2 flex justify-center semi_round_image  overflow-hidden">
                    <img
                        className=" w-full max-w-lg md:max-w-none"
                        src={'https://i.ibb.co/r2b8Snkd/write-article.jpg'}
                        alt="Write Article"
                    />
                </div>
                <div className="max-lg:w-[23%]  lg:w-[20%]  max-md:w-full flex flex-col  items-center ">
                    <h1 className="text-8xl text-center select-none font-semibold text-zinc-900  max-md:text-center  max-md:max-w-full max-md:text-3xl max-lg:text-5xl max-xl:text-6xl max-2xl:text-7xl">
                        Write Your <span className="text-blue-500">Article</span> Here
                    </h1>
                    <button
                        className={'bg-blue-600 cursor-pointer hover:scale-110 rounded-full px-8 py-1 text-white font-[300] text-[24px]'}
                        onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            user? navigate("/new"):
                                SignIn()
                        }}
                    >{user ? 'Write Aticle' : 'Sign In'}</button>

                </div>


            </section>
        </div>
    );
}

export default CreatePost;
