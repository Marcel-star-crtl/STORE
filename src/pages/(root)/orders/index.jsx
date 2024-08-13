// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import useCart from "../../../lib/hooks/useCart";
// import { removeToken, getToken } from "../../../utils/jwt"
// import CountdownTimer from "../../../components/CountdownTimer";
// import Invoice from "../../../components/Invoice";

// const Orders = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const cart = useCart();
//   const [confirmationStep, setConfirmationStep] = useState('initial');
//   const [confirmationCode, setConfirmationCode] = useState('');
//   const [activeOrderId, setActiveOrderId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = getToken(); 
//         if (token) {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
  
//           if (!response.ok) {
//             throw new Error("Failed to fetch orders");
//           }
  
//           const data = await response.json();
//           console.log("Fetched orders:", data.orders); 
//           setOrders(data.orders);
//         } else {
//           throw new Error("No token found");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };
  
//     fetchOrders();
//   }, []);

//   const handleLogout = () => {
//     removeToken();
//     localStorage.removeItem("cartItems");
//     cart.clearCart();
//     router.push('/(auth)/sign-in');
//   };

//   const initiateConfirmation = async (orderId) => {
//     try {
//       const token = getToken();
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/initiate-confirmation`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderId }),
//       });
  
//       if (response.ok) {
//         setConfirmationStep('codeEntry');
//         setActiveOrderId(orderId);
//       } else {
//         throw new Error("Failed to initiate confirmation");
//       }
//     } catch (error) {
//       console.error("Error initiating confirmation:", error);
//     }
//   };

//   const submitConfirmation = async () => {
//     try {
//       const token = getToken();
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/confirm-receipt`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderId: activeOrderId, confirmationCode }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to confirm receipt");
//       }
  
//       const data = await response.json();
//       console.log('Confirmation response:', data);
  
//       setConfirmationStep('initial');
//       setConfirmationCode('');
//       setOrders(orders.map(order => 
//         order._id === activeOrderId ? { ...order, orderStatus: "Delivered" } : order
//       ));
//       setActiveOrderId(null);
//     } catch (error) {
//       console.error("Error confirming receipt:", error);
//     }
//   };

//   const handleViewInvoice = (order) => {
//     setSelectedOrder(order);
//   };

//   // const handleViewInvoice = (orderId) => {
//   //   console.log("Navigating to invoice for order:", orderId);
//   //   router.push(`/(root)/invoice/${orderId}`);
//   // };

//   return (
//     <div className="px-10 py-5 max-sm:px-3">
//       <p className="text-heading3-bold my-10">Your Orders</p>
//       {!orders || orders.length === 0 ? (
//         <p className="text-body-bold my-5">You have no orders yet.</p>
//       ) : (
//         <div className="flex flex-col gap-10">
//           {orders.map((order) => (
//             <div className="flex flex-col gap-8 p-4 hover:bg-grey-1" key={order._id}>
//               <div className="flex gap-20 max-md:flex-col max-md:gap-3">
//                 <p className="text-base-bold">Order ID: {order._id}</p>
//                 <p className="text-base-bold">Total Amount: ${order.totalAmount}</p>
//                 <p className="text-base-bold">Status: {order.orderStatus}</p>
//                 {order.orderStatus === "Dispatched" && (
//                   <div>
//                     <p className="text-base-bold">Delivery Countdown:</p>
//                     <CountdownTimer dispatchTime={order.dispatchedAt} />
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-row gap-5">
//                 {order.products.map((orderItem) => (
//                   <div className="flex gap-4" key={orderItem.product._id}>
//                     <Image
//                       src={orderItem.product.images[0].url}
//                       alt={orderItem.product.title}
//                       width={100}
//                       height={100}
//                       className="w-32 h-32 object-cover"
//                     />
//                     <div className="flex flex-col">
//                       <p className="text-small-medium">
//                         Title: <span className="text-small-bold">{orderItem.product.title}</span>
//                       </p>
//                       {orderItem.size && (
//                         <p className="text-small-medium">
//                           Size: <span className="text-small-bold">{orderItem.size}</span>
//                         </p>
//                       )}
//                       <p className="text-small-medium">
//                         Unit price: <span className="text-small-bold">${orderItem.product.price}</span>
//                       </p>
//                       <p className="text-small-medium">
//                         Quantity: <span className="text-small-bold">{orderItem.product.quantity}</span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button 
//                 onClick={() => handleViewInvoice(order._id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
//                 style={{ width: '300px' }}
//               >
//                 View Invoice
//               </button>

