import React from 'react';
import Image from "next/image";

const Invoice = ({ order }) => {
  if (!order) return null;

  const { userDetails, products, totalAmount, createdAt, orderStatus, paymentIntent } = order;

  return (
    <div className="receipt-container p-4 sm:p-6 lg:p-8">
      <div className="header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-lg">#{order._id || 'N/A'}</p>
        </div>
        <div className="text-left sm:text-right mt-4 sm:mt-0">
          <h2 className="text-xl font-semibold">Order {orderStatus || 'N/A'}</h2>
          <p>Payment Method: {paymentIntent || 'N/A'}</p>
          <p>Order Date: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="address-section flex flex-col lg:flex-row justify-between mt-8">
        <div className="shipping-address w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="font-medium">Name</div>
            <div>{userDetails.name || 'N/A'}</div>
            <div className="font-medium">Address</div>
            <div>{userDetails.address || 'N/A'}</div>
            <div className="font-medium">City</div>
            <div>{userDetails.city || 'N/A'}</div>
            <div className="font-medium">Country</div>
            <div>{userDetails.country || 'N/A'}</div>
            <div className="font-medium">Postal Code</div>
            <div>{userDetails.postalCode || 'N/A'}</div>
            <div className="font-medium">Phone Number</div>
            <div>{userDetails.phone || 'N/A'}</div>
            <div className="font-medium">Email</div>
            <div>{userDetails.email || 'N/A'}</div>
          </div>
        </div>
      </div>

      <div className="order-items mt-8">
        <h2 className="text-2xl font-semibold mb-4">Items</h2>
        {products && products.map((item) => (
          <div key={item.product._id} className="order-item mb-4 flex flex-col sm:flex-row items-start">
            <Image
              src={item.product.images[0].url}
              alt={item.product.title}
              width={100}
              height={100}
              className="object-cover mr-0 sm:mr-4 mb-4 sm:mb-0"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.product.title || 'N/A'}</h3>
              <p>Price: ${item.product.price || 'N/A'}</p>
              <p>Qty: {item.quantity || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary mt-8">
        <table className="w-full">
          <tbody>
            <tr className="font-bold">
              <td>Total (USD)</td>
              <td className="text-right">${totalAmount ? totalAmount.toFixed(2) : '0.00'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;











// import React from 'react';
// import Image from "next/image";

// const Invoice = ({ order }) => {
//   if (!order) return null;

//   const { userDetails, products, totalAmount, createdAt, orderStatus, paymentIntent, billingAddress, shippingAddress } = order;

//   return (
//     <div className="receipt-container">
//       <div className="header flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold">Order Details</h1>
//           <p className="text-lg">#{order._id || 'N/A'}</p>
//         </div>
//         <div className="text-right">
//           <h2 className="text-xl font-semibold">Order {orderStatus || 'N/A'}</h2>
//           <p>Payment Method: {paymentIntent || 'N/A'}</p>
//           <p>Order Date: {new Date(createdAt).toLocaleDateString()}</p>
//         </div>
//       </div>

//       <div className="address-section flex justify-between mt-8">
//         <div className="billing-address w-full sm:w-1/2 pr-4">
//           <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="font-medium">Name</div>
//             <div>{billingAddress?.name || userDetails.name || 'N/A'}</div>
//             <div className="font-medium">Address</div>
//             <div>{billingAddress?.address || userDetails.address || 'N/A'}</div>
//             <div className="font-medium">City</div>
//             <div>{billingAddress?.city || userDetails.city || 'N/A'}</div>
//             <div className="font-medium">Country</div>
//             <div>{billingAddress?.country || userDetails.country || 'N/A'}</div>
//             <div className="font-medium">Postal Code</div>
//             <div>{billingAddress?.postalCode || userDetails.postalCode || 'N/A'}</div>
//             <div className="font-medium">Phone Number</div>
//             <div>{billingAddress?.phone || userDetails.phone || 'N/A'}</div>
//             <div className="font-medium">Email</div>
//             <div>{billingAddress?.email || userDetails.email || 'N/A'}</div>
//           </div>
//         </div>

//         <div className="shipping-address w-full sm:w-1/2 pl-4">
//           <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="font-medium">Name</div>
//             <div>{shippingAddress?.name || userDetails.name || 'N/A'}</div>
//             <div className="font-medium">Address</div>
//             <div>{shippingAddress?.address || userDetails.address || 'N/A'}</div>
//             <div className="font-medium">City</div>
//             <div>{shippingAddress?.city || userDetails.city || 'N/A'}</div>
//             <div className="font-medium">Country</div>
//             <div>{shippingAddress?.country || userDetails.country || 'N/A'}</div>
//             <div className="font-medium">Postal Code</div>
//             <div>{shippingAddress?.postalCode || userDetails.postalCode || 'N/A'}</div>
//             <div className="font-medium">Phone Number</div>
//             <div>{shippingAddress?.phone || userDetails.phone || 'N/A'}</div>
//           </div>
//         </div>
//       </div>

//       <div className="order-items mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Items</h2>
//         {products && products.map((item) => (
//           <div key={item.product._id} className="order-item mb-4 flex items-center">
//             <Image
//               src={item.product.images[0].url}
//               alt={item.product.title}
//               width={100}
//               height={100}
//               className="object-cover mr-4"
//             />
//             <div>
//               <h3 className="text-lg font-semibold">{item.product.title || 'N/A'}</h3>
//               <p>Price: ${item.product.price || 'N/A'}</p>
//               <p>Quantity: {item.quantity || 'N/A'}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="order-summary mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
//         <table className="w-full">
//           <tbody>
//             <tr>
//               <td>Subtotal</td>
//               <td className="text-right">${order.subtotal ? order.subtotal.toFixed(2) : 'N/A'}</td>
//             </tr>
//             <tr>
//               <td>Shipping</td>
//               <td className="text-right">${order.shippingCost ? order.shippingCost.toFixed(2) : 'N/A'}</td>
//             </tr>
//             <tr>
//               <td>Tax</td>
//               <td className="text-right">${order.tax ? order.tax.toFixed(2) : 'N/A'}</td>
//             </tr>
//             <tr className="font-bold">
//               <td>Total (USD)</td>
//               <td className="text-right">${totalAmount ? totalAmount.toFixed(2) : '0.00'}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="payment-details mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
//         <p>Payment Method: {paymentIntent || 'N/A'}</p>
//         <p>Payment Status: {order.paymentStatus || 'N/A'}</p>
//         {order.paymentDetails && (
//           <div>
//             <p>Transaction ID: {order.paymentDetails.transactionId || 'N/A'}</p>
//             <p>Payment Date: {order.paymentDetails.paymentDate ? new Date(order.paymentDetails.paymentDate).toLocaleString() : 'N/A'}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Invoice;