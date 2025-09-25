import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/allUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((e)=>{
        console.log(e)
        toast.error("Failed to fetch users")
        setLoading(false)
      })
  }, [loading]);

  function deleteUser(userId){
    axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/users/${userId}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    }).then((res)=>{
      setLoading(true)
      console.log(res.data)
      toast.success(`User Account is Deleted`)
    })
    .catch((e)=>{
      console.log(e)
      toast.error("Error Deleting user Account")
    })
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-screen p-4">
      <h1 className="text-3xl font-bold my-4 text-center w-full text-accent font-mono">
        Admin Accounts
      </h1>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center">
        {users.map((user, index) => {
          return (
            user.role === "admin" && (
              <div
                key={index}
                className="relative border flex items-center md:w-[350px] border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={user.img}
                  alt={user.firstName}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-3 border-accent"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600 mb-1">Email: {user.email}</p>
                  <p className="text-gray-600 mb-1">Role: {user.role}</p>
                </div>
              </div>
            )
          );
        })}
      </div>

      <h1 className="text-3xl font-bold my-4 text-center w-full text-accent font-mono">
        User Accounts
      </h1>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center">
        {users.map((user, index) => {
          return (
            user.role === "Customer" && (
              <div
                key={index}
                className="flex justify-center"
              >
                <div className="relative border flex items-center w-full md:w-[350px] border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={user.img}
                    alt={user.firstName}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-3 border-accent"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1">Email: {user.email}</p>
                    <p className="text-sm text-gray-600 mb-1">Role: {user.role}</p>
                  </div>
                  <button className="absolute top-3 right-3 cursor-pointer text-red-500  hover:bg-red-500 hover:text-primary rounded-full p-1 focus:outline-none" onClick={()=>deleteUser(user._id)}><BiTrash className="text-xl"/></button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default AdminUsersPage;
