// import { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import { useRouter } from 'next/router';

// const ProductList = () => {
//   const [bestSellers, setBestSellers] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);
//   const router = useRouter();


//   const handleSeeBestSellers = () => {
//     router.push('/(root)/best-sellers');
//   };
  
//   const handleSeeNewArrivals = () => {
//     router.push('/new-arrivals');
//   };


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseBestSellers = await fetch('http://localhost:5000/api/product?tags=best-sellers');
//         const bestSellersData = await responseBestSellers.json();
//         setBestSellers(bestSellersData);

//         const responseNewArrivals = await fetch('http://localhost:5000/api/product?tags=new-arrivals');
//         const newArrivalsData = await responseNewArrivals.json();
//         setNewArrivals(newArrivalsData);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col items-center gap-10 py-8 px-4 sm:px-8 md:px-12 lg:px-20" style={{ padding: "0 4rem 4rem 4rem"}}>
//       <div className="best-sellers w-full">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-heading1-bold" style={{fontSize: "35px", fontWeight: "700"}}>Best Sellers</p>
//           <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeBestSellers}>See More</button>
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
//       <div className="new-arrivals w-full">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-heading1-bold" style={{fontSize:"clamp(18px, 5vw, 35px)", fontWeight: "700"}}>New Arrivals</p>
//           <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeNewArrivals}>See More</button>
//         </div>
//         {!newArrivals.length ? (
//           <p className="text-body-bold">No new arrivals found</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {newArrivals.map(product => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;









// import { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import { useRouter } from 'next/router';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ProductList = () => {
//   const [bestSellers, setBestSellers] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);
//   const router = useRouter();

//   const handleSeeBestSellers = () => {
//     router.push('/(root)/best-sellers');
//   };
  
//   const handleSeeNewArrivals = () => {
//     router.push('/new-arrivals');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseBestSellers = await fetch('http://localhost:5000/api/product?tags=best-sellers');
//         const bestSellersData = await responseBestSellers.json();
//         setBestSellers(bestSellersData);

//         const responseNewArrivals = await fetch('http://localhost:5000/api/product?tags=new-arrivals');
//         const newArrivalsData = await responseNewArrivals.json();
//         setNewArrivals(newArrivalsData);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const sliderSettings = {
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
//     <div className="flex flex-col items-center gap-10 py-8" style={{ padding: "0 4rem 4rem 4rem"}}>
//       <div className="new-arrivals w-full">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-heading1-bold" style={{fontSize:"clamp(18px, 5vw, 35px)", fontWeight: "700"}}>New Arrivals</p>
//           <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeNewArrivals}>See More</button>
//         </div>
//         {!newArrivals.length ? (
//           <p className="text-body-bold">No new arrivals found</p>
//         ) : (
//           <Slider {...sliderSettings}>
//             {newArrivals.map(product => (
//               <div key={product._id}>
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//       <div className="best-sellers w-full">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-heading1-bold" style={{fontSize: "35px", fontWeight: "700"}}>Best Sellers</p>
//           <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeBestSellers}>See More</button>
//         </div>
//         {!bestSellers.length ? (
//           <p className="text-body-bold">No best sellers found</p>
//         ) : (
//           <Slider {...sliderSettings}>
//             {bestSellers.map(product => (
//               <div key={product._id}>
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;





// import { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import { useRouter } from 'next/router';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ProductList = () => {
//   const [bestSellers, setBestSellers] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);
//   const router = useRouter();

//   const handleSeeBestSellers = () => {
//     router.push('/(root)/best-sellers');
//   };
  
//   const handleSeeNewArrivals = () => {
//     router.push('/new-arrivals');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseBestSellers = await fetch('http://localhost:5000/api/product?tags=best-sellers');
//         const bestSellersData = await responseBestSellers.json();
//         setBestSellers(bestSellersData);

