import UserData from "./userData";

export default function Header(){  
    return(
        <div className="bg-red-600 text-center p-[16px]">
            <h1 className="font-bold text-[30px] text-blue-700">Crystal Beauty Clear</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam harum accusantium voluptas facilis corrupti qui ipsa blanditiis vero nobis. Sequi repudiandae aliquam tenetur ipsa libero autem, eligendi vitae nulla?</p>
            <UserData/>    
        </div>
    )
}   