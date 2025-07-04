import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {

  const product = props.pro;

  return (
    <Link to={'/overview/'+product.productId} className="w-[300px] h-[400px] bg-white shadow-lg m-[15px] rounded-[12px] flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      
      {/* Image Section – no padding */}
      <div className="h-[180px] bg-gray-100 flex justify-center items-center">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} className="h-full object-contain" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Product Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product.description}</p>
        </div>

        {/* Price & Stock Info */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400 line-through mr-2">
                Rs. {product.labledPrice}
              </span>
              <span className="text-lg font-bold text-red-600">
                Rs. {product.price}
              </span>
            </div>
            <div>
              {product.isAvailable && product.stock > 0 ? (
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          disabled={!product.isAvailable || product.stock <= 0}
          className={`mt-4 w-full py-2 rounded-[8px] font-semibold text-white transition-colors cursor-pointer duration-300 ${
            product.isAvailable && product.stock > 0
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
         
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
