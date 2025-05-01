import UserData from "./userData";
import { Link } from "react-router-dom";

export default function Header(){  
    return(
        <div className="bg-red-600 text-center p-[10px]">
            <h1 className="font-bold text-[30px] text-blue-700">Crystal Beauty Clear</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam harum accusantium voluptas facilis corrupti qui ipsa blanditiis vero nobis. Sequi repudiandae aliquam tenetur ipsa libero autem, eligendi vitae nulla?</p>
            <UserData/>
            <div className="bg-yellow-400 m-2.5 flex justify-evenly p-1.5">
                <Link to="/">Home Page</Link>
                <Link to="/login">Login Page</Link>
                <Link to="/signup">Sign Up Page</Link>
                <Link to="/admin">Admin Page</Link>
            </div>
        </div>
    )
}   