//               {(order.orderStatus === "Dispatched" || order.orderStatus === "Delivered") && confirmationStep === 'initial' && (
//                 <div className="flex flex-col gap-2 mt-4">
//                   <button 
//                     onClick={() => initiateConfirmation(order._id)}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
//                     style={{ width: '300px' }}
//                   >
//                     Confirm Delivery
//                   </button>
//                 </div>
//               )}

//               {confirmationStep === 'codeEntry' && activeOrderId === order._id && (
//                 <div className="flex flex-col gap-2 mt-4">
//                   <input 
//                     type="text" 
//                     value={confirmationCode}
//                     onChange={(e) => setConfirmationCode(e.target.value)}
//                     placeholder="Enter confirmation code"
//                     className="border p-2 rounded"
//                     style={{ width: '300px' }}
//                   />

//                   <button 
//                     onClick={submitConfirmation}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
//                     style={{ width: '300px' }}
//                   >
//                     Confirm Delivery
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedOrder && (
//         <div className="mt-10">
//           <h2 className="text-heading4-medium mb-5">Invoice for Order #{selectedOrder._id}</h2>
//           <Invoice order={selectedOrder} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

















// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import useCart from "../../../lib/hooks/useCart";
// import { removeToken, getToken } from "../../../utils/jwt";
// import CountdownTimer from "../../../components/CountdownTimer";
// import Invoice from "../../../components/Invoice";

// const Orders = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const cart = useCart();
//   const [confirmationStep, setConfirmationStep] = useState('initial');
//   const [confirmationCode, setConfirmationCode] = useState('');
//   const [activeOrderId, setActiveOrderId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = getToken(); 
//         if (token) {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
  
//           if (!response.ok) {
//             throw new Error("Failed to fetch orders");
//           }
  
//           const data = await response.json();
//           console.log("Fetched orders:", data.orders); 
//           setOrders(data.orders);
//         } else {
//           throw new Error("No token found");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };
  
//     fetchOrders();
//   }, []);

//   const handleLogout = () => {
//     removeToken();
//     localStorage.removeItem("cartItems");
//     cart.clearCart();
//     router.push('/(auth)/sign-in');
//   };

//   const initiateConfirmation = async (orderId) => {
//     try {
//       const token = getToken();
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/initiate-confirmation`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderId }),
//       });
  
//       if (response.ok) {
//         setConfirmationStep('codeEntry');
//         setActiveOrderId(orderId);
//       } else {
//         throw new Error("Failed to initiate confirmation");
//       }
//     } catch (error) {
//       console.error("Error initiating confirmation:", error);
//     }
//   };

//   const submitConfirmation = async () => {
//     try {
//       const token = getToken();
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/confirm-receipt`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderId: activeOrderId, confirmationCode }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to confirm receipt");
//       }
  
//       const data = await response.json();
//       console.log('Confirmation response:', data);
  
//       setConfirmationStep('initial');
//       setConfirmationCode('');
//       setOrders(orders.map(order => 
//         order._id === activeOrderId ? { ...order, orderStatus: "Delivered" } : order
//       ));
//       setActiveOrderId(null);
//     } catch (error) {
//       console.error("Error confirming receipt:", error);
//     }
//   };

//   const handleViewInvoice = (order) => {
//     setSelectedOrder(order);
//   };

