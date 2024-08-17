// // import React, { useState } from "react";
// // import { MinusCircle, PlusCircle } from "lucide-react";
// // import useCart from "../lib/hooks/useCart";

// // const ProductInfo = ({ productInfo }) => {
// //   const [selectedColor, setSelectedColor] = useState("Color");
// //   const [selectedSize, setSelectedSize] = useState(productInfo.sizes?.[0] || null);
// //   const [quantity, setQuantity] = useState(1);
// //   const cart = useCart();

// //   // Recalculate the total price based on the quantity
// //   const totalPrice = (productInfo.price * quantity).toFixed(2);

// //   const handleAddToCart = () => {
// //     cart.addItem({
// //       item: productInfo,
// //       quantity,
// //       color: selectedColor,
// //       size: selectedSize,
// //     });
// //   };

// //   const handleIncreaseQuantity = () => setQuantity(quantity + 1);
// //   const handleDecreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

// //   console.log("productInfo.colors:", productInfo.colors);

// //   return (
// //     <div className="max-w-[400px] flex flex-col gap-4">
// //       <div className="flex justify-between items-center">
// //         <p className="text-heading3-bold">{productInfo.title}</p>
// //       </div>
// //       <div className="flex gap-2">
// //         <p className="text-base-bold">{productInfo.category}</p>
// //       </div>
// //       <p className="text-heading3-bold">XAF {totalPrice}</p>

// //       {/* Quantity and Color Selector */}
// //       <div className="flex items-center gap-4">
// //         <div className="flex items-center gap-2">
// //           <MinusCircle
// //             className="hover:text-red-1 cursor-pointer"
// //             onClick={handleDecreaseQuantity}
// //           />
// //           <input
// //             type="text"
// //             value={quantity}
// //             readOnly
// //             className="w-12 text-center border border-black"
// //           />
// //           <PlusCircle
// //             className="hover:text-red-1 cursor-pointer"
// //             onClick={handleIncreaseQuantity}
// //           />
// //         </div>

// //         {productInfo.colors?.length > 0 && (
// //           <div className="relative flex items-center">
// //             <select
// //               className="border border-black px-2 py-1 appearance-none"
// //               value={selectedColor}
// //               onChange={(e) => setSelectedColor(e.target.value)}
// //             >
// //               <option value="Color" disabled>
// //                 Color
// //               </option>
// //               {productInfo.colors.map((color, index) => (
// //                 <option key={index} value={color}>
// //                   {color}
// //                 </option>
// //               ))}
// //             </select>
// //             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
// //               <svg
// //                 className="fill-current h-4 w-4"
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 viewBox="0 0 20 20"
// //               >
// //                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
// //               </svg>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <button
// //         className="outline text-base-bold py-3 bg-black text-white mt-4"
// //         onClick={handleAddToCart}
// //       >
// //         Add To Cart
// //       </button>

// //       <div className="flex flex-col gap-2">
// //         <p className="text-base-medium text-grey-2">Description:</p>
// //         <p className="text-small-medium">{productInfo.description}</p>
// //       </div>

// //       {productInfo.sizes?.length > 0 && (
// //         <div className="flex flex-col gap-2">
// //           <p className="text-base-medium text-grey-2">Sizes:</p>
// //           <div className="flex gap-2">
// //             {productInfo.sizes.map((size, index) => (
// //               <p
// //                 key={index}
// //                 className={`border border-black px-2 py-1 cursor-pointer ${selectedSize === size ? "bg-black text-white" : ""}`}
// //                 onClick={() => setSelectedSize(size)}
// //               >
// //                 {size}
// //               </p>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductInfo;













// import React, { useState, useEffect } from "react";
// import { MinusCircle, PlusCircle } from "lucide-react";
// import useCart from "../lib/hooks/useCart";
// import { toast } from "react-toastify"; 
// import 'react-toastify/dist/ReactToastify.css'; 

// const ProductInfo = ({ productInfo }) => {
//   const [selectedColor, setSelectedColor] = useState("Color");
//   const [selectedSize, setSelectedSize] = useState(productInfo.sizes?.[0] || null);
//   const [quantity, setQuantity] = useState(1);
//   const [categoryTitle, setCategoryTitle] = useState("");
//   const cart = useCart();

//   const totalPrice = (productInfo.price * quantity).toFixed(2);

//   useEffect(() => {
//     const fetchCategoryTitle = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/category/${productInfo.category}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch category');
//         }
//         const categoryData = await response.json();
//         setCategoryTitle(categoryData.title);
//       } catch (error) {
//         console.error('Error fetching category:', error);
//         setCategoryTitle("Unknown Category");
//       }
//     };

//     if (productInfo.category) {
//       fetchCategoryTitle();
//     }
//   }, [productInfo.category]);

//   const handleAddToCart = () => {
//     cart.addItem({
//       item: productInfo,
//       quantity,
//       color: selectedColor,
//       size: selectedSize,
//     });
//     toast.success("Item added to cart");
//   };

