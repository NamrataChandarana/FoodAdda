import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom"; // A component used instead of anchor tag
import useOnlineStatus from "../utils/useOnlineStatus";
import { FaGenderless, FaCartPlus } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import SearchLocation from "./SearchLocation";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const [openMenu, setOpenMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    const onlineStatus = useOnlineStatus();
    const totalItems = useSelector((store) => store.cart.items.length);
    const { locationName, locationDisplayName } = useSelector((store) => store.location);

    return (
        <>
            <div className="w-full flex justify-around md:justify-between items-center font-semibold bg-slate-100 shadow-lg mb-2 h-[10vh] fixed top-0 z-30 px-[50px]">
                <div className="h-[80%] flex items-center ">
                    <Link to="/">
                        {/* <img className="h-[60px]" src={LOGO_URL} alt="logo" /> */}
                        <h2 className="font-Pacifico text-sm md:text-2xl leading-6 text-[#FC8522]">FoodAdda</h2>

                    </Link>

                    <div
                        className="md:m-4 p-1  shadow-md w-[200px] md:w-[20vw] h-[80%] relative cursor-pointer hover:border-b-2 hover:border-orange-500"
                        onClick={() => setOpenSearch((prev) => !prev)}
                    >
                        <p className="text-lg font-light text-orange-500">{locationName}</p>
                        {/* <p className="text-xs truncate text-gray-500">{locationDisplayName}</p> */}
                        <RiArrowDropDownLine className="h-full hover:bg-slate-100  bg-slate-200 text-orange-500 text-xl absolute top-0 right-0" />
                    </div>
                </div>

                {openSearch && <SearchLocation setOpenSearch={setOpenSearch} />}

                {/* *** for small screen *** */}
                {!openMenu
                    ? (<div className="md:hidden" onClick={() => {
                        setOpenMenu(true);
                    }}>
                        <RxHamburgerMenu className="text-4xl font-bold" />
                    </div>)

                    : (<div className="md:hidden bg-slate-200 border-2 border-slate-200 w-[70vw] h-[100vh] text-center absolute right-0 top-0 ">

                        <ul className="p-5 w-full">
                            <RxCross1 className="text-4xl font-bold " onClick={() => {
                                setOpenMenu(false);
                            }} />

                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500 hover:text-orange-500"> <Link to="/">Home</Link> </li>
                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500 hover:text-orange-500"> <Link to="/about">About Us</Link> </li>
                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500 hover:text-orange-500 ">
                                <Link to="/cart" className="relative">
                                    <FaCartPlus className="inline-block text-xl" />
                                    <span
                                        className="absolute -top-3 -right-2 px-1 py-[2px] text-sm bg-orange-500 text-white rounded-full"
                                    >{totalItems}</span>
                                </Link>

                            </li>
                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500 hover:text-orange-500">
                                <button onClick={() => {
                                    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                                }}
                                >
                                    {btnName}
                                </button>
                                <FaGenderless className={onlineStatus ? "text-green-500 inline" : "text-red-500 inline "} />
                            </li>
                        </ul>
                    </div>)
                }

                {/* *** for large screen *** */}
                <div className="hidden md:flex md:items-center">
                    <ul className="flex items-center p-2">
                        <li className="px-2 hover:text-orange-500"> <Link to="/">Home</Link> </li>
                        <li className="px-2 hover:text-orange-500"> <Link to="/about">About Us</Link> </li>
                        <li className="px-2 hover:text-orange-500">
                            <Link to="/cart" className="relative">
                                <FaCartPlus className="inline-block text-xl" />
                                <span
                                    className="absolute -top-3 -right-2 px-1 py-[2px] text-xs bg-orange-500 text-white rounded-full"
                                >{totalItems}</span>
                            </Link>
                        </li>
                        <button
                            className="px-2 hover:text-orange-500"
                            onClick={() => {
                                btnName === "login" ? setBtnName("logout") : setBtnName("login");
                            }}
                        >
                            {btnName}
                        </button>

                        <FaGenderless className={onlineStatus ? "text-green-500" : "text-red-500 "} />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;