//         const responseNewArrivals = await fetch('http://localhost:5000/api/product?tags=new-arrivals');
//         const newArrivalsData = await responseNewArrivals.json();
//         setNewArrivals(newArrivalsData);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const sliderSettings = {
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
//     <div className="flex flex-col items-center gap-10 py-8 px-4 sm:px-6 md:px-8 lg:px-16">
//       <div className="new-arrivals w-full">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">New Arrivals</p>
//           <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeNewArrivals}>See More</button>
//         </div>
//         {!newArrivals.length ? (
//           <p className="text-lg font-semibold">No new arrivals found</p>
//         ) : (
//           <Slider {...sliderSettings}>
//             {newArrivals.map(product => (
//               <div key={product._id} className="px-2">
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//       <div className="best-sellers w-full mt-12">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Best Sellers</p>
//           <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeBestSellers}>See More</button>
//         </div>
//         {!bestSellers.length ? (
//           <p className="text-lg font-semibold">No best sellers found</p>
//         ) : (
//           <Slider {...sliderSettings}>
//             {bestSellers.map(product => (
//               <div key={product._id} className="px-2">
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

















import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { useRouter } from 'next/router';
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

const ProductList = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [currentNewArrivalsSlide, setCurrentNewArrivalsSlide] = useState(0);
  const [currentBestSellersSlide, setCurrentBestSellersSlide] = useState(0);
  const router = useRouter();
  const newArrivalsSliderRef = useRef(null);
  const bestSellersSliderRef = useRef(null);

  const handleSeeBestSellers = () => {
    router.push('/(root)/best-sellers');
  };
  
  const handleSeeNewArrivals = () => {
    router.push('/(root)/new-arrivals');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBestSellers = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?tags=best-sellers`);
        const bestSellersData = await responseBestSellers.json();
        setBestSellers(bestSellersData);

        const responseNewArrivals = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?tags=new-arrivals`);
        const newArrivalsData = await responseNewArrivals.json();
        setNewArrivals(newArrivalsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
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

  const goToNewArrivalsSlide = (slideIndex) => {
    newArrivalsSliderRef.current.slickGoTo(slideIndex);
  };

  const goToBestSellersSlide = (slideIndex) => {
    bestSellersSliderRef.current.slickGoTo(slideIndex);
  };

  const handleNewArrivalsAfterChange = (index) => {
    setCurrentNewArrivalsSlide(index);
  };

  const handleBestSellersAfterChange = (index) => {
    setCurrentBestSellersSlide(index);
  };

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-4 sm:px-6 md:px-8 lg:px-16 text-black">
      <div className="new-arrivals w-full mt-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold md:mb-2 lg:mb-2 text-black">New Arrivals</p>
          <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeNewArrivals}>See More</button>
        </div>
        {!newArrivals.length ? (
          <p className="text-lg font-semibold">No new arrivals found</p>
        ) : (
          <>
            <Slider ref={newArrivalsSliderRef} {...sliderSettings} afterChange={handleNewArrivalsAfterChange}>
              {newArrivals.map(product => (
                <div key={product._id} className="">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
            <CustomPagination 
              totalSlides={newArrivals.length} 
              currentSlide={currentNewArrivalsSlide} 
              goToSlide={goToNewArrivalsSlide} 
            />
          </>
        )}
      </div>
      <div className="best-sellers w-full mt-2">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold md:mb-2 lg:mb-2 text-black">Best Sellers</p>
          <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeBestSellers}>See More</button>
        </div>
        {!bestSellers.length ? (
          <p className="text-lg font-semibold">No best sellers found</p>
        ) : (
          <>
            <Slider ref={bestSellersSliderRef} {...sliderSettings} afterChange={handleBestSellersAfterChange}>
              {bestSellers.map(product => (
                <div key={product._id} className="">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
            <CustomPagination 
              totalSlides={bestSellers.length} 
              currentSlide={currentBestSellersSlide} 
              goToSlide={goToBestSellersSlide} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;