//   return (
//     <div className="px-10 py-5 max-sm:px-3">
//       <p className="text-heading3-bold my-10">Your Orders</p>
//       {!orders || orders.length === 0 ? (
//         <p className="text-body-bold my-5">You have no orders yet.</p>
//       ) : (
//         <div className="flex flex-col gap-10">
//           {orders.map((order) => (
//             <div className="flex flex-col gap-8 p-4 hover:bg-grey-1" key={order._id}>
//               <div className="flex gap-20 max-md:flex-col max-md:gap-3">
//                 <p className="text-base-bold">Order ID: {order._id}</p>
//                 <p className="text-base-bold">Total Amount: ${order.totalAmount}</p>
//                 <p className="text-base-bold">Status: {order.orderStatus}</p>
//                 {order.orderStatus === "Dispatched" && (
//                   <div>
//                     <p className="text-base-bold">Delivery Countdown:</p>
//                     <CountdownTimer dispatchTime={order.dispatchedAt} />
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-row gap-5">
//                 {order.products.map((orderItem) => (
//                   <div className="flex gap-4" key={orderItem.product._id}>
//                     <Image
//                       src={orderItem.product.images[0].url}
//                       alt={orderItem.product.title}
//                       width={100}
//                       height={100}
//                       className="w-32 h-32 object-cover"
//                     />
//                     <div className="flex flex-col">
//                       <p className="text-small-medium">
//                         Title: <span className="text-small-bold">{orderItem.product.title}</span>
//                       </p>
//                       {orderItem.size && (
//                         <p className="text-small-medium">
//                           Size: <span className="text-small-bold">{orderItem.size}</span>
//                         </p>
//                       )}
//                       <p className="text-small-medium">
//                         Unit price: <span className="text-small-bold">${orderItem.product.price}</span>
//                       </p>
//                       <p className="text-small-medium">
//                         Quantity: <span className="text-small-bold">{orderItem.product.quantity}</span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button 
//                 onClick={() => handleViewInvoice(order)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
//                 style={{ width: '300px' }}
//               >
//                 View Invoice
//               </button>

//               {(order.orderStatus === "Dispatched" || order.orderStatus === "Delivered") && confirmationStep === 'initial' && (
//                 <div className="flex flex-col gap-2 mt-4">
//                   <button 
//                     onClick={() => initiateConfirmation(order._id)}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
//                     style={{ width: '300px' }}
//                   >
//                     Confirm Delivery
//                   </button>
//                 </div>
//               )}

//               {confirmationStep === 'codeEntry' && activeOrderId === order._id && (
//                 <div className="flex flex-col gap-2 mt-4">
//                   <input 
//                     type="text" 
//                     value={confirmationCode}
//                     onChange={(e) => setConfirmationCode(e.target.value)}
//                     placeholder="Enter confirmation code"
//                     className="border p-2 rounded"
//                     style={{ width: '300px' }}
//                   />

//                   <button 
//                     onClick={submitConfirmation}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
//                     style={{ width: '300px' }}
//                   >
//                     Confirm Delivery
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedOrder && (
//         <div className="mt-10">
//           <h2 className="text-heading4-medium mb-5">Invoice for Order #{selectedOrder._id}</h2>
//           <Invoice order={selectedOrder} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;








// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import useCart from "../../../lib/hooks/useCart";
// import { removeToken, getToken } from "../../../utils/jwt";
// import CountdownTimer from "../../../components/CountdownTimer";

// const Orders = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const cart = useCart();
//   const [confirmationStep, setConfirmationStep] = useState('initial');
//   const [confirmationCode, setConfirmationCode] = useState('');
//   const [activeOrderId, setActiveOrderId] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = getToken(); 
//         if (token) {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
  
//           if (!response.ok) {
//             throw new Error("Failed to fetch orders");
//           }
  
//           const data = await response.json();
//           console.log("Fetched orders:", data.orders); 
//           setOrders(data.orders);
//         } else {
//           throw new Error("No token found");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };
  
//     fetchOrders();
//   }, []);

//   const handleLogout = () => {
//     removeToken();
//     localStorage.removeItem("cartItems");
//     cart.clearCart();
//     router.push('/(auth)/sign-in');
//   };

//   const initiateConfirmation = async (orderId) => {
//     try {
//       const token = getToken();
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/initiate-confirmation`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderId }),
//       });
  
//       if (response.ok) {
//         setConfirmationStep('codeEntry');
//         setActiveOrderId(orderId);
//       } else {
//         throw new Error("Failed to initiate confirmation");
//       }
//     } catch (error) {
//       console.error("Error initiating confirmation:", error);
//     }
//   };

//   const submitConfirmation = async () => {
//     try {
//       const token = getToken();
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/confirm-receipt`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderId: activeOrderId, confirmationCode }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to confirm receipt");
//       }
  
