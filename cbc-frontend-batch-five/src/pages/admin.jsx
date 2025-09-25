import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import AdminProductsPage from './admin/adminProductsPage'
import AddProductPage from './admin/addProductPage'
import EditProductPage from './admin/editProductPage'
import AdminUsersPage from './admin/adminUsersPage'
import AdminOrdersPage from './admin/adminOrdersPage'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loading from '../components/loading'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoMdHome } from "react-icons/io";
import { BiLogOut } from 'react-icons/bi'
import NotFoundPage from './notFoundPage'

function Admin() {
  const location = useLocation()
  const path = location.pathname;
  const [status, setStatus] = useState("loading")
  const [user, setUser] = useState(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setStatus("unauthenticated");
      window.location.href = "/login"
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((reponse) => {
        if (reponse.data.role !== "admin") {
          setStatus("unauthorized");
          window.location.href = "/";
          toast.error("You are not authorized to access this page");
        } else {
          setUser(reponse.data);
          setStatus("authenticated");
        }
      }).catch((err) => {
        console.log(err);
        setStatus("unauthenticated");
        window.location.href = "/login";
        toast.error("You are not authenticated, please login");
      });
    }
  }, [status])

  function getClass(name) {
    if (path.includes(name)) {
      return "bg-accent text-primary p-4 block"
    } else {
      return "p-4 block"
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      {status === 'loading' || status === 'unauthenticated' || status === 'unauthorized' ?
        <Loading /> :
        <>
          {/* Sidebar - visible on md+ screens */}
          <div className='relative hidden md:block w-[300px] h-screen bg-seondary text-primary text-xl font-bold'>
            <div className='border-b border-gray-300 pb-3'>
              <img src={user?.img} alt="Admin" className='w-[80px] h-[80px] rounded-full mx-auto my-4 object-cover border-5 border-accent'/>
              <h1 className='text-center text-2xl'>{user?.firstName}</h1>
              <p className='text-center text-sm'>{user?.email}</p>
            </div>
            <div className='flex flex-col'>
              <Link to="/admin/products" className={getClass("products")}>Products</Link>
              <Link to="/admin/users" className={getClass("users")}>Users</Link>
              <Link to="/admin/orders" className={getClass("orders")}>Orders</Link>
              <Link to="/admin/reviews" className={getClass("reviews")}>Reviews</Link>
            </div>
            <div className='absolute bottom-0 w-full left-0 flex p-4 justify-between items-center'>
                  <button className='flex items-center text-white cursor-pointer hover:text-red-600 hover:font-extrabold' onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                  }}>
                  <BiLogOut className='mr-0.5 text-2xl'/>
                  <div className='cursor-pointer '>Logout</div>
                </button>
                <button className='flex items-center text-white cursor-pointer hover:text-green-600 hover:font-extrabold' onClick={() => {
                }}>
                  <IoMdHome className='mr-0.5 text-2xl font-extrabold'/>
                  <div className='cursor-pointer '><Link to ="/home">Home</Link></div>
                </button>
              </div>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden z-50  flex justify-between w-full h-[80px] items-center bg-seondary text-primary px-4 font-bold">
            {mobileNavOpen ? (
              <IoMdClose
                className="text-3xl cursor-pointer"
                onClick={() => setMobileNavOpen(false)}
              />
            ) : (
              <GiHamburgerMenu
                className="text-3xl cursor-pointer "
                onClick={() => setMobileNavOpen(true)}
              />
            )}
            <h1 className='text-2xl'>Admin Panel</h1>
            <div></div>
          </div>

          {/* Mobile drawer */}
          {mobileNavOpen && (
            <div
              className="md:hidden inset-0 fixed bg-[#00000060] z-40 flex"
              onClick={() => setMobileNavOpen(false)}
            >
              <div
                className="w-[250px] bg-white h-full text-xl pt-[80px] font-bold transform transition-transform duration-300 ease-in-out translate-x-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className='border-b border-gray-300 pb-3'>
                  <img src={user?.img} alt="Admin" className='w-[70px] h-[70px] rounded-full mx-auto my-4 object-cover border-5 border-accent'/>
                  <h1 className='text-center text-2xl'>{user?.firstName}</h1>
                  <p className='text-center text-sm'>{user?.email}</p>
                </div>
                <div className='flex flex-col'>
                  <Link to="/admin/products" className={getClass("products")} onClick={() => setMobileNavOpen(false)}>Products</Link>
                  <Link to="/admin/users" className={getClass("users")} onClick={() => setMobileNavOpen(false)}>Users</Link>
                  <Link to="/admin/orders" className={getClass("orders")} onClick={() => setMobileNavOpen(false)}>Orders</Link>
                  <Link to="/admin/reviews" className={getClass("reviews")} onClick={() => setMobileNavOpen(false)}>Reviews</Link>
                </div>

                <div className='absolute bottom-0 w-full left-0 flex p-4 justify-evenly items-center'>
                  <button className='flex items-center text-red-400 cursor-pointer hover:text-red-600 hover:font-extrabold' onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                  }}>
                  <BiLogOut className='mr-0.5 text-2xl'/>
                </button>
                <button className='flex items-center text-green-500 cursor-pointer hover:text-green-600 hover:font-extrabold'>
                  <div className='cursor-pointer '><Link to ="/home"><IoMdHome className='mr-0.5 text-2xl font-extrabold'/></Link></div>
                </button>
                </div>
                <div className='w-full h-[80px]'>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className='flex-1 h-screen bg-primary overflow-y-auto'>
            <Routes path="/*">
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/reviews" element={<h1>Reviews Page</h1>} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/edit-product" element={<EditProductPage />} />
              <Route path='/*' element={<NotFoundPage/>}/>
            </Routes>
          </div>
          {
            (path === "/admin/" || path === "/admin") &&
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-6xl md:text-8xl font-extrabold font-playWrite text-accent p-2 md:p-6'>Welcome</h1>
                <h1 className='text-3xl md:text-4xl font-sans text-seondary p-2 md:p-4'>{user.firstName} {user.lastName}</h1>
                <h1 className='text-sm md:text-[15px] text-gray-500'>Cristal Beauty Clear Admin Panel</h1>
              </div>
          }
        </>
      }
    </div>
  )
}

export default Admin
