// import React, { useEffect, useState } from 'react';
// import ProductCard from '../../../components/ProductCard'; 
// import { useRouter } from 'next/router';

// const NewArrivals = () => {
//   const [africanNewArrivals, setAfricanNewArrivals] = useState([]);
//   const [vintageNewArrivals, setVintageNewArrivals] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNewArrivals = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/api/product?tags=new-arrivals');
//         if (!response.ok) {
//           throw new Error('Failed to fetch new arrivals');
//         }
//         const data = await response.json();

//         const africanProducts = data.filter(product => 
//           product.category && product.category.title === 'African'
//         );
//         const vintageProducts = data.filter(product => 
//           product.category && product.category.title === 'Vintage'
//         );

//         setAfricanNewArrivals(africanProducts);
//         setVintageNewArrivals(vintageProducts);
//       } catch (error) {
//         console.error('Error fetching new arrivals:', error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNewArrivals();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const handleSeeAllBestSellers = () => {
//     router.push('/(root)/best-sellers');
//   };
  
//   const handleSeeAllNewArrivals = () => {
//     router.push('/new-arrivals');
//   };

//   return (
//     <div className="flex flex-col items-center gap-10 px-4 sm:px-8 md:px-12 lg:px-20" style={{padding: "2rem 4rem 4rem 4rem"}}>
//       <div className="new-arrivals w-full">
//         <div className="mb-10">
//           <div className="flex justify-between items-center">
//             <h2 className="font-bold mb-4" style={{fontSize: "32px"}}>African</h2>
//             <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeAllBestSellers}>See All Products</button>
//           </div>
//           {africanNewArrivals.length === 0 ? (
//             <p className="text-body-bold">No African new arrivals found</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {africanNewArrivals.map(product => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="mb-4">
//           <div className="flex justify-between items-center">
//             <h2 className="font-bold mb-4" style={{fontSize: "32px"}}>Vintage</h2>
//             <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeAllBestSellers}>See All Products</button>
//           </div>
//           {vintageNewArrivals.length === 0 ? (
//             <p className="text-body-bold">No Vintage new arrivals found</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {vintageNewArrivals.map(product => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewArrivals;









import React, { useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard'; 
import { useRouter } from 'next/router';

const NewArrivals = () => {
  const [africanNewArrivals, setAfricanNewArrivals] = useState([]);
  const [vintageNewArrivals, setVintageNewArrivals] = useState([]);
  const [categoryIds, setCategoryIds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?tags=new-arrivals`);
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data = await response.json();
    
        const africanProducts = data.filter(product => 
          product.category && product.category.title === 'African'
        );
        const vintageProducts = data.filter(product => 
          product.category && product.category.title === 'Vintage'
        );
    
        setAfricanNewArrivals(africanProducts);
        setVintageNewArrivals(vintageProducts);
    
        // Set category IDs
        if (africanProducts.length > 0) {
          setCategoryIds(prev => ({...prev, African: africanProducts[0].category._id}));
        }
        if (vintageProducts.length > 0) {
          setCategoryIds(prev => ({...prev, Vintage: vintageProducts[0].category._id}));
        }
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSeeAllAfrican = () => {
    if (categoryIds.African) {
      router.push(`/(root)/categories/${categoryIds.African}`);
    } else {
      toast.error("African category not found");
    }
  };
  
  const handleSeeAllVintage = () => {
    if (categoryIds.Vintage) {
      router.push(`/(root)/categories/${categoryIds.Vintage}`);
    } else {
      toast.error("Vintage category not found");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 gap-10 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="new-arrivals w-full">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">African</h2>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeAllAfrican}>See All Products</button>
          </div>
          {africanNewArrivals.length === 0 ? (
            <p className="text-body-bold">No African new arrivals found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {africanNewArrivals.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">Vintage</h2>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeAllVintage}>See All Products</button>
          </div>
          {vintageNewArrivals.length === 0 ? (
            <p className="text-body-bold">No Vintage new arrivals found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vintageNewArrivals.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