//       const data = await response.json();
//       console.log('Confirmation response:', data);
  
//       setConfirmationStep('initial');
//       setConfirmationCode('');
//       setOrders(orders.map(order => 
//         order._id === activeOrderId ? { ...order, orderStatus: "Delivered" } : order
//       ));
//       setActiveOrderId(null);
//     } catch (error) {
//       console.error("Error confirming receipt:", error);
//     }
//   };

//   const handleViewInvoice = (order) => {
//     router.push(`/(root)/invoice/${order._id}`);
//   };

//   return (
//     <div className="px-10 py-5 max-sm:px-3">
//       <p className="text-heading3-bold my-10">Your Orders</p>
//       {!orders || orders.length === 0 ? (
//         <p className="text-body-bold my-5">You have no orders yet.</p>
//       ) : (
//         <div className="flex flex-col gap-10">
//           {orders.map((order) => (
//             <div className="flex flex-col gap-8 p-4 hover:bg-grey-1" key={order._id}>
//               <div className="flex gap-20 max-md:flex-col max-md:gap-3">
//                 <p className="text-base-bold">Order ID: {order._id}</p>
//                 <p className="text-base-bold">Total Amount: ${order.totalAmount}</p>
//                 <p className="text-base-bold">Status: {order.orderStatus}</p>
//                 {order.orderStatus === "Dispatched" && (
//                   <div>
//                     <p className="text-base-bold">Delivery Countdown:</p>
//                     <CountdownTimer dispatchTime={order.dispatchedAt} />
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-row gap-5">
//                 {order.products.map((orderItem) => (
//                   <div className="flex gap-4" key={orderItem.product._id}>
//                     <Image
//                       src={orderItem.product.images[0].url}
//                       alt={orderItem.product.title}
//                       width={100}
//                       height={100}
//                       className="w-32 h-32 object-cover"
//                     />
//                     <div className="flex flex-col">
//                       <p className="text-small-medium">
//                         Title: <span className="text-small-bold">{orderItem.product.title}</span>
//                       </p>
//                       {orderItem.size && (
//                         <p className="text-small-medium">
//                           Size: <span className="text-small-bold">{orderItem.size}</span>
//                         </p>
//                       )}
//                       <p className="text-small-medium">
//                         Unit price: <span className="text-small-bold">${orderItem.product.price}</span>
//                       </p>
//                       <p className="text-small-medium">
//                         Quantity: <span className="text-small-bold">{orderItem.product.quantity}</span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button 
//                 onClick={() => handleViewInvoice(order)}
//                 className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
//                 style={{ width: '300px' }}
//               >
//                 View Invoice
//               </button>

//               {(order.orderStatus === "Dispatched" || order.orderStatus === "Delivered") && confirmationStep === 'initial' && (
//                 <div className="flex flex-col gap-2 mt-4">
//                   <button 
//                     onClick={() => initiateConfirmation(order._id)}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
//                     style={{ width: '300px' }}
//                   >
//                     Confirm Delivery
//                   </button>
//                 </div>
//               )}

//               {confirmationStep === 'codeEntry' && activeOrderId === order._id && (
//                 <div className="flex flex-col gap-2 mt-4">
//                   <input 
//                     type="text" 
//                     value={confirmationCode}
//                     onChange={(e) => setConfirmationCode(e.target.value)}
//                     placeholder="Enter confirmation code"
//                     className="border p-2 rounded"
//                     style={{ width: '300px' }}
//                   />

//                   <button 
//                     onClick={submitConfirmation}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
//                     style={{ width: '300px' }}
//                   >
//                     Confirm Delivery
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;




































// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import useCart from "../../../lib/hooks/useCart";
// import { removeToken, getToken } from "../../../utils/jwt";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Orders = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const cart = useCart();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       try {
//         const token = getToken(); 
//         if (token) {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
  
