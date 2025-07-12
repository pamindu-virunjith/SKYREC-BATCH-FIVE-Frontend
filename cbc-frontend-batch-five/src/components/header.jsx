import UserData from "./userData";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Header(){  
    const navigate = useNavigate()
    const[sideDrawerOpened,setSideDrawerOpened] = useState(true)

    return(
        <header className="flex justify-between items-center w-full h-[80px] shadow-2xl">
            {sideDrawerOpened ? (
                <GiHamburgerMenu
                    className="text-3xl mx-5 md:hidden cursor-pointer"
                    onClick={() => setSideDrawerOpened(false)}
                />
                
            ) : (
                <>
                    <IoMdClose
                    className="text-4xl mx-4 md:hidden cursor-pointer"
                    onClick={() => setSideDrawerOpened(true)}
                />
                <div className="fixed h-[calc(100%-80px)] w-full bg-[#00000060] flex md:hidden bottom-0 left-0 z-1">
                    <div className="w-[300px] bg-white h-full">
                        <div className="flex flex-col items-center text-2xl font-bold">
                            <a href="/" className="py-4 cursor-pointer">Home</a>
                            <a href="/products" className="py-4 cursor-pointer">Products</a>
                            <a href="/about" className="py-4 cursor-pointer">About</a>
                            <a href="/contact" className="py-4 cursor-pointer">Contact</a>
                        </div>
                    </div>
                </div>
                </>
            )}
            
            <div className="w-[80px]">
                <img src="/logo.png" alt="Logos" className="w-[80px] h-[80px] object-cover cursor-pointer" onClick={()=>{
                    navigate("/")
                }}/>
            </div>
            <div className="w-[calc(100%-160px)] h-[80px] justify-evenly items-center font-bold text-[20px] hidden md:flex">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="w-[80px] h-[80px] flex justify-center items-center">
                <Link to="/cart" onClick={()=>sideDrawerOpened(false)}>
                    <BsCart3 className="font-bold  text-3xl md:text-4xl text-seondary"></BsCart3>
                </Link>
            </div>
        </header>
    )
}   