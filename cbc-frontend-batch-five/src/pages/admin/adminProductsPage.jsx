import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
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
    <div className='w-full h-full max-h-full overflow-y-auto relative p-3'>
      {/* Add Product Button */}
      <Link to="/admin/add-product"
        className='fixed bottom-6 right-6 bg-accent text-white px-4 py-3 text-xl rounded-full shadow-lg transition-all duration-300 flex justify-center items-center'>
        + Add Product
      </Link>

      {/* Loader */}
      {
        isLoading ? (
          <div className='flex justify-center items-center w-full h-full'>
            <div className='h-[100px] w-[100px] border-8 border-t-accent border-gray-300 rounded-full animate-spin'></div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <thead className='bg-accent text-primary text-lg'>
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
                  <tr key={index} className='border-b hover:bg-gray-100'>
                    <td className='py-2 px-4'>{index+1}</td>
                    <td className='py-2 px-4'>{item.productId}</td>
                    <td className='py-2 px-4'>{item.name}</td>
                    <td className='py-2 px-4 flex items-center justify-center'>
                      <img src={item.images[0]} alt={item.name} className='w-[50px] h-[50px] object-cover rounded' />
                    </td>
                    <td className='py-2 px-4'>{item.labledPrice}</td>
                    <td className='py-2 px-4'>{item.stock}</td>
                    <td className='py-2 px-4'>{item.price}</td>
                    <td className='py-2 px-4'>
                      <div className='flex justify-center gap-4'>
                        <button
                          onClick={() => deleteProduct(item.productId)}
                          className='text-red-600 hover:text-red-800 transition-colors'>
                          <FaTrash size={18} />
                        </button>
                        <button
                          onClick={() => navigate('/admin/edit-product', { state: item })}
                          className='text-green-600 hover:text-green-800 transition-colors'>
                          <FaEdit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}

export default AdminProductsPage
