// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/category/');
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const categoriesData = await response.json();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className="flex flex-col items-center gap-10 pt-8">
//       {/* <p className="text-heading1-bold">Categories</p> */}
//       {!categories.length ? (
//         <p className="text-body-bold">No categories found</p>
//       ) : (
//         <div className="w-full section__padding" style={{width: "section__padding"}}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
//             {categories.map((category) => (
//               <Link href={`/(root)/categories/${category._id}`} key={category._id} className="w-full">
//                 <div className="cursor-pointer w-full">
//                   <Image
//                     src={category.image?.url || '/default-image.jpg'}
//                     alt={category.title}
//                     width={350}
//                     height={200}
//                     layout="responsive"
//                     className="w-full"
//                   />
//                   <p className=" text-left" style={{fontSize: "32px", fontWeight: "700"}}>{category.title}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>




//   // <div className="flex flex-col items-center gap-10 py-8 px-4 sm:px-8 md:px-12 lg:px-20 section__padding">
//   //   <div className="best-sellers w-full">
//   //     <div className="flex justify-between items-center mb-4">
//   //       <p className="text-heading1-bold">New Arrivals</p>
//   //       {/* <button className="text-sm text-gray-600 hover:text-gray-800" onClick={handleSeeNewArrivals}>See More</button> */}
//   //     </div>
//   //     {!categories.length ? (
//   //       <p className="text-body-bold">No categories found</p>
//   //     ) : (
//   //       <div className="w-full section__padding">
//   //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
//   //           {categories.map((category) => (
//   //             <Link href={`/(root)/categories/${category._id}`} key={category._id} className="w-full">
//   //               <div className="cursor-pointer w-full">
//   //                 <Image
//   //                   src={category.image?.url || '/default-image.jpg'}
//   //                   alt={category.title}
//   //                   width={350}
//   //                   height={200}
//   //                   layout="responsive"
//   //                   className="w-full"
//   //                 />
//   //                 <p className=" text-left" style={{fontSize: "35px", fontWeight: "700"}}>{category.title}</p>
//   //               </div>
//   //             </Link>
//   //           ))}
//   //         </div>
//   //       </div>
//   //     )}
//   //   </div>
//   // </div>
//   );
// };

// export default Categories;












// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/category/');
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const categoriesData = await response.json();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className="flex flex-col items-center gap-10 pt-8">
//       {/* <p className="text-heading1-bold">Categories</p> */}
//       {!categories.length ? (
//         <p className="text-body-bold">No categories found</p>
//       ) : (
//         <div className="w-full section__padding" style={{width: "section__padding"}}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
//             {categories.map((category) => (
//               <Link href={`/(root)/categories/${category._id}`} key={category._id} className="w-full">
//                 <div className="cursor-pointer w-full">
//                   <Image
//                     src={category.image?.url || '/default-image.jpg'}
//                     alt={category.title}
//                     width={350}
//                     height={200}
//                     layout="responsive"
//                     className="w-full"
//                   />
//                   <p className=" text-left" style={{fontSize: "32px", fontWeight: "700"}}>{category.title}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Categories;








import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FullImage from '../components/FullImage';

import cat from '../../public/category.png';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/category/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 pt-8">
      {!categories.length ? (
        <p className="text-body-bold">No categories found</p>
      ) : (
        <>
          <div className="hidden md:block w-full section__padding">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  w-full">
              {categories.map((category) => (
                <Link href={`/(root)/categories/${category._id}`} key={category._id} className="w-full">
                  <div className="cursor-pointer w-full">
                    <Image
                      src={category.image?.url || '/default-image.jpg'}
                      alt={category.title}
                      width={350}
                      height={200}
                      layout="responsive"
                      className="w-full"
                    />
                    <p className="text-left" style={{ fontSize: "32px", fontWeight: "700" }}>{category.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="block md:hidden w-full px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link href={`/(root)/categories/${category._id}`} key={category._id} className="w-full">
                  <div className="cursor-pointer w-full">
                    <Image
                      src={category.image?.url || '/default-image.jpg'}
                      alt={category.title}
                      width={350}
                      height={200}
                      layout="responsive"
                      className="w-full"
                    />
                    <p className="text-left text-xl sm:text-2xl md:text-3xl font-bold mt-2">{category.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