//   const handleIncreaseQuantity = () => setQuantity(quantity + 1);
//   const handleDecreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   return (
//     <div className="max-w-[400px] flex flex-col gap-2">
//       <div className="flex justify-between items-center">
//         <p className="font-bold" style={{fontSize: "24px"}}>{productInfo.title}</p>
//       </div>
//       <div className="flex gap-1">
//         <p className="text-base-bold">{categoryTitle || "Loading..."}</p>
//       </div>
//       <p className="text-heading3-bold">$ {totalPrice}</p>

//       {/* Quantity and Color Selector */}
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2">
//           <MinusCircle
//             className="hover:text-red-1 cursor-pointer"
//             onClick={handleDecreaseQuantity}
//           />
//           <input
//             type="text"
//             value={quantity}
//             readOnly
//             className="w-12 text-center border border-black"
//           />
//           <PlusCircle
//             className="hover:text-red-1 cursor-pointer"
//             onClick={handleIncreaseQuantity}
//           />
//         </div>

//         {productInfo.colors?.length > 0 && (
//           <div className="relative flex items-center">
//             <select
//               className="border border-black px-2 py-1 appearance-none"
//               value={selectedColor}
//               onChange={(e) => setSelectedColor(e.target.value)}
//             >
//               <option value="Color" disabled>
//                 Color
//               </option>
//               {productInfo.colors.map((color, index) => (
//                 <option key={index} value={color}>
//                   {color}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg
//                 className="fill-current h-4 w-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//               </svg>
//             </div>
//           </div>
//         )}
//       </div>

//       <button
//         className="outline text-base-bold py-3 bg-black text-white mt-4"
//         style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}
//         onClick={handleAddToCart}
//       >
//         Add To Cart
//       </button>

//       <div className="flex flex-col gap-2">
//         <p className="text-base-medium text-grey-2">Description:</p>
//         <p className="text-small-medium" style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}>{productInfo.description}</p>
//       </div>

//       {productInfo.sizes?.length > 0 && (
//         <div className="flex flex-col gap-2">
//           <p className="text-base-medium text-grey-2">Sizes:</p>
//           <div className="flex gap-2">
//             {productInfo.sizes.map((size, index) => (
//               <p
//                 key={index}
//                 className={`border border-black px-2 py-1 cursor-pointer ${selectedSize === size ? "bg-black text-white" : ""}`}
//                 onClick={() => setSelectedSize(size)}
//               >
//                 {size}
//               </p>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductInfo;








import React, { useState, useEffect } from "react";
import useCart from "../lib/hooks/useCart";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductInfo = ({ productInfo }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [totalPrice, setTotalPrice] = useState(productInfo.price);
  const cart = useCart();

  useEffect(() => {
    const fetchCategoryTitle = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${productInfo.category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
        const categoryData = await response.json();
        setCategoryTitle(categoryData.title);
      } catch (error) {
        console.error('Error fetching category:', error);
        setCategoryTitle("Unknown Category");
      }
    };

    if (productInfo.category) {
      fetchCategoryTitle();
    }
  }, [productInfo.category]);

  useEffect(() => {
    setTotalPrice((productInfo.price * quantity).toFixed(2));
  }, [quantity, productInfo.price]);

  const handleAddToCart = () => {
    if (selectedColor) {
      cart.addItem({
        item: productInfo,
        quantity,
        color: selectedColor,
        totalPrice: parseFloat(totalPrice)
      });
      toast.success("Item added to cart");
    } else {
      toast.error("Please select a color");
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const totalReviews = productInfo.ratings ? productInfo.ratings.length : 0;

  return (
    <div className="flex items-center justify-center text-black">
      <div className="max-w-[400px] flex flex-col gap-0">
        <h1 className="font-bold text-3xl text-black">{productInfo.title}</h1>
        <p className="text-base-bold">{categoryTitle || "Loading..."}</p>
        <p className="text-xl font-semibold">${totalPrice}</p>
        
        <div className="flex items-center pt-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className={`w-4 h-4 ${star <= productInfo.totalrating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-600" style={{fontFamily: "Poppins-Regular"}}>{totalReviews} Reviews</span>
        </div>

        <div className="flex gap-4 py-4">
          <select
            className="border border-black py-1"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            style={{width: "60%", fontFamily: "Poppins-Regular", fontSize: "14px"}}
          >
            <option value="" disabled>Choose Color</option>
            {productInfo.color?.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-black px-3 py-1"
            style={{width: "40%", fontFamily: "Poppins-Regular"}}
            placeholder="Qty"
          />
        </div>

        <button
          className="w-full py-3 bg-black text-white font-semibold"
          onClick={handleAddToCart}
          style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}
        >
          Add to Cart
        </button>

        <div className="mt-8">
          <div 
            className="text-sm text-gray-700" 
            style={{fontFamily: "Poppins-Regular", fontSize: "16px" }}
            dangerouslySetInnerHTML={{ __html: productInfo.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;