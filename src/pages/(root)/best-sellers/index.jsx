// import React, { useEffect, useState } from 'react';
// import ProductCard from '../../../components/ProductCard'; 

// const BestSellers = () => {
//   const [bestSellers, setBestSellers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBestSellers = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/api/product?tags=best-sellers');
//         if (!response.ok) {
//           throw new Error('Failed to fetch best sellers');
//         }
//         const data = await response.json();
//         setBestSellers(data);
//       } catch (error) {
//         console.error('Error fetching best sellers:', error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBestSellers();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="flex flex-col items-center gap-10 py-8 px-4 sm:px-8 md:px-12 lg:px-20 section__padding">
//       <div className="best-sellers w-full">
//       <div className="flex justify-between items-center mb-4">
//           <p className="text-heading1-bold">New Arrivals</p>
//         </div>
//         {!bestSellers.length ? (
//           <p className="text-body-bold">No best sellers found</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {bestSellers.map(product => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BestSellers;











import React, { useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard'; 
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const BestSellers = () => {
  const [africanBestSellers, setAfricanBestSellers] = useState([]);
  const [vintageBestSellers, setVintageBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryIds, setCategoryIds] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setIsLoading(true);
        
        // Fetch best sellers
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?tags=best-sellers`);
        if (!response.ok) {
          throw new Error('Failed to fetch best sellers');
        }
        const data = await response.json();

        // Separate products into African and Vintage categories
        const africanProducts = data.filter(product => 
          product.category && product.category.title === 'African'
        );
        const vintageProducts = data.filter(product => 
          product.category && product.category.title === 'Vintage'
        );

        setAfricanBestSellers(africanProducts);
        setVintageBestSellers(vintageProducts);

        // Set category IDs
        if (africanProducts.length > 0) {
          setCategoryIds(prev => ({...prev, African: africanProducts[0].category._id}));
        }
        if (vintageProducts.length > 0) {
          setCategoryIds(prev => ({...prev, Vintage: vintageProducts[0].category._id}));
        }
      } catch (error) {
        console.error('Error fetching best sellers:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
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
      <div className="best-sellers w-full">
        
        {/* African Best Sellers */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">African</h2>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeAllAfrican}>See All Products</button>
          </div>
          {africanBestSellers.length === 0 ? (
            <p className="text-body-bold">No African best sellers found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {africanBestSellers.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Vintage Best Sellers */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">Vintage</h2>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeAllVintage}>See All Products</button>
          </div>
          {vintageBestSellers.length === 0 ? (
            <p className="text-body-bold">No Vintage best sellers found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vintageBestSellers.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;