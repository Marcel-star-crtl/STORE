import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../../../components/ProductCard";

const Index = () => {
  const router = useRouter();
  const { query } = router.query; 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
            params: { title: query }
          });
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-20 section__padding">
      <h1 className="text-heading1-bold">Search Results for: {query}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 justify-center">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </>
      )}
    </div>
  );
};

export default Index;



// import React from 'react'

// const index = () => {
//   return (
//     <div>index</div>
//   )
// }

// export default index