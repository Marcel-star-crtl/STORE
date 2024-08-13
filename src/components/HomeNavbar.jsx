
// import Link from "next/link";
// import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/router";
// import { FaBars, FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
// import useCart from "../lib/hooks/useCart";
// import { removeToken, getToken } from "../utils/jwt"; 
// import Image from 'next/image';

// const HomeNavbar = () => {
//   const [nav, setNav] = useState(false);
//   const [query, setQuery] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [showAccountDropdown, setShowAccountDropdown] = useState(false);
//   const { clearCart } = useCart();
//   const router = useRouter();
//   const dropdownRef = useRef(null);

//   const handleLogout = () => {
//     removeToken();
//     localStorage.removeItem("cartItems");
//     clearCart();
//     router.push('/(auth)/sign-in');
//   };

//   const linksLeft = [
//     { id: 1, link: "collections", path: "/(root)/category " },
//     { id: 2, link: "new arrivals", path: "/(root)/new-arrivals" },
//     { id: 3, link: "best sellers", path: "/(root)/best-sellers" },
//   ];

//   const linksRight = [
//     { id: 4, link: "cart", path: "/(root)/cart" },
//   ];

//   const accountLinks = [
//     { id: 1, link: "History", path: "/history" },
//     { id: 2, link: "Wish List", path: "/(root)/wishlist" },
//     { id: 3, link: "Orders", path: "/(root)/orders" },
//     { id: 4, link: "Logout", path: "/(auth)/sign-in", isLogout: true }, 
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowAccountDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSearchIconClick = () => {
//     setShowSearch(!showSearch);
//   };

//   const handleSearchInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSearchInputKeyDown = (e) => {
//     if (e.key === "Enter" && query.trim()) {
//       router.push(`(root)/search/${query}`);
//     }
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery("");
//   };

//   const toggleAccountDropdown = () => {
//     setShowAccountDropdown(!showAccountDropdown);
//   };

//   return (
//     <div className="flex justify-between items-center w-full h-20 px-4 text-white fixed top-0 left-0 bg-black bg-opacity-0" style={{fontFamily: "Poppins-Regular"}}>
//       <ul className="flex">
//         {linksLeft.map(({ id, link, path }) => (
//           <li
//             key={id}
//             className="nav-links px-4 cursor-pointer capitalize font-medium hover:underline"
//           >
//             <Link href={path}>{link}</Link>
//           </li>
//         ))}
//       </ul>
//       <div style={{color: "white"}}>
//         <Link href="/">
//           <Image
//             src="/logoanne.png"
//             alt="Annie's"
//             width={150}
//             height={60}
//             priority
//           />
//         </Link>
//       </div>
//       <ul className="flex items-center">
//         {!showSearch && (
//           <li className="nav-links px-4 cursor-pointer capitalize font-medium">
//             <FaSearch onClick={handleSearchIconClick} className="hover:text-gray-300" size={20} />
//           </li>
//         )}
//         {showSearch && (
//           <li className="nav-links px-4 cursor-pointer capitalize font-medium relative">
//             <input
//               type="text"
//               className="ml-2 border rounded-lg px-2 py-1 text-black"
//               placeholder="Search..."
//               value={query}
//               onChange={handleSearchInputChange}
//               onKeyDown={handleSearchInputKeyDown}
//               onBlur={closeSearch}
//             />
//           </li>
//         )}
//         {linksRight.map(({ id, link, path }) => (
//           <li
//             key={id}
//             className="nav-links px-4 cursor-pointer capitalize font-medium hover:underline"
//           >
//             <Link href={path}>{link}</Link>
//           </li>
//         ))}
//         <li className="nav-links px-4 cursor-pointer capitalize font-medium relative" ref={dropdownRef}>
//           <div
//             className="flex items-center hover:underline"
//             onClick={toggleAccountDropdown}
//           >
//             Account <FaChevronDown className="ml-1" />
//           </div>
//           {showAccountDropdown && (
//             <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
//               {accountLinks.map(({ id, link, path, isLogout }) => (
//                 <li key={id} className="px-4 py-2 hover:bg-gray-100">
//                   {isLogout ? (
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left text-black"
//                     >
//                       {link}
//                     </button>
//                   ) : (
//                     <Link href={path} className="block w-full text-black">
//                       {link}
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       </ul>
//       <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-white md:hidden">
//         {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
//       </div>
//       {nav && (
//         <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-white">
//           {[...linksLeft, ...linksRight, ...accountLinks].map(({ id, link, path, isLogout }) => (
//             <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl">
//               {isLogout ? (
//                 <button onClick={handleLogout} className="text-white">
//                   {link}
//                 </button>
//               ) : (
//                 <Link onClick={() => setNav(!nav)} href={path} className="text-white">
//                   {link}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default HomeNavbar;














// import Link from "next/link";
// import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/router";
// import { FaBars, FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
// import useCart from "../lib/hooks/useCart";
// import { removeToken } from "../utils/jwt"; 
// import Image from 'next/image';

// const HomeNavbar = () => {
//   const [nav, setNav] = useState(false);
//   const [query, setQuery] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [showAccountDropdown, setShowAccountDropdown] = useState(false);
//   const { clearCart } = useCart();
//   const router = useRouter();
//   const dropdownRef = useRef(null);
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const handleLogout = () => {
//     removeToken();
//     localStorage.removeItem("cartItems");
//     clearCart();
//     router.push('/(auth)/sign-in');
//   };

//   const linksLeft = [
//     { id: 1, link: "collections", path: "/(root)/category " },
//     { id: 2, link: "new arrivals", path: "/(root)/new-arrivals" },
//     { id: 3, link: "best sellers", path: "/(root)/best-sellers" },
//   ];

//   const linksRight = [
//     { id: 4, link: "cart", path: "/(root)/cart" },
//   ];

//   const accountLinks = [
//     { id: 1, link: "History", path: "/(root)/orders" },
//     { id: 2, link: "Wish List", path: "/(root)/wishlist" },
//     { id: 4, link: "Contact", path: "/contact" },
//     { id: 4, link: "Logout", path: "/(auth)/sign-in", isLogout: true }, 
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowAccountDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const controlNavbar = () => {
//       if (typeof window !== 'undefined') {
//         if (window.scrollY > lastScrollY) { 
//           setVisible(false);
//         } else { 
//           setVisible(true);
//         }
//         setLastScrollY(window.scrollY);
//       }
//     };

//     if (typeof window !== 'undefined') {
//       window.addEventListener('scroll', controlNavbar);
//       return () => {
//         window.removeEventListener('scroll', controlNavbar);
//       };
//     }
//   }, [lastScrollY]);

//   const handleSearchIconClick = () => {
//     setShowSearch(!showSearch);
//   };

//   const handleSearchInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSearchInputKeyDown = (e) => {
//     if (e.key === "Enter" && query.trim()) {
//       router.push(`(root)/search/${query}`);
//     }
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery("");
//   };

//   const toggleAccountDropdown = () => {
//     setShowAccountDropdown(!showAccountDropdown);
//   };

//   return (
//     <div className={`flex justify-between items-center w-full h-16 md:h-20 px-4 text-white fixed top-0 left-0 bg-black transition-all duration-300 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'}`} style={{ fontFamily: "Poppins-Regular" }}>
//       <ul className="hidden md:flex">
//         {linksLeft.map(({ id, link, path }) => (
//           <li
//             key={id}
//             className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium hover:underline text-sm md:text-base"
//           >
//             <Link href={path}>{link}</Link>
//           </li>
//         ))}
//       </ul>
//       <div className="logo-wrapper flex-shrink-0">
//         <Link href="/">
//           <Image
//             src="/logoanne.png"
//             alt="Annie's"
//             width={100}
//             height={40}
//             className="w-24 md:w-32"
//             priority
//           />
//         </Link>
//       </div>
//       <ul className="flex items-center">
//         {!showSearch && (
//           <li className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium">
//             <FaSearch onClick={handleSearchIconClick} className="hover:text-gray-500" size={18} />
//           </li>
//         )}
//         {showSearch && (
//           <li className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium relative">
//             <input
//               type="text"
//               className="ml-2 border rounded-lg px-2 py-1 text-black text-sm w-24 md:w-32"
//               placeholder="Search..."
//               value={query}
//               onChange={handleSearchInputChange}
//               onKeyDown={handleSearchInputKeyDown}
//               onBlur={closeSearch}
//             />
//           </li>
//         )}
//         {linksRight.map(({ id, link, path }) => (
//           <li
//             key={id}
//             className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium hover:underline text-sm md:text-base hidden md:block"
//           >
//             <Link href={path}>{link}</Link>
//           </li>
//         ))}
//         <li className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium relative hidden md:block" ref={dropdownRef}>
//           <div
//             className="flex items-center hover:underline text-sm md:text-base"
//             onClick={toggleAccountDropdown}
//           >
//             Account <FaChevronDown className="ml-1" />
//           </div>
//           {showAccountDropdown && (
//             <ul className="absolute right-0 mt-2 py-2 w-48 bg-black rounded-md shadow-xl z-20">
//               {accountLinks.map(({ id, link, path, isLogout }) => (
//                 <li key={id} className="px-4 py-2 hover:bg-gray-100">
//                   {isLogout ? (
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left text-white text-sm"
//                     >
//                       {link}
//                     </button>
//                   ) : (
//                     <Link href={path} className="block w-full text-white text-sm">
//                       {link}
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       </ul>
//       <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-white md:hidden">
//         {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
//       </div>
//       {nav && (
//         <ul className="flex flex-col justify-start items-center absolute top-16 left-0 w-full h-screen bg-black text-white pt-8 md:hidden">
//           {[...linksLeft, ...linksRight, ...accountLinks].map(({ id, link, path, isLogout }) => (
//             <li key={id} className="px-4 cursor-pointer capitalize py-4 text-xl w-full text-center">
//               {isLogout ? (
//                 <button onClick={handleLogout} className="text-white w-full">
//                   {link}
//                 </button>
//               ) : (
//                 <Link onClick={() => setNav(!nav)} href={path} className="text-white block w-full">
//                   {link}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default HomeNavbar;








import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBars, FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
import useCart from "../lib/hooks/useCart";
import useAuthStore from '../stores/authStore';
import Image from 'next/image';

const HomeNavbar = () => {
  const [nav, setNav] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const clearCart = useCart((state) => state.clearCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = async () => {
    const logoutSuccessful = await logout();
    if (logoutSuccessful) {
      clearCart();
      router.push('/(auth)/sign-in');
    } else {
      console.error("Logout failed");
    }
  };

  const linksLeft = [
    { id: 1, link: "collections", path: "/(root)/category" },
    { id: 2, link: "new arrivals", path: "/(root)/new-arrivals" },
    { id: 3, link: "best sellers", path: "/(root)/best-sellers" },
  ];

  const linksRight = [
    { id: 4, link: "cart", path: "/(root)/cart" },
  ];

  const accountLinks = [
    { id: 1, link: "History", path: "/(root)/orders" },
    { id: 2, link: "Wish List", path: "/(root)/wishlist" },
    { id: 4, link: "Contact", path: "/contact" },
    { id: 5, link: "Logout", path: "/(auth)/sign-in", isLogout: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/(root)/search/${query}`);
    }
  };

  const closeSearch = () => {
    setShowSearch(false);
    setQuery("");
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  return (
    <div className={`flex justify-between items-center w-full h-16 md:h-20 px-4 text-white fixed top-0 left-0 bg-black transition-all duration-300 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'}`} style={{ fontFamily: "Poppins-Regular" }}>
      <ul className="hidden md:flex">
        {linksLeft.map(({ id, link, path }) => (
          <li
            key={id}
            className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium hover:underline text-sm md:text-base"
          >
            <Link href={path}>{link}</Link>
          </li>
        ))}
      </ul>
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="/logoanne.png"
            alt="Annie's"
            width={100}
            height={40}
            className="w-24 md:w-32 logo-filter"
            priority
          />
        </Link>
      </div>
      <ul className="flex items-center">
        {!showSearch && (
          <li className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium">
            <FaSearch onClick={handleSearchIconClick} className="hover:text-gray-500" size={18} />
          </li>
        )}
        {showSearch && (
          <li className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium relative">
            <input
              type="text"
              className="ml-2 border rounded-lg px-2 py-1 text-black text-sm w-24 md:w-32"
              placeholder="Search..."
              value={query}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputKeyDown}
              onBlur={closeSearch}
            />
          </li>
        )}
        {linksRight.map(({ id, link, path }) => (
          <li
            key={id}
            className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium hover:underline text-sm md:text-base hidden md:block"
          >
            <Link href={path}>{link}</Link>
          </li>
        ))}
        <li className="nav-links px-2 md:px-4 cursor-pointer capitalize font-medium relative hidden md:block" ref={dropdownRef}>
          <div
            className="flex items-center hover:underline text-sm md:text-base"
            onClick={toggleAccountDropdown}
          >
            Account <FaChevronDown className="ml-1" />
          </div>
          {showAccountDropdown && (
            <ul className="absolute right-0 mt-2 py-2 w-48 bg-black rounded-md shadow-xl z-20">
              {accountLinks.map(({ id, link, path, isLogout }) => (
                <li key={id} className="px-4 py-2 hover:bg-gray-100">
                  {isLogout ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-white text-sm"
                    >
                      {link}
                    </button>
                  ) : (
                    <Link href={path} className="block w-full text-white text-sm">
                      {link}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-white md:hidden">
        {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      {nav && (
        <ul className="flex flex-col justify-start items-center absolute top-16 left-0 w-full h-screen bg-black text-white pt-8 md:hidden">
          {[...linksLeft, ...linksRight, ...accountLinks].map(({ id, link, path, isLogout }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-4 text-xl w-full text-center">
              {isLogout ? (
                <button onClick={handleLogout} className="w-full text-center">
                  {link}
                </button>
              ) : (
                <Link onClick={() => setNav(!nav)} href={path} className="block w-full">
                  {link}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeNavbar;
