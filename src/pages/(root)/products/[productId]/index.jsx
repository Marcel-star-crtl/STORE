import Gallery from "../../../../components/Gallery";
import ProductCard from "../../../../components/ProductCard";
import ProductInfo from "../../../../components/ProductInfo";
import FullImage from "../../../../components/FullImage";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import useCart from "../../../../lib/hooks/useCart";
import { getToken } from "../../../../utils/jwt";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import RelatedProducts from '../../../../components/Related';
import FullVideo from '../../../../components/FullVideo';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const CustomPagination = ({ totalSlides, currentSlide, goToSlide }) => {
  const maxVisibleDots = 5;
  const halfVisible = Math.floor(maxVisibleDots / 2);
  
  let startDot = Math.max(0, currentSlide - halfVisible);
  let endDot = Math.min(totalSlides - 1, startDot + maxVisibleDots - 1);
  
  if (endDot - startDot + 1 < maxVisibleDots) {
    startDot = Math.max(0, endDot - maxVisibleDots + 1);
  }

  const dots = [];
  for (let i = startDot; i <= endDot; i++) {
    dots.push(
      <button
        key={i}
        className={`dot ${i === currentSlide ? 'active' : ''}`}
        onClick={() => goToSlide(i)}
        aria-label={`Go to slide ${i + 1}`}
      />
    );
  }

  return (
    <div className="custom-pagination">
      <button 
        className="nav-button" 
        onClick={() => goToSlide(Math.max(0, currentSlide - 1))}
        disabled={currentSlide === 0}
        aria-label="Previous slide"
      >
        <Image src="/Line1.png" alt="Previous" width={18} height={18} />
      </button>
      {startDot > 0 && <span className="ellipsis">...</span>}
      {dots}
      {endDot < totalSlides - 1 && <span className="ellipsis">...</span>}
      <button 
        className="nav-button" 
        onClick={() => goToSlide(Math.min(totalSlides - 1, currentSlide + 1))}
        disabled={currentSlide === totalSlides - 1}
        aria-label="Next slide"
      >
        <Image src="/Line2.png" alt="Next" width={18} height={18} />
      </button>
    </div>
  );
};

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedProductCategories, setRelatedProductCategories] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentRelatedProductsSlide, setCurrentRelatedProductsSlide] = useState(0);
  const router = useRouter();
  const { productId } = router.query;
  const cart = useCart();
  const relatedProductsSliderRef = useRef(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productDetailsData = await response.json();
        setProductDetails(productDetailsData);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/related/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch related products');
        }
        const relatedProductsData = await response.json();
        setRelatedProducts(relatedProductsData);
    
        // Fetch category titles for related products
        const categoryPromises = relatedProductsData.map(product => 
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${product.category}`).then(res => res.json())
        );
        const categories = await Promise.all(categoryPromises);
        
        const categoryTitles = {};
        relatedProductsData.forEach((product, index) => {
          categoryTitles[product._id] = categories[index].title;
        });
        setRelatedProductCategories(categoryTitles);
      } catch (error) {
        console.error("Error fetching related products", error);
      }
    };

    if (productId) {
      fetchProductDetails();
      fetchRelatedProducts();
    }
  }, [productId]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating || !productId || !comment.trim()) {
      toast.error("Please provide a star rating, product ID, and comment.");
      return;
    }
  
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      console.log("Submitting rating with data:", {
        star: rating,
        prodId: productId,
        comment: comment.trim()
      });
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/rating`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          star: rating,
          prodId: productId,
          comment: comment.trim()
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
  
      const result = await response.json();
      console.log("Rating submitted successfully:", result);
      toast.success("Rating submitted successfully");
      
      // Refresh product details to show the new rating
      const updatedProductResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`);
      const updatedProductData = await updatedProductResponse.json();
      setProductDetails(updatedProductData);
      
      // Reset form
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(error.message || "Failed to submit rating");
    }
  };

  const relatedSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const goToRelatedProductsSlide = (slideIndex) => {
    relatedProductsSliderRef.current.slickGoTo(slideIndex);
  };

  const handleRelatedProductsAfterChange = (index) => {
    setCurrentRelatedProductsSlide(index);
  };

  return (
    <>
      <FullVideo videoUrl="/annies_vid4.mp4" />
      {productDetails && (
        <>
          <div className="flex justify-center items-start gap-8 px-4 md:px-16 pb-10 max-md:flex-col max-md:items-center text-black">
            <Gallery productMedia={productDetails.images.map(image => image.url)} />
            <ProductInfo productInfo={productDetails} cartItems={cart.cartItems} />
          </div>

          <div className="px-4 md:px-16 lg:px-48 xl:px-64 2xl:px-80 py-8 md:py-12 lg:py-16 text-black">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3" style={{paddingRight: "4rem"}}>
              <div className="flex items-center justify-between" style={{ marginBottom: "2rem"}}>
                <h2 style={{fontSize:"clamp(18px, 5vw, 32px)", fontWeight: "700", lineHeight: "1.0",}}>
                  Reviews
                </h2>
                <p style={{fontFamily: "Poppins-Regular"}}>All Reviews</p>
              </div>
                {productDetails.ratings.map((rating, index) => (
                  <div key={index} className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex pl-10">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < rating.star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500" style={{fontFamily: "Poppins-Regular"}}>
                        {new Date(rating.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center">
                        <img src={rating.userAvatar || "/avatar.png"} alt="User Avatar" className="w-8 h-8 rounded-full mr-3" />
                        <p className="font-semibold">{rating.userName || "Anonymous"}</p>
                      </div>
                      <p className="text-gray-700 ml-11" style={{fontFamily: "Poppins-Regular", fontSize: "16px"}}>{rating.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:w-1/3">
                <form onSubmit={handleRatingSubmit} className=" p-">
                  <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                  <div className="mb-4">
                    <label className="block mb-2" style={{fontFamily: "Poppins-Regular"}}>Rate Product</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`w-5 h-5 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <textarea 
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-2 border"
                      rows="4"
                      placeholder="Add Review"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors" style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}>
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col items-left px-4 md:px-16 text-black">
        <div className="text-body-normal text-grey-2 text-left mb-8 pl-2">
          <p className="text-left font-bold" style={{ fontSize: "clamp(18px, 5vw, 32px)", lineHeight: "1.0" }}>
            You May Also Like
          </p>
        </div>
        <div>
          {relatedProducts.length > 0 ? (
            <>
              <Slider 
                ref={relatedProductsSliderRef} 
                {...relatedSliderSettings} 
                afterChange={handleRelatedProductsAfterChange}
              >
                {relatedProducts.map((product) => (
                  <div key={product._id} className="">
                    <ProductCard 
                      product={product} 
                      categoryTitle={relatedProductCategories[product._id]}
                    />
                  </div>
                ))}
              </Slider>
              <CustomPagination 
                totalSlides={relatedProducts.length} 
                currentSlide={currentRelatedProductsSlide} 
                goToSlide={goToRelatedProductsSlide} 
              />
            </>
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>

      {/* CONNECT */}
      <div className="flex flex-col md:flex-row max-h-[400px] px-4 sm:px-16 py-8 text-black">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 border border-black">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight md:leading-snug lg:leading-tight text-center md:text-left text-black">
            Carefully <br/> Considered
          </h1>
        </div>
        <div className="w-full md:w-1/2 max-h-[400px] h-[254px] relative">
          <Image
            src="/detailsImg.png"
            alt="Carefully Considered"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;






// import Gallery from "../../../../components/Gallery";
// import ProductCard from "../../../../components/ProductCard";
// import ProductInfo from "../../../../components/ProductInfo";
// import FullImage from "../../../../components/FullImage";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import useCart from "../../../../lib/hooks/useCart";
// import { getToken } from "../../../../utils/jwt";
// import { toast } from "react-toastify"; 
// import 'react-toastify/dist/ReactToastify.css'; 
// import RelatedProducts from '../../../../components/Related';
// import FullVideo from '../../../../components/FullVideo';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from 'next/image';

// const CustomPagination = ({ totalSlides, currentSlide, goToSlide }) => {
//   const maxVisibleDots = 5;
//   const halfVisible = Math.floor(maxVisibleDots / 2);
  
//   let startDot = Math.max(0, currentSlide - halfVisible);
//   let endDot = Math.min(totalSlides - 1, startDot + maxVisibleDots - 1);
  
//   if (endDot - startDot + 1 < maxVisibleDots) {
//     startDot = Math.max(0, endDot - maxVisibleDots + 1);
//   }

//   const dots = [];
//   for (let i = startDot; i <= endDot; i++) {
//     dots.push(
//       <button
//         key={i}
//         className={`dot ${i === currentSlide ? 'active' : ''}`}
//         onClick={() => goToSlide(i)}
//         aria-label={`Go to slide ${i + 1}`}
//       />
//     );
//   }

//   return (
//     <div className="custom-pagination">
//       <button 
//         className="nav-button" 
//         onClick={() => goToSlide(Math.max(0, currentSlide - 1))}
//         disabled={currentSlide === 0}
//         aria-label="Previous slide"
//       >
//         <Image src="/Line1.png" alt="Previous" width={18} height={18} />
//       </button>
//       {startDot > 0 && <span className="ellipsis">...</span>}
//       {dots}
//       {endDot < totalSlides - 1 && <span className="ellipsis">...</span>}
//       <button 
//         className="nav-button" 
//         onClick={() => goToSlide(Math.min(totalSlides - 1, currentSlide + 1))}
//         disabled={currentSlide === totalSlides - 1}
//         aria-label="Next slide"
//       >
//         <Image src="/Line2.png" alt="Next" width={18} height={18} />
//       </button>
//     </div>
//   );
// };

// const ProductDetails = () => {
//   const [productDetails, setProductDetails] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [relatedProductCategories, setRelatedProductCategories] = useState({});
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const router = useRouter();
//   const { productId } = router.query;
//   const cart = useCart();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/product/${productId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product details');
//         }
//         const productDetailsData = await response.json();
//         setProductDetails(productDetailsData);
//       } catch (error) {
//         console.error("Error fetching product details", error);
//       }
//     };

//     const fetchRelatedProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/product/related/${productId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch related products');
//         }
//         const relatedProductsData = await response.json();
//         setRelatedProducts(relatedProductsData);
    
//         // Fetch category titles for related products
//         const categoryPromises = relatedProductsData.map(product => 
//           fetch(`http://localhost:5000/api/category/${product.category}`).then(res => res.json())
//         );
//         const categories = await Promise.all(categoryPromises);
        
//         const categoryTitles = {};
//         relatedProductsData.forEach((product, index) => {
//           categoryTitles[product._id] = categories[index].title;
//         });
//         setRelatedProductCategories(categoryTitles);
//       } catch (error) {
//         console.error("Error fetching related products", error);
//       }
//     };

//     if (productId) {
//       fetchProductDetails();
//       fetchRelatedProducts();
//     }
//   }, [productId]);

//   const handleRatingSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!rating || !productId || !comment.trim()) {
//       toast.error("Please provide a star rating, product ID, and comment.");
//       return;
//     }
  
//     try {
//       const token = getToken();
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }
  
//       console.log("Submitting rating with data:", {
//         star: rating,
//         prodId: productId,
//         comment: comment.trim()
//       });
  
//       const response = await fetch(`http://localhost:5000/api/product/rating`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           star: rating,
//           prodId: productId,
//           comment: comment.trim()
//         }),
//       });
  
//       // Rest of the function remains the same...
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       toast.error(error.message || "Failed to submit rating");
//     }
//   };
  

//   const relatedSliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };
  

//   return (
//     <>
//       {/* <FullImage imageUrl="/fullImage.png" /> */}
//       <FullVideo videoUrl="/annies_vid4.mp4" />
//       {productDetails && (
//         <>
//           <div className="flex justify-center items-start gap-8 py-10 px-24 max-md:flex-col max-md:items-center">
//             <Gallery productMedia={productDetails.images.map(image => image.url)} />
//             <ProductInfo productInfo={productDetails} cartItems={cart.cartItems} />
//           </div>

//           {/* Reviews and Ratings Section */}
//           <div className="" style={{padding: "2rem 20rem 4rem 20rem"}}>
//             {/* <h2 style={{fontSize:"clamp(18px, 5vw, 35px)", fontWeight: "700", lineHeight: "1.0", marginBottom: "2rem"}}>
//               Reviews
//             </h2> */}
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="md:w-2/3" style={{paddingRight: "4rem"}}>
//               <div className="flex items-center justify-between" style={{ marginBottom: "2rem"}}>
//                 <h2 style={{fontSize:"clamp(18px, 5vw, 32px)", fontWeight: "700", lineHeight: "1.0",}}>
//                   Reviews
//                 </h2>
//                 <p style={{fontFamily: "Poppins-Regular"}}>All Reviews</p>
//               </div>
//                 {productDetails.ratings.map((rating, index) => (
//                   <div key={index} className="mb-6 pb-6 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div className="flex pl-10">
//                         {[...Array(5)].map((_, i) => (
//                           <svg key={i} className={`w-4 h-4 ${i < rating.star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                       <p className="text-sm text-gray-500" style={{fontFamily: "Poppins-Regular"}}>
//                         {new Date(rating.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//                       </p>
//                     </div>
//                     <div className="mb-2">
//                       <div className="flex items-center">
//                         <img src={rating.userAvatar || "/avatar.png"} alt="User Avatar" className="w-8 h-8 rounded-full mr-3" />
//                         <p className="font-semibold">{rating.userName || "Anonymous"}</p>
//                       </div>
//                       {/* <div className="flex pl-10" >
//                         {[...Array(5)].map((_, i) => (
//                           <svg key={i} className={`w-4 h-4 ${i < rating.star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div> */}
//                       <p className="text-gray-700 ml-11" style={{fontFamily: "Poppins-Regular", fontSize: "16px"}}>{rating.comment}</p>
//                     </div>

//                   </div>
//                 ))}

//               </div>
//               <div className="md:w-1/3">
//                 <form onSubmit={handleRatingSubmit} className=" p-">
//                   <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
//                   <div className="mb-4">
//                     <label className="block mb-2" style={{fontFamily: "Poppins-Regular"}}>Rate Product</label>
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           type="button"
//                           onClick={() => setRating(star)}
//                           className={`w-5 h-5 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
//                         >
//                           <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     {/* <label htmlFor="comment" className="block mb-2">Your Review</label> */}
//                     <textarea 
//                       id="comment"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       className="w-full p-2 border"
//                       rows="4"
//                       placeholder="Add Review"
//                     ></textarea>
//                   </div>

//                   <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors" style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}>
//                       Submit Review
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <div className=" flex flex-col items-left" style={{ padding: "0rem 4rem 0 4rem" }}>
//         <p className="text-body-normal text-grey-2 text-left mb-8 pl-2">
//           <p style={{ fontSize: "clamp(18px, 5vw, 32px)", fontWeight: "700", lineHeight: "1.0" }}>You May Also Like</p>
//         </p>
//         <div>
//           <Slider {...relatedSliderSettings}>
//             {relatedProducts.length > 0 ? (
//               relatedProducts.map((product) => (
//                 <div key={product._id} className="px-2">
//                   <ProductCard 
//                     product={product} 
//                     categoryTitle={relatedProductCategories[product._id]}
//                   />
//                 </div>
//               ))
//             ) : (
//               <p>No related products found.</p>
//             )}
//           </Slider>
//         </div>
//       </div>


//       {/* CONNECT */}
//       {/* <div className="flex flex-col md:flex-row h-96 section__padding">
//         <div className="md:w-1/2 flex items-center p-4 border border-black">
//           <h1 style={{ fontFamily: 'Playfair Display', fontSize: '61px', fontWeight: 600, lineHeight: '1.2', textAlign: 'left', paddingLeft: "70px" }} className="text-2xl font-bold">Carefully <br/> Considered</h1>
//         </div>
//         <div className="md:w-1/2">
//           <img src="/detailsImg.png" alt="Carefully Considered" className="w-full h-auto md:h-full object-cover" />
//         </div>
//       </div> */}
//       <div className="w-full md:w-1/2 h-64 md:h-auto relative">
//         <Image
//           src="/detailsImg.png"
//           alt="Carefully Considered"
//           layout="fill"
//           objectFit="cover"
//           priority
//         />
//       </div>
//     </>
//   );
// };

// export default ProductDetails;













// import Gallery from "../../../../components/Gallery";
// import ProductCard from "../../../../components/ProductCard";
// import ProductInfo from "../../../../components/ProductInfo";
// import FullImage from "../../../../components/FullImage";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import useCart from "../../../../lib/hooks/useCart";
// import { getToken } from "../../../../utils/jwt";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import RelatedProducts from '../../../../components/Related';
// import FullVideo from '../../../../components/FullVideo';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ProductDetails = () => {
//   const [productDetails, setProductDetails] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const router = useRouter();
//   const { productId } = router.query;
//   const cart = useCart();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/product/${productId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product details');
//         }
//         const productDetailsData = await response.json();
//         setProductDetails(productDetailsData);
//       } catch (error) {
//         console.error("Error fetching product details", error);
//       }
//     };

//     const fetchRelatedProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/product/related/${productId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch related products');
//         }
//         const relatedProductsData = await response.json();
//         setRelatedProducts(relatedProductsData);
//       } catch (error) {
//         console.error("Error fetching related products", error);
//       }
//     };

//     if (productId) {
//       fetchProductDetails();
//       fetchRelatedProducts();
//     }
//   }, [productId]);

//   const handleRatingSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!rating || !productId || !comment.trim()) {
//       toast.error("Please provide a star rating, product ID, and comment.");
//       return;
//     }

//     try {
//       const token = getToken();
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }

//       console.log("Submitting rating with data:", {
//         star: rating,
//         prodId: productId,
//         comment: comment.trim()
//       });

//       const response = await fetch(`http://localhost:5000/api/product/rating`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           star: rating,
//           prodId: productId,
//           comment: comment.trim()
//         }),
//       });

//       // Rest of the function remains the same...
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       toast.error(error.message || "Failed to submit rating");
//     }
//   };

//   const relatedSliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   return (
//     <>
//       <FullVideo videoUrl="/annies_vid4.mp4" />
//       {productDetails && (
//         <>
//           <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
//             <Gallery productMedia={productDetails.images.map(image => image.url)} />
//             <ProductInfo productInfo={productDetails} cartItems={cart.cartItems} />
//           </div>

//           <div className="" style={{ padding: "2rem 20rem 4rem 20rem" }}>
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="md:w-2/3" style={{ paddingRight: "4rem" }}>
//                 <h2 style={{ fontSize: "clamp(18px, 5vw, 32px)", fontWeight: "700", lineHeight: "1.0", marginBottom: "2rem" }}>
//                   Reviews
//                 </h2>
//                 {productDetails.ratings.map((rating, index) => (
//                   <div key={index} className="mb-6 pb-6 border-b border-gray-200">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <svg key={i} className={`w-4 h-4 ${i < rating.star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                       <p className="text-sm text-gray-500">
//                         {new Date(rating.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//                       </p>
//                     </div>
//                     <div className="mb-2">
//                       <div className="flex items-center">
//                         <img src={rating.userAvatar || "/avatar.png"} alt="User Avatar" className="w-8 h-8 rounded-full mr-3" />
//                         <p className="font-semibold">{rating.userName || "Anonymous"}</p>
//                       </div>
//                       <p className="text-gray-700 ml-11">{rating.comment}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="md:w-1/3">
//                 <form onSubmit={handleRatingSubmit} className=" p-">
//                   <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
//                   <div className="mb-4">
//                     <label className="block mb-2" style={{ fontSize: "1.2rem" }}>
//                       Rating
//                     </label>
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`w-6 h-6 cursor-pointer ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                           onClick={() => setRating(i + 1)}
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="comment" className="block mb-2" style={{ fontSize: "1.2rem" }}>
//                       Comment
//                     </label>
//                     <textarea
//                       id="comment"
//                       className="w-full p-2 border border-gray-300 rounded"
//                       rows="4"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                     ></textarea>
//                   </div>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
//                   >
//                     Submit Review
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>

//           <div className="py-5 flex flex-col items-left gap-8" style={{ padding: "4rem 4rem 0 4rem" }}>
//             <p className="text-body-normal text-grey-2 text-left">
//               <p style={{ fontSize: "clamp(18px, 5vw, 32px)", fontWeight: "700", lineHeight: "1.0" }}>You May Also Like</p>
//             </p>
//             <div>
//               <Slider {...relatedSliderSettings}>
//                 {relatedProducts.length > 0 ? (
//                   relatedProducts.map((product) => (
//                     <div key={product._id} className="px-2">
//                       <ProductCard product={product} />
//                     </div>
//                   ))
//                 ) : (
//                   <p>No related products found.</p>
//                 )}
//               </Slider>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ProductDetails;
