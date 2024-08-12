import React from "react";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import Imagery from "./Imagery";

const ProductCard = ({ product, updateWishlist, categoryTitle }) => {
  React.useEffect(() => {
    console.log('Product data:', product);
  }, [product]);

  if (!product || !product._id || !product.images || !product.images.length) {
    console.log('Product data is incomplete or image URL is missing:', product);
    return <p className="text-red-500 p-4">Error: Product data is incomplete</p>;
  }

  return (
    <div className="w-full flex flex-col gap-4 cursor-pointer">
      <Link href={`/(root)/products/${product._id}`}>
        <div className="w-full">
          <Imagery productMedia={product.images.map(image => image.url)} />
        </div>
      </Link>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{product.title}</p>
          <p className="text-sm text-gray-500" style={{fontFamily: "Poppins-Regular"}}>
            {categoryTitle || 'Unknown Category'}
          </p>
          <p className="text-base font-medium" style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}>$ {product.price.toFixed(0)}</p>
        </div>
        <HeartFavorite product={product} updateWishlist={updateWishlist} />
      </div>
    </div>
  );
};

export default ProductCard;



// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import HeartFavorite from "./HeartFavorite";

// const ProductCard = ({ product, updateWishlist }) => {
//   React.useEffect(() => {
//     console.log('Product data:', product);
//   }, [product]);

//   if (!product || !product._id || !product.images || !product.images.length) {
//     console.log('Product data is incomplete or image URL is missing:', product);
//     return <p>Error: Product data is incomplete</p>;
//   }

//   return (
//     <Link href={`/(root)/products/${product._id}`}>
//       <div className="w-full flex flex-col gap-2 cursor-pointer">
//         {product.images.length > 0 ? (
//           <div className="relative pt-[100%] Imgary">
//             <Image
//               src={product.images[0].url}
//               alt="product"
//               layout="fill"
//               objectFit="cover"
//             />
//           </div>
//         ) : (
//           <div className="w-full pt-[100%] bg-gray-200 flex items-center justify-center">
//             No Image Available
//           </div>
//         )}
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-base-bold" style={{fontSize: "18px", fontWeight: "600"}}>{product.title}</p>
//             <p className="text-small-medium text-gray-500">
//               {product.category?.title || 'Unknown Category'}
//             </p>
//             <p className="" style={{fontSize: "14px"}}>$ {product.price}</p>
//           </div>
//           <HeartFavorite product={product} updateWishlist={updateWishlist} />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;













// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import HeartFavorite from "./HeartFavorite";

// const ProductCard = ({ product }) => {
//   if (!product || !product._id || !product.images || !product.images[0]) {
//     console.log('Product data is incomplete or image URL is missing:', product);
//     return <p>Error: Product data is incomplete</p>;
//   }

//   console.log('Product data:', product); 

//   return (
//     <Link href={`/products/${product._id}`}>
//       <div className="w-full sm:w-[400px] grid grid-cols-1 gap-2 cursor-pointer">
//         <div className="relative">
//           <Image
//             src={product.images[0].url} 
//             alt="product"
//             width={450}
//             height={500}
//             className="object-cover"
//           />
//         </div>
//         <div>
//           <p className="text-base-bold">{product.title}</p>
//           <p className="text-small-medium text-grey-2">{product.category}</p>
//         </div>
//         <div className="flex justify-between items-center">
//           <p className="text-body-bold">${product.price}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

