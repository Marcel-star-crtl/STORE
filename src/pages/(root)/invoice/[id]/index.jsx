// import React from 'react';

// const Invoice = () => {
//   return (
//     <div className="receipt-container">
//       <h1>Order Details</h1>
//       <p className="order-number">#235774589-5547</p>

//       <div className="order-status">
//         <p>Order<br />Delivered</p>
//         <p>Payment Status:<br />Paid</p>
//       </div>

//       <div className="address-section">
//         <div className="billing-address">
//           <h2>Billing Address</h2>
//           <p>Rally Interactive</p>
//           <p>244 W 300 N</p>
//           <p>Salt Lake City, Utah 84103</p>
//           <p>United States</p>
//           <p>(801) 641-3596</p>
//         </div>

//         <div className="shipping-address">
//           <h2>Shipping Address</h2>
//           <p>Rally Interactive</p>
//           <p>244 W 300 N</p>
//           <p>Salt Lake City, Utah 84103</p>
//           <p>United States</p>
//           <p>(801) 641-3596</p>
//         </div>
//       </div>

//       <div className="order-items">
//         <h2>Spark Central Gold</h2>
//         <p className="item-condition">Never Worn</p>
//       </div>

//       <div className="order-summary">
//         <div className="summary-row">
//           <span>Subtotal</span>
//           <span>$230.00</span>
//         </div>
//         <div className="summary-row">
//           <span>Shipping Fee</span>
//           <span>$10.00</span>
//         </div>
//         <div className="summary-row">
//           <span>Tax</span>
//           <span>$10.90</span>
//         </div>
//         <div className="summary-row total">
//           <span>Total (USD)</span>
//           <span>$250.90</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;






// import React from 'react';

// const Invoice = ({ order }) => {
//   if (!order) return null;

//   const shippingAddress = `${order.userDetails.address}, ${order.userDetails.suite}, ${order.userDetails.city}, ${order.userDetails.country}`;

//   return (
//     <div className="receipt-container">
//       <h1>Order Details</h1>
//       <p className="order-number">#{order._id}</p>

//       <div className="order-status">
//         <p>Order<br />{order.orderStatus}</p>
//         <p>Payment Status:<br />{order.paymentStatus || 'Paid'}</p>
//       </div>

//       <div className="address-section">
//         <div className="billing-address">
//           <h2>Billing Address</h2>
//           <p>{order.userDetails.lastName}</p>
//           <p>{shippingAddress}</p>
//           <p>{order.userDetails.phone}</p>
//         </div>

//         <div className="shipping-address">
//           <h2>Shipping Address</h2>
//           <p>{order.userDetails.lastName}</p>
//           <p>{shippingAddress}</p>
//           <p>{order.userDetails.phone}</p>
//         </div>
//       </div>

//       <div className="order-items">
//         {order.products.map((item, index) => (
//           <div key={index}>
//             <h2>{item.product.title}</h2>
//             <p className="item-condition">{item.product.condition || 'New'}</p>
//           </div>
//         ))}
//       </div>

//       <div className="order-summary">
//         <div className="summary-row">
//           <span>Subtotal</span>
//           <span>${order.totalAmount.toFixed(2)}</span>
//         </div>
//         {/* Assuming shipping fee and tax are not provided in the current data structure */}
//         <div className="summary-row">
//           <span>Shipping Fee</span>
//           <span>N/A</span>
//         </div>
//         <div className="summary-row">
//           <span>Tax</span>
//           <span>N/A</span>
//         </div>
//         <div className="summary-row total">
//           <span>Total (USD)</span>
//           <span>${order.totalAmount.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;














import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../../../../utils/jwt";
import Invoice from "../../../../components/Invoice";

const InvoicePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const token = getToken(); 
        if (token) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-orders/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch order");
          }
  
          const data = await response.json();
          console.log("Fetched order data:", data.order); 
          setOrder(data.order);
        } else {
          throw new Error("No token found");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrder();
  }, [id]);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      {isLoading ? (
        <p>Loading...</p>
      ) : order ? (
        <Invoice order={order} />
      ) : (
        <p>Failed to load order details. Please try again.</p>
      )}
    </div>
  );
};

export default InvoicePage;