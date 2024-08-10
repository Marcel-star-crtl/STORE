// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../../../../components/ProductCard";

// interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   brand: string;
//   images: { public_id: string; url: string }[];
// }

// const Search = () => {
//   const router = useRouter();
//   const { query } = router.query; // Access the 'query' parameter from router.query

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (query) {
//       const fetchData = async () => {
//         try {
//           setLoading(true);
//           const response = await axios.get<Product[]>(`http://localhost:5000/api/product`, {
//             params: { title: query }
//           });
//           setProducts(response.data);
//         } catch (error) {
//           console.error("Error fetching search results:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchData();
//     }
//   }, [query]);

//   return (
//     <div className="flex flex-col items-center gap-10 py-8 px-20 section__padding">
//       <h1 className="text-heading1-bold">Search Results for: {query}</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {products.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 justify-center">
//               {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <p>No products found</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Search;




import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index