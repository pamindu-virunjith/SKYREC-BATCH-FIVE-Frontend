import React from 'react';

function ProductCard(props) {
  return (
    <div className="w-72 bg-white shadow-md rounded-xl p-4 text-center transition-transform hover:-translate-y-1">
  <img className="w-full h-48 object-cover rounded-md mb-4" src={props.img} alt="Laptop" />
  <h1 className="text-lg font-semibold text-gray-800 mb-2">{props.name}</h1>
  <p className="text-sm text-gray-600 mb-3">{props.description}</p>
  <h2 className="text-base text-blue-600 font-bold mb-4">Price: {props.price}</h2>
  <div className="flex justify-center gap-2">
    <button className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-300 hover: transition-colors">
      Add to Cart
    </button>
    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-colors">
      Buy Now
    </button>
  </div>
</div>

  );
}

export default ProductCard;
