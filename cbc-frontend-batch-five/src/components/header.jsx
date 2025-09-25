import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import AccountMenu from "./dropDownMenu";

export default function Header(){  
    const navigate = useNavigate()
    const location = useLocation()

    const path = location.pathname

    const[sideDrawerOpened,setSideDrawerOpened] = useState(true)
    const[user,setUser] = useState(null)

     try{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }).then((res)=>{
            setUser(res.data)
        })
    }catch(err){
        console.log(err)
    }

    function setPath(name){
        if(path.includes(name)){
            return "text-accent bg-gray-100 py-4 w-full text-center"
        }else{
            return "py-4 cursor-pointer hover:text-accent hover:bg-gray-100 w-full text-center"
        }
    }

    function wideScreenSetParth(name){
        if(path.includes(name)){
            return "text-accent font-extrabold"
        }else{
            return "hover:text-accent"
        }
    }

    return(
        <header className={`flex justify-between items-center w-full h-[80px] shadow-2xl  bg-white`}>
            {sideDrawerOpened ? (
                <GiHamburgerMenu
                    className="text-3xl mx-5 md:hidden cursor-pointer"
                    onClick={() => setSideDrawerOpened(false)}
                />
                
            ) : (
                <>
                    <IoMdClose
                    className ="text-4xl mx-4 md:hidden cursor-pointer"
                    onClick={() => setSideDrawerOpened(true)}
                />
                <div className ="fixed z-100 w-full h-[calc(100%-80px)] bottom-0 bg-[#00000060] flex md:hidden" onClick={() => setSideDrawerOpened(true)}>
                    <div className="w-[300px] bg-white h-full ">
                        <div className="flex flex-col justify-center items-center text-2xl font-bold">
                            <a href="/home" className={setPath("/home")}>Home</a>
                            <a href="/products" className={setPath("/products")}>Products</a>
                            <a href="/about" className={setPath("/about")}>About</a>
                            <a href="/contact" className={setPath("/contact")}>Contact</a>
                            <a href="/search" className={setPath("/search")}>Search</a>
                            <a href="/cart" className={setPath("/cart")}><BsCart3 className="text-3xl w-full"/></a>
                        </div>
                    </div>
                </div>
                </>
            )}
            
            <div className ="w-[80px]">
                <img src="/logo.png" alt="Logos" className="w-[80px] h-[80px] object-cover cursor-pointer" onClick={()=>{
                    navigate("/")
                }}/>
            </div>
            <div className ="w-[calc(100%-160px)] h-[80px] justify-evenly items-center font-bold text-[20px] hidden md:flex">
                <Link to="/home" className={wideScreenSetParth("/home")} >Home</Link>
                <Link to="/products" className={wideScreenSetParth("/products")}>Products</Link>
                <Link to="/about" className={wideScreenSetParth("/about")}>About</Link>
                <Link to="/contact" className={wideScreenSetParth("/contact")}>Contact</Link>
                <Link to="/search" className={wideScreenSetParth("/search")}>Search</Link>
            </div>
            <div className="w-[80px] h-[80px] md:flex justify-center items-center hidden">
                <Link to="/cart" onClick={()=>sideDrawerOpened(false)}>
                    <BsCart3 className="font-bold  text-3xl text-seondary"></BsCart3>
                </Link>
            </div>
            <AccountMenu user = {user}/>
        </header>
    )
}   