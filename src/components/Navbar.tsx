import {nav_links} from "@constants";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {IoMenu, IoClose} from "react-icons/io5";

import {SignIn, SignOut} from '@api/api_routes.ts'
import Button from "@components/button.tsx";
import {useUser} from "@context/UserContext/useUser.ts";

interface Props {
    className?: string,
}

const NavBar = ({className}: Props) => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const {user} = useUser();


    // Toggle the side menu
    const toggleSideMenu = () => {
        setShowSideMenu(!showSideMenu);

    };

    return (
        <nav className={` w-screen bg-white h-16 shadow-sm ${className}`}>
            {/* Navbar Header */}
            <div className="flex items-center justify-between  h-16 px-6">
                {/* Logo */}
                <NavLink to="/"><img src={'./favIcon.png'} alt={'logo'} width={24}/>
                    <h3 className="font-semibold text-lg">
                        RISE<span className="text-secondary">BLOG</span>
                    </h3>
                </NavLink>

                {/* Desktop Navigation (Hidden on xs screens) */}
                <div className="max-sm:hidden sm:flex">
                    <ul className="flex list-none gap-6">
                        {nav_links.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    className={({isActive}) =>
                                        isActive
                                            ? "relative font-bold text-blue-600 after:absolute after:content-[''] after:w-2 after:h-2 after:bg-blue-600 after:rounded-full after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2"
                                            : "text-gray-700 "
                                    }
                                    to={link.href}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-between ">
                    <div className={' max-sm:hidden'}>
                        {!user && <Button title={"Sign Up"} onClick={() => SignIn()}/>}
                        {user && <div className={'flex items-center gap-2'}>
                            <img className={'rounded-full'} width={44} height={44} src={user.avatar? user.avatar:'./avatar.png'}
                                 onError={(e) => { e.currentTarget.src = '/avatar.png'; }}
                                 alt='avatar'/>
                            <div className={'flex flex-col '}>
                                <p className={'text-[12px] text-gray-500 select-none'}>{user.name}</p>
                                <p className={'text-[11px] text-gray-300 cursor-pointer hover:underline'} onClick={() => SignOut()}>Sign Out</p>
                            </div>

                        </div>}

                    </div>

                    {/* Mobile Menu Button (Visible on xs screens) */}
                    <div className="sm:hidden">
                        {showSideMenu ? (
                            <IoClose size={24} onClick={toggleSideMenu}/>
                        ) : (
                            <IoMenu size={24} onClick={toggleSideMenu}/>
                        )}
                    </div>
                </div>
            </div>

            {/* Side Menu (Absolute Positioning Below Navbar) */}
            {showSideMenu && (
                <div
                    className="absolute top-full w-1/3   right-0  bg-white-1 shadow-md border-l border-b border-t border-gray-200  "
                    style={{borderBottomLeftRadius: 15}}
                >

                    <ul className="list-none ">
                        {user ? <div className={'pl-5 flex items-center gap-1'}>
                                <img className={'rounded-full'} width={30} height={30} src={user.avatar} alt=''/>
                                <div className={'flex flex-col '}>
                                    <p className={'text-[11px] text-gray-500 select-none'}>{user.name}</p>
                                </div>

                            </div> :
                            <li className={'pl-5 text-gray-700 hover:text-blue-600  cursor-pointer hover:underline'}
                                onClick={() => SignIn()}>SignIn</li>}
                        <hr/>
                        {nav_links.map((link, index) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.href}
                                    className={({isActive}) =>
                                        isActive
                                            ? "font-bold text-blue-600 p-2 z-40"
                                            : "text-gray-700 hover:text-blue-600 p-2 z-50"
                                    }
                                    onClick={toggleSideMenu}
                                >
                                    <span className={'pl-3'}> {link.name}</span>
                                </NavLink>

                                {
                                     index == nav_links.length - 1 && !user ? null : <hr/>

                                }


                            </li>

                        ))}
                        {user && <li className={'pl-5 text-gray-700 hover:text-blue-600  cursor-pointer  z-50 pl-3'}
                                     onClick={() => SignOut()}>Sign Out</li>}

                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;