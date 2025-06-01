import UserData from "./userData";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

export default function Header(){  
    const navigate = useNavigate()

    return(
        <header className="flex justify-evenly items-center w-full h-[80px] shadow-2xl">
            <div className="w-[80px]">
                <img src="logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer" onClick={()=>{
                    navigate("/")
                }}/>
            </div>
            <div className="w-[calc(100%-160px)] h-[80px] flex justify-evenly items-center font-bold text-[20px]">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="w-[80px] h-[80px] flex justify-center items-center">
                <Link to="/cart">
                    <BsCart3 className="font-bold text-4xl text-seondary"></BsCart3>
                </Link>
            </div>
        </header>
    )
}   