//           if (!response.ok) {
//             throw new Error("Failed to fetch orders");
//           }
  
//           const data = await response.json();
//           setOrders(data.orders || []);
//         } else {
//           throw new Error("No token found");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setOrders([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     fetchOrders();
//   }, []);

//   const handleViewOrderDetails = async (shortId) => {
//     try {
//       const token = getToken();
//       if (!token) {
//         throw new Error("No token found");
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders/${shortId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch order details");
//       }

//       const data = await response.json();
//       // Navigate to the order details page with the full order data
//       router.push({
//         pathname: `/invoice/${shortId}`,
//         query: { orderData: JSON.stringify(data.order) },
//       });
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//       alert("Failed to load order details. Please try again.");
//     }
//   };

//   const handleDownloadInvoice = async (shortId) => {
//     try {
//       const token = getToken();
//       if (!token) {
//         throw new Error("No token found");
//       }
  
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders/${shortId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch order details");
//       }
  
//       const data = await response.json();
//       const orderData = data.order;
  
//       // Create PDF
//       const pdf = new jsPDF();
      
//       // Set font
//       pdf.setFont("playfair-font");
  
//       // Add title
//       pdf.setFontSize(18);
//       pdf.text(`Invoice for Order #${shortId}`, 14, 20);
  
//       // Add order details
//       pdf.setFontSize(12);
//       pdf.text(`Order Date: ${new Date(orderData.createdAt).toLocaleDateString()}`, 14, 30);
//       pdf.text(`Total Amount: $${orderData.totalAmount.toFixed(2)}`, 14, 40);
//       pdf.text(`Order Status: ${orderData.orderStatus}`, 14, 50);
//       pdf.text(`Payment Method: ${orderData.paymentIntent}`, 14, 60);
  
//       // Add customer details
//       pdf.text("Customer Details:", 14, 75);
//       pdf.text(`Name: ${orderData.userDetails.name || 'N/A'}`, 14, 85);
//       pdf.text(`Email: ${orderData.userDetails.email}`, 14, 95);
//       pdf.text(`Address: ${orderData.userDetails.address}, ${orderData.userDetails.city}, ${orderData.userDetails.country}`, 14, 105);
//       pdf.text(`Postal Code: ${orderData.userDetails.postalCode}`, 14, 115);
//       pdf.text(`Phone: ${orderData.userDetails.phone}`, 14, 125);
  
//       // Add product details
//       pdf.text("Order Items:", 14, 140);
//       const tableData = orderData.products.map(item => [
//         item.product.title,
//         `$${item.product.price.toFixed(2)}`,
//         item.quantity,
//         `$${(item.product.price * item.quantity).toFixed(2)}`
//       ]);
  
//       pdf.autoTable({
//         startY: 145,
//         head: [['Product', 'Price', 'Quantity', 'Subtotal']],
//         body: tableData,
//         headStyles: { fillColor: [0, 0, 0] }, 
//       });
  
//       // Save PDF
//       pdf.save(`invoice-${shortId}.pdf`);
  
//     } catch (error) {
//       console.error("Error downloading invoice:", error);
//       alert("Failed to download invoice. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-8 md:py-12 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">Order History</h1>
//       {isLoading ? (
//         <p>Loading orders...</p>
//       ) : orders.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{fontFamily: "Poppins-Regular"}}>
//           {orders.map((order) => (
//             <div key={order._id} className="border border-black p-4">
//               <div className="flex items-start mb-4">
//                 <div className="relative w-28 h-28 mr-16">
//                   <Image
//                     src={order.products[0].product.images[0].url}
//                     alt={order.products[0].product.title}
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                   {order.products.length > 1 && (
//                     <div className="absolute top-8 -right-6 bg-gray-800/80 text-white w-12 h-12 flex items-center justify-center text-xs z-10">
//                       +{order.products.length - 1}
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-grow" style={{width: "100px"}}>
//                   <p className="text-sm text-gray-600 mb-2">Order No #{order.shortId}</p>
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => handleViewOrderDetails(order.shortId)}
//                       className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200 text-xs"
//                     >
//                       View Order Details
//                     </button>
//                     <button
//                       onClick={() => handleDownloadInvoice(order.shortId)}
//                       className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200 text-xs"
//                     >
//                       Download Invoice
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default Orders;










import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useCart from "../../../lib/hooks/useCart";
import { removeToken, getToken } from "../../../utils/jwt";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = getToken(); 
        if (token) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
  
          const data = await response.json();
          setOrders(data.orders || []);
        } else {
          throw new Error("No token found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  const handleViewOrderDetails = async (shortId) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders/${shortId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      // Navigate to the order details page with the full order data
      router.push({
        pathname: `/(root)/invoice/${shortId}`,
        query: { orderData: JSON.stringify(data.order) },
      });
    } catch (error) {
      console.error("Error fetching order details:", error, "Short ID:", shortId);
      alert(`Failed to load order details. Error: ${error.message}`);
    }
  };

  const handleDownloadInvoice = async (shortId) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders/${shortId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
  
      const data = await response.json();
      const orderData = data.order;
  
      // Create PDF
      const pdf = new jsPDF();
      
      // Set font
      pdf.setFont("playfair-font");
  
      // Add title
      pdf.setFontSize(18);
      pdf.text(`Invoice for Order #${shortId}`, 14, 20);
  
      // Add order details
      pdf.setFontSize(12);
      pdf.text(`Order Date: ${new Date(orderData.createdAt).toLocaleDateString()}`, 14, 30);
      pdf.text(`Total Amount: $${orderData.totalAmount.toFixed(2)}`, 14, 40);
      pdf.text(`Order Status: ${orderData.orderStatus}`, 14, 50);
      pdf.text(`Payment Method: ${orderData.paymentIntent}`, 14, 60);
  
      // Add customer details
      pdf.text("Customer Details:", 14, 75);
      pdf.text(`Name: ${orderData.userDetails.name || 'N/A'}`, 14, 85);
      pdf.text(`Email: ${orderData.userDetails.email}`, 14, 95);
      pdf.text(`Address: ${orderData.userDetails.address}, ${orderData.userDetails.city}, ${orderData.userDetails.country}`, 14, 105);
      pdf.text(`Postal Code: ${orderData.userDetails.postalCode}`, 14, 115);
      pdf.text(`Phone: ${orderData.userDetails.phone}`, 14, 125);
  
      // Add product details
      pdf.text("Order Items:", 14, 140);
      const tableData = orderData.products.map(item => [
        item.product.title,
        `$${item.product.price.toFixed(2)}`,
        item.quantity,
        `$${(item.product.price * item.quantity).toFixed(2)}`
      ]);
  
      pdf.autoTable({
        startY: 145,
        head: [['Product', 'Price', 'Quantity', 'Subtotal']],
        body: tableData,
        headStyles: { fillColor: [0, 0, 0] }, 
      });
  
      // Save PDF
      pdf.save(`invoice-${shortId}.pdf`);
  
    } catch (error) {
      console.error("Error downloading invoice:", error, "Short ID:", shortId);
      alert(`Failed to download invoice. Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-8 md:py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{fontFamily: "Poppins-Regular"}}>
          {orders.map((order) => (
            <div key={order.shortId} className="border border-black p-4">
              <div className="flex items-start mb-4">
                <div className="relative w-28 h-28 mr-16">
                  <Image
                    src={order.products[0].product.images[0].url}
                    alt={order.products[0].product.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  {order.products.length > 1 && (
                    <div className="absolute top-8 -right-6 bg-gray-800/80 text-white w-12 h-12 flex items-center justify-center text-xs z-10">
                      +{order.products.length - 1}
                    </div>
                  )}
                </div>
                <div className="flex-grow" style={{width: "100px"}}>
                  <p className="text-sm text-gray-600 mb-2">Order No #{order.shortId}</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleViewOrderDetails(order.shortId)}
                      className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200 text-xs"
                    >
                      View Order Details
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(order.shortId)}
                      className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200 text-xs"
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;