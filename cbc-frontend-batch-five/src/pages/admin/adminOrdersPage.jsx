import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Loading from '../../components/loading'
import Modal from 'react-modal'

function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeOrder, setActiveOrder] = useState(null)

  const customStyles = {
    content: {
      width: '90%',
      height: '80%',
      maxWidth: '1000px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      padding: '1.5rem',
      overflowY: 'auto',
      overflowX: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 0 15px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
    },
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please login first')
      alert('Please login first')
      return
    }

    if (isLoading) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
          headers: { Authorization: 'Bearer ' + token },
        })
        .then((res) => {
          setOrders(res.data)
          setIsLoading(false)
        })
        .catch((e) => {
          toast.error('Error fetching orders: ' + (e.response?.data?.message || 'Unknown error'))
          setIsLoading(false)
        })
    }
  }, [isLoading])

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 font-semibold'
      case 'Completed':
        return 'text-green-600 font-semibold'
      case 'Returned':
        return 'text-blue-600 font-semibold'
      case 'Cancelled':
        return 'text-red-600 font-semibold'
      default:
        return 'text-gray-700'
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Modal for Order Details */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={customStyles}
            ariaHideApp={false}
          >
            {activeOrder && (
              <div className="space-y-6 text-gray-800 bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl">
                {/* Modal Header */}
                <div className="flex justify-between items-center bg-accent text-white px-4 py-3 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold">Order #{activeOrder.orderId}</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white text-red-500 hover:bg-red-100 font-bold w-8 h-8 rounded-full flex items-center justify-center shadow cursor-pointer"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>👤 Customer:</strong> {activeOrder.name}</div>
                  <div><strong>📧 Email:</strong> {activeOrder.email}</div>
                  <div><strong>📞 Phone:</strong> {activeOrder.phone}</div>
                  <div><strong>🏠 Address:</strong> {activeOrder.address}</div>
                  <div><strong>📅 Date:</strong> {new Date(activeOrder.date).toLocaleString()}</div>
                  <div>
                    <strong>📦 Status:</strong>{' '}
                    <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                      activeOrder.status === 'pending'
                        ? 'bg-yellow-500'
                        : activeOrder.status === 'Completed'
                        ? 'bg-green-500'
                        : activeOrder.status === 'Cancelled'
                        ? 'bg-red-500'
                        : activeOrder.status === 'Returned'
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                    }`}>
                      {activeOrder.status}
                    </span>

                    <select
                      onChange={async (e) => {
                        const updatedValue = e.target.value
                        try {
                          const token = localStorage.getItem("token")
                          await axios.put(
                            import.meta.env.VITE_BACKEND_URL + "/api/orders/" + activeOrder.orderId + "/" + updatedValue,
                            {},
                            {
                              headers: {
                                Authorization: "Bearer " + token,
                              }
                            }
                          )

                          setIsLoading(true)
                          const updatedOrder = { ...activeOrder }
                          updatedOrder.status = updatedValue
                          setActiveOrder(updatedOrder)

                        } catch (e) {
                          toast.error("Error updating order status")
                          console.log(e)
                        }
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                      <option selected disabled>Change Status</option>
                    </select>
                  </div>
                  <div><strong>💰 Labeled Total:</strong> Rs. {activeOrder.labeledTotal.toLocaleString()}</div>
                  <div><strong>💸 Total Paid:</strong> Rs. {activeOrder.total.toLocaleString()}</div>
                </div>

                {/* Product List */}
                <h3 className="text-lg font-bold text-accent">🛍️ Products</h3>
                <div className="flex flex-col gap-4">
                  {activeOrder.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border-l-4 border-accent bg-white p-4 shadow hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row items-center gap-4"
                    >
                      <img
                        src={item.productInfo.images[0]}
                        alt={item.productInfo.name}
                        className="w-24 h-24 md:w-30 md:h-30 object-cover rounded-md border border-gray-300"
                      />
                      <div className="text-sm space-y-1">
                        <div className="text-lg font-bold"><span className="text-sm text-black">Name: </span>{item.productInfo.name}</div>
                        <div className="text-gray-600 italic"><strong className='text-black'>Des: </strong>{item.productInfo.description}</div>
                        <div><strong>Qty:</strong> {item.quantity}</div>
                        <div><strong>Retail Price:</strong> Rs. {item.productInfo.labledPrice}</div>
                        <div><strong>Discounted:</strong> <span className="text-green-600 font-medium">Rs. {item.productInfo.price}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="text-center text-xl text-primary bg-accent p-2 w-[80px] rounded-[10px] cursor-pointer"
                    onClick={() => window.print()}
                  >
                    Print
                  </button>
                </div>
              </div>
            )}
          </Modal>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {orders.map((order, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveOrder(order)
                  setIsModalOpen(true)
                }}
                className="cursor-pointer bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-800">#{order.orderId}</h3>
                  <span className={`text-xs font-semibold ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600"><strong>👤</strong> {order.name}</p>
                <p className="text-sm text-gray-600"><strong>📞</strong> {order.phone}</p>
                <p className="text-sm text-gray-600"><strong>📍</strong> {order.address}</p>
                <p className="text-sm text-gray-600"><strong>💰</strong> Rs. {order.total.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="overflow-x-auto hidden lg:block">
            <table className="w-full min-w-[800px] border border-gray-200 shadow-md rounded-xl overflow-hidden">
              <thead className="bg-accent text-primary">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Total (Rs.)</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm">
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all cursor-pointer"
                    onClick={() => {
                      setActiveOrder(order)
                      setIsModalOpen(true)
                    }}
                  >
                    <td className="py-3 px-4">{order.orderId}</td>
                    <td className="py-3 px-4">{order.name}</td>
                    <td className="py-3 px-4">{order.email}</td>
                    <td className="py-3 px-4">{order.address}</td>
                    <td className="py-3 px-4">{order.phone}</td>
                    <td className="py-3 px-4 font-semibold text-right">{order.total.toLocaleString()}</td>
                    <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className={`py-3 px-4 ${getStatusStyle(order.status)}`}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminOrdersPage
