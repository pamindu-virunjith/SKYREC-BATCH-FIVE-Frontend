import { TbError404 } from "react-icons/tb";

function NotFoundPage() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
        <TbError404 className="text-7xl md:text-9xl"/>
        <h1 className="font-mono font-bold text-4xl md:text-5xl"> Not Found</h1>
    </div>
  )
}

export default NotFoundPage