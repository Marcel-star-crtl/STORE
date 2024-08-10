import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useCart from "../../../lib/hooks/useCart";
import { getToken } from "../../../utils/jwt";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

const Cart = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalRounded, setTotalRounded] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const refreshCart = async () => {
    if (isClient) {
      const updatedCartItems = await Promise.all(
        cart.cartItems.map(async (item) => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${item.item._id}`);
          const updatedProduct = await response.json();
          return { ...item, item: updatedProduct };
        })
      );
      setCartItems(updatedCartItems);
    }
  };

  useEffect(() => {
    if (isClient) {
      refreshCart();
    }
  }, [isClient, cart.cartItems]);

  useEffect(() => {
    if (isClient) {
      const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((cartItem) => {
          const itemTotal = cartItem.item.price * cartItem.quantity;
          total += itemTotal;
        });
        const roundedTotal = parseFloat(total.toFixed(2));
        setTotalRounded(roundedTotal);
      };

      calculateTotal();
    }
  }, [cartItems, isClient]);

  // Fetch user data from the Express API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (token) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("[fetchUserData]", error);
      }
    };

    if (isClient) {
      fetchUserData();
    }
  }, [isClient]);

  const handlePayPalCheckout = async () => {
    router.push({
      pathname: "/(root)/checkout",
      query: { totalRounded: totalRounded.toString() },
    });
  };

  const handleRemoveItem = (id) => {
    if (isClient) {
      cart.removeItem(id);
      refreshCart();
    }
  };

  const handleAddItem = (item) => {
    if (isClient) {
      cart.addItem(item);
      toast.success("Item added to cart");
      refreshCart();
    }
  };

  if (!isClient) {
    return null; 
  }

  const handleContinueShopping = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:w-3/4">
        <div className="flex flex-col lg:flex-row gap-8 py-16">
          <div className="w-full lg:w-2/3 flex items-center min-h-screen">
            <div className="w-full">
              {cartItems.length === 0 ? (
                <p className="text-body-bold">No item in cart</p>
              ) : (
                <div>
                  {cartItems.map((cartItem) => (
                    <div
                      key={cartItem.item._id}
                      className="flex flex-col sm:flex-row sm:gap-3 hover:bg-grey-1 px-4 py-3 sm:items-start justify-between"
                    >
                      <div className="flex">
                        <Image
                          src={
                            cartItem.item.images &&
                            cartItem.item.images.length > 0
                              ? cartItem.item.images[0].url
                              : ""
                          }
                          width={200}
                          height={150}
                          className="object-fill"
                          alt="product"
                          style={{ width: "170px", height: "170px" }}
                        />
                        <div className="flex flex-col gap-0 ml-4">
                          <p className="text-body-bold" style={{fontSize: "22px", fontWeight: "600", height: "1"}}>
                            {cartItem.item.title}
                          </p>
                          {cartItem.item.isFinalSale && (
                            <p className="text-small" style={{height: "1", fontSize: "14px", fontFamily: "Poppins-Regular"}}>
                              This item is final sale
                            </p>
                          )}
                          <p className="text-small" style={{height: "1", fontSize: "14px", fontFamily: "Poppins-Regular"}}>
                            {Array.isArray(cartItem.item.color) ? cartItem.item.color.join(', ') : cartItem.item.color} / Size {cartItem.item.size}
                          </p>
                          <p className="text-small" style={{height: "1", fontSize: "14px", fontFamily: "Poppins-Regular"}}>
                            Qty: {cartItem.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="flex flex-col justify-between items-end h-full">
                          <button
                            className="hover:text-red-1 cursor-pointer bg-transparent border-none "
                            onClick={() => handleRemoveItem(cartItem.item._id)}
                            style={{fontSize: "14px", fontFamily: "Poppins-Regular"}}
                            disabled={cartItem.item.isFinalSale}
                          >
                            Delete
                          </button>
                          <p className="text-small-medium bold-text mt-auto" style={{fontSize: "18px", fontWeight: "600", marginTop: "auto"}}>
                            ${cartItem.item.price * cartItem.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col bg-grey-1 justify-center min-h-screen lg:ml-20">
            <div className="w-full">
              <div className="relative w-full h-64 lg:h-96">
                <Image
                  src="/cart.png"
                  alt="A closeup photo of a woman wearing a necklace with a diamond pendant"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="py-4 text-black flex flex-col justify-between">
                <button
                  className="w-full text-white bg-black py-2 my-4"
                  onClick={handlePayPalCheckout}
                  style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}
                >
                  Check Out
                </button>
                <button
                  className="w-full text-white bg-black py-2"
                  onClick={handleContinueShopping}
                  style={{ fontSize: "14px", fontFamily: "Poppins-Regular" }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;







// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import useCart from "../../../lib/hooks/useCart"; 
// import { removeToken } from '../../../utils/jwt'; 

// const Cart = () => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const cart = useCart();
//   const [totalRounded, setTotalRounded] = useState(0);

//   // Calculate total rounded amount whenever cart changes
//   useEffect(() => {
//     const total = cart.cartItems.reduce(
//       (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
//       0
//     );
//     const roundedTotal = parseFloat(total.toFixed(2));
//     setTotalRounded(roundedTotal);
//   }, [cart.cartItems]);

//   // Fetch user data from the Express API
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (res.ok) {
//           const userData = await res.json();
//           setUser(userData);
//         } else {
//           setUser(null);
//           // router.push("/sign-in/page");
//         }
//       } catch (error) {
//         console.error("[fetchUserData]", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Handle checkout
//   const handleCheckout = async () => {
//     try {
//       if (!user) {
//         router.push("/(root)/checkout");
//       } else {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ cartItems: cart.cartItems }),
//         });
//         const data = await res.json();
//         window.location.href = data.url;
//         console.log(data);
//       }
//     } catch (err) {
//       console.log("[checkout_POST]", err);
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="w-full px-6" style={{width: "1200px"}}>
//         <div className="flex gap-20 py-16">
//           <div className="w-2/3">
//             {cart.cartItems.length === 0 ? (
//               <p className="text-body-bold">No item in cart</p>
//             ) : (
//               <div>
//                 {cart.cartItems.map((cartItem) => (
//                   <div key={cartItem.item._id} className="flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 max-sm:items-start justify-between">
//                     <div className="flex">
//                       <Image
//                         src={cartItem.item.images && cartItem.item.images.length > 0 ? cartItem.item.images[0].url : ''}
//                         width={200}
//                         height={150}
//                         className="object-fill"
//                         alt="product"
//                         style={{ width: '200px', height: '200px' }}
//                       />
//                       <div className="flex flex-col gap-3 ml-4">
//                         <p className="text-body-bold">{cartItem.item.title}</p>
//                         {cartItem.color && (
//                           <p className="text-small-medium">{cartItem.color}</p>
//                         )}
//                         {cartItem.size && (
//                           <p className="text-small-medium">{cartItem.size}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex gap-4 items-center">
//                       <div className="flex flex-col justify-between items-end h-full">
//                         <button className="hover:text-red-1 cursor-pointer bg-transparent border-none mb-auto" onClick={() => cart.removeItem(cartItem.item._id)}>Delete</button>
//                         <p className="text-small-medium">${cartItem.item.price}</p> 
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="w-1/3 flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
//             <div className="w-full max-w-md mx-auto">
//               <div className="relative" style={{height: "100%"}}>
//                 <Image
//                   src="/cart.png"
//                   alt="A closeup photo of a woman wearing a necklace with a diamond pendant"
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               </div>
//               <div className="p-4 text-white flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold">Check Out</h3>
//                   <p className="text-sm mb-2">Continue Shopping</p>
//                 </div>
//                 <button className="text-white bg-black py-2 px-4 my-4" onClick={handleCheckout}>Check Out</button>
//                 <button className="text-white bg-black py-2 px-4">Continue Shopping</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



