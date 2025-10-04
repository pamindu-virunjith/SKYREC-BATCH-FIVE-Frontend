import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

function AdminReviewsPage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all products first
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to fetch products.");
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  // Fetch reviews of selected product
  const fetchReviews = (productId) => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/review/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setReviews(res.data.reviewsList || []);
        setIsLoading(false);
        setSelectedProduct(productId);
      })
      .catch((error) => {
        toast.error("Failed to fetch reviews.");
        console.log(error);
        setIsLoading(false);
      });
  };

  // Delete a review
  const deleteReview = (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Review deleted successfully.");
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      })
      .catch((error) => {
        toast.error("Failed to delete review.");
        console.log(error);
      });
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
      <h1 className="text-xl md:text-4xl font-bold mb-6 text-center  text-accent">
        Admin Review Management
      </h1>

      {/* Products List */}
      {!selectedProduct ? (
        <div>
          {isLoading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="border border-seondary/30 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all"
                  onClick={() => fetchReviews(product.productId)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-xl mb-1"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-500 text-sm">
                            Rs. {product.price.toFixed(2)}
                        </p>
                    </div>
                    <div className="text-accent-dark text-sm mt-1">
                        {/* Average rating */}
                    <p><span className="text-seondary">Avg Rating: </span>{product.averageRating ? product.averageRating.toFixed(1) : "N/A"}</p>

                    <small>{"⭐".repeat(Math.round(product.averageRating || 0))}</small>  
                      <p>{product.numReviews
                        ? ` (${product.numReviews} reviews)`
                        : " (No reviews)"}</p>
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Reviews List */
        <div>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setReviews([]);
            }}
            className="flex items-center text-lg font-bold gap-2 text-seondary hover:text-accent-dark mb-4 focus:outline-none cursor-pointer"
          >
            <BiArrowBack /> Back to Products
          </button>

          {isLoading ? (
            <p className="text-center text-gray-500">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center mt-20 text-xl text-gray-500">
              No reviews found for this product.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border border-seondary/30 rounded-xl p-4 shadow hover:shadow-md"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <img
                      src={rev.user?.img}
                      alt={rev.user?.firstName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-accent">
                        {rev.user?.firstName} {rev.user?.lastName}
                      </p>
                      <p className="text-yellow-500 text-xs">
                        {"⭐".repeat(rev.rating)}
                      </p>
                      <p className="text-gray-600 text-sm">{rev.review}</p>

                      <small className="text-gray-400 font-semibold text-xs">
                        Created at:
                        <span className="ml-2">
                          {new Date(rev.createdAt).toLocaleString()}
                        </span>
                      </small>
                      <small className="text-gray-400 text-xs block font-semibold">
                        Updated at:
                        <span className="ml-2">
                          {new Date(rev.updatedAt).toLocaleString()}
                        </span>
                      </small>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteReview(rev._id)}
                    className="mt-3 sm:mt-0 flex items-center justify-center gap-1 text-red-500 hover:text-red-700 transition-colors font-semibold focus:outline-none cursor-pointer"
                  >
                    <MdDeleteForever size={20} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminReviewsPage;
