import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";

function ProductPage() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProduct(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-[calc(100vh-80px)]  overflow-y-auto">
      <div className="w-full xl:w-[75%] mx-auto flex flex-wrap justify-center xl:justify-start items-center">
        {isLoading ? (
          <Loading />
        ) : (
          product.map((pro) => {
            return <ProductCard key={pro.productId} pro={pro} />;
          })
        )}
      </div>
    </div>
  );
}

export default ProductPage;
