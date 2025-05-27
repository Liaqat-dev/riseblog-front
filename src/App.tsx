import NavBar from "@components/Navbar.tsx";
import { Route, Routes } from "react-router";
import { Screen_Routes } from "@constants";



function App() {
    return (
        <div className=" h-screen flex flex-col">
            <NavBar className="sticky z-50 bg-white shadow-md" />
            <div className="flex-1 bg-white-1 w-screen  overflow-x-hidden overflow-y-auto ">

                <Routes>
                    {Screen_Routes.map((screen, key) => (
                        <Route key={key} path={screen.path} element={screen.element} />
                    ))}
                </Routes>
            </div>
        </div>
    );
}

export default App;
