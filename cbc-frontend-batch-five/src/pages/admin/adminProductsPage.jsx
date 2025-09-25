import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import toast from 'react-hot-toast'

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res) => {
        setProducts(res.data)
        setIsLoading(false)
      }).catch((error) => {
        toast.error("Failed to fetch products.")
        console.log(error)
        setIsLoading(false)
      })
    }
  }, [isLoading])

  const deleteProduct = (productId) => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Please login to delete products")
      return
    }
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(() => {
      setIsLoading(true)
      toast.success("Product deleted successfully")
    }).catch((err) => {
      toast.error(err.response?.data?.message || "Deletion failed")
    })
  }

  return (
    <div className='w-full h-full overflow-y-auto relative pb-20 px-2 sm:px-4'>
      {/* Add Product Button */}
      <Link to="/admin/add-product">
        <div className='fixed bottom-4 right-4 z-10 bg-accent text-white px-4 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2'>
          <FaPlus className='text-lg sm:text-xl' />
          <span className='hidden sm:block font-medium'>Add Product</span>
        </div>
      </Link>
      
      {/* Loader */}
      {
        isLoading ? (
          <div className='flex justify-center items-center w-full h-full'>
            <div className='h-12 w-12 sm:h-16 sm:w-16 border-4 border-t-transparent border-accent rounded-full animate-spin'></div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className='hidden lg:block overflow-x-auto'>
              <table className='w-full rounded-xl overflow-hidden shadow-md bg-white'>
                <thead className='bg-accent text-white text-lg'>
                  <tr>
                    <th className='py-3 px-4'>Index</th>
                    <th className='py-3 px-4'>ID</th>
                    <th className='py-3 px-4'>Name</th>
                    <th className='py-3 px-4'>Image</th>
                    <th className='py-3 px-4'>Labeled Price</th>
                    <th className='py-3 px-4'>Stock</th>
                    <th className='py-3 px-4'>Price</th>
                    <th className='py-3 px-4'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-center text-sm bg-white'>
                  {products.map((item, index) => (
                    <tr key={index} className='hover:bg-accent/10 transition'>
                      <td className='py-2 px-4'>{index+1}</td>
                      <td className='py-2 px-4'>{item.productId}</td>
                      <td className='py-2 px-4 font-medium'>{item.name}</td>
                      <td className='py-2 px-4 flex items-center justify-center'>
                        <img src={item.images[0]} alt={item.name} className='w-[50px] h-[50px] object-cover rounded-lg shadow-sm' />
                      </td>
                      <td className='py-2 px-4'>Rs. {item.labledPrice}</td>
                      <td className='py-2 px-4'>{item.stock}</td>
                      <td className='py-2 px-4 text-accent font-semibold'>Rs. {item.price}</td>
                      <td className='py-2 px-4'>
                        <div className='flex justify-center gap-4'>
                          <button
                            onClick={() => deleteProduct(item.productId)}
                            className='text-red-500 hover:text-red-600 transition cursor-pointer'>
                            <FaTrash size={18} />
                          </button>
                          <button
                            onClick={() => navigate('/admin/edit-product', { state: item })}
                            className='text-green-600 hover:text-green-700 transition cursor-pointer'>
                            <FaEdit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className='lg:hidden space-y-6 mt-4'>
              {products.map((item, index) => (
                <div 
                  key={index} 
                  className='relative rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-accent text-white transform hover:-translate-y-1'
                >
                  {/* Top section */}
                  <div className='flex justify-between items-start mb-4'>
                    <span className='bg-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md'>
                      #{index + 1}
                    </span>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => deleteProduct(item.productId)}
                        className='bg-white/30 hover:bg-white/40 text-red-500 hover:text-red-600 p-2 rounded-lg transition cursor-pointer'>
                        <FaTrash size={14} />
                      </button>
                      <button
                        onClick={() => navigate('/admin/edit-product', { state: item })}
                        className='bg-white/30 hover:bg-white/40 text-green-600 hover:text-green-700 p-2 rounded-lg transition cursor-pointer'>
                        <FaEdit size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Image & Name */}
                  <div className='flex items-center gap-4 mb-4'>
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className='w-20 h-20 object-cover rounded-xl shadow-lg border-2 border-white/30' 
                    />
                    <div>
                      <h3 className='font-bold text-xl leading-tight text-seondary mb-2'>{item.name}</h3>
                      <p className='text-sm text-white/80'>ID: <span className="text-seondary font-bold">{item.productId}</span></p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className='grid grid-cols-3 gap-3 text-center'>
                    <div className='bg-white/20 rounded-xl p-3'>
                      <p className='text-xs text-white/70'>Labeled</p>
                      <p className='font-bold text-seondary'>Rs. {item.labledPrice}</p>
                    </div>
                    <div className='bg-white/30 rounded-xl p-3'>
                      <p className='text-xs text-white/70'>Price</p>
                      <p className='font-bold text-seondary'>Rs. {item.price}</p>
                    </div>
                    <div className='bg-white/30 rounded-xl p-3'>
                      <p className='text-xs text-white/70'>Stock</p>
                      <p className='font-bold text-seondary'>{item.stock}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className='flex flex-col items-center justify-center h-64 text-center'>
                <div className='text-gray-500 text-lg mb-2'>No products found</div>
                <p className='text-gray-400 text-sm'>Add your first product to get started</p>
              </div>
            )}
          </>
        )
      }
    </div>
  )
}

export default AdminProductsPage
