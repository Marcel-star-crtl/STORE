// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { getToken } from "../../../utils/jwt";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import useCart from '../../../lib/hooks/useCart';

// const Checkout = () => {
//   const router = useRouter();
//   const [orderId, setOrderId] = useState(null);
//   const [approvalUrl, setApprovalUrl] = useState(null);
//   const [user, setUser] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("PayPal");
//   const [paypalReady, setPaypalReady] = useState(false);
//   const [canSubmit, setCanSubmit] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { cartItems, removeItem } = useCart();

//   const countryCodes = [
//     { code: '+237', country: 'Cameroon' },
//     { code: '+234', country: 'Nigeria' },
//     { code: '+1', country: 'United States' }
//   ];

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = getToken();
//         if (token) {
//           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (res.ok) {
//             const userData = await res.json();
//             setUser(userData);
//           } else {
//             setUser(null);
//           }
//         }
//       } catch (error) {
//         console.error("[fetchUserData]", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const loadPaypalScript = async () => {
//       const script = document.createElement("script");
//       script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
//       script.type = "text/javascript";
//       script.async = true;
//       script.onload = () => {
//         setPaypalReady(true);
//         setCanSubmit(true);
//       };
//       script.onerror = () => {
//         console.error("Failed to load PayPal SDK");
//         setCanSubmit(true);
//       };
//       document.body.appendChild(script);
//     };
  
//     loadPaypalScript();
//   }, []);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     lastName: Yup.string().required("Last name is required"),
//     address: Yup.string().required("Address is required"),
//     suite: Yup.string().required("Apartment, Suite, etc. is required"),
//     city: Yup.string().required("City is required"),
//     country: Yup.string().required("Country is required"),
//     phoneCountryCode: Yup.string().required("Country code is required"),
//     phoneNumber: Yup.string().matches(/^\d+$/, "Phone number must contain only digits").required("Phone number is required"),
//     paymentMethod: Yup.string().required("Payment method is required"),
//   });
//   const totalRounded = parseFloat(router.query.totalRounded);

//   const handleCheckout = async (values, actions) => {
//     setIsLoading(true);
//     try {
//       const token = await getToken(); 
//       if (!token) {
//         router.push("/(auth)/sign-in");
//         return;
//       }
  
//       const requestPayload = {
//         cartItems: cartItems,
//         userDetails: {
//           ...values,
//           phone: `${values.phoneCountryCode}${values.phoneNumber}`,
//         },
//         paymentMethod: values.paymentMethod,
//         totalPrice: totalRounded.toFixed(2),
//       };
  
//       console.log('Request payload:', JSON.stringify(requestPayload, null, 2));
  
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create-order`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestPayload),
//       });
  
//       if (res.ok) {
//         const data = await res.json();
//         console.log('Server response:', data);
  
//         if (values.paymentMethod === "PayPal") {
//           setOrderId(data.paypalOrderId);
//           setApprovalUrl(data.approvalUrl);
//         } else if (values.paymentMethod === "Mobile Money") {
//           if (data.paymentAuthUrl) {
//             window.location.href = data.paymentAuthUrl;
//           } else {
//             // Handle the case when paymentAuthUrl is not provided
//             alert("Mobile Money payment initiated. Please check your phone for payment confirmation.");
//             router.push("/(root)/orders");
//           }
//         }else if (values.paymentMethod === "Cash on Delivery") {
//           alert("Your order has been placed successfully. Please pay upon delivery.");
//           router.push("/(root)/orders");
//         }
//       } else {
//         console.error("[handleCheckout] Error:", res.status);
//         const errorData = await res.json();
//         console.error("Error details:", errorData);
//         alert("There was an error creating your order. Please try again.");
//       }
//     } catch (err) {
//       console.error("[handleCheckout] Error:", err);
//       alert("There was an unexpected error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (paypalReady && orderId) {
//       const renderPayPalButton = () => {
//         window.paypal.Buttons({
//           createOrder: function(data, actions) {
//             return Promise.resolve(orderId);
//           },
//           onApprove: async (data, actions) => {
//             try {
//               const details = await actions.order.capture();
//               const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/capture-order`, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Authorization": `Bearer ${getToken()}`,
//                 },
//                 body: JSON.stringify({
//                   orderId: orderId,
//                   paypalOrderId: data.orderID,
//                 }),
//               });
//               if (res.ok) {
//                 const captureData = await res.json();
//                 console.log('Payment captured:', captureData);
//                 alert("Transaction completed by " + details.payer.name.given_name);
//                 router.push("/(root)/orders");
//               } else {
//                 console.error("[onApprove] Error:", res.status);
//                 alert("There was an error processing your payment. Please try again.");
//               }
//             } catch (error) {
//               console.error("[onApprove] Error:", error);
//               alert("There was an error processing your payment. Please try again.");
//             }
//           },
//         }).render("#paypal-button-container");
//       };
  
//       const container = document.getElementById("paypal-button-container");
//       if (container) {
//         renderPayPalButton();
//       } else {
//         console.error("PayPal button container not found");
//       }
//     }
//   }, [paypalReady, orderId]);
  

//   return (
//     <div>
//       <div className="gpt3__header">
//         <div className="flex justify-center flex-col md:flex-row">
//           <div className="flex flex-col md:flex-row w-full section__padding-contact">
//             <div className="flex flex-col md:w-1/2 max-w-[600px] mx-auto">
//               <Formik
//                 initialValues={{
//                   email: "",
//                   lastName: "",
//                   address: "",
//                   suite: "",
//                   city: "",
//                   country: "",
//                   phoneCountryCode: "+237",
//                   phoneNumber: "",
//                   paymentMethod: "PayPal",
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={handleCheckout}
//               >
//                 {({ isSubmitting, values, setFieldValue }) => (
//                   <Form className="flex flex-col space-y-4">
//                     <label className="inline-flex items-center mr-4" style={{fontSize: "22px", fontWeight: "900px", paddingTop: " 2rem"}}>Shipping Details</label>

//                     <div>
//                       <Field
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         className="border p-2 w-full"
//                       />
//                       <ErrorMessage name="email" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                       <Field
//                         type="text"
//                         name="lastName"
//                         placeholder="Last Name"
//                         className="border p-2 w-full"
//                       />
//                       <ErrorMessage name="lastName" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                       <Field
//                         type="text"
//                         name="address"
//                         placeholder="Address"
//                         className="border p-2 w-full"
//                       />
//                       <ErrorMessage name="address" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                       <Field
//                         type="text"
//                         name="suite"
//                         placeholder="Apartment, suite, etc."
//                         className="border p-2 w-full"
//                       />
//                       <ErrorMessage name="suite" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                       <Field
//                         type="text"
//                         name="city"
//                         placeholder="City"
//                         className="border p-2 w-full"
//                       />
//                       <ErrorMessage name="city" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                       <Field
//                         type="text"
//                         name="country"
//                         placeholder="Country"
//                         className="border p-2 w-full"
//                       />
//                       <ErrorMessage name="country" component="div" className="text-red-500" />
//                     </div>

//                     <div className="flex">
//                       <Field
//                         as="select"
//                         name="phoneCountryCode"
//                         className="border p-2 w-1/4 mr-2"
//                       >
//                         {countryCodes.map(country => (
//                           <option key={country.code} value={country.code}>
//                             {country.country} ({country.code})
//                           </option>
//                         ))}
//                       </Field>
//                       <Field
//                         type="text"
//                         name="phoneNumber"
//                         placeholder="Phone Number"
//                         className="border p-2 w-3/4"
//                       />
//                     </div>
                    
//                     <ErrorMessage name="phoneCountryCode" component="div" className="text-red-500" />
//                     <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
                    
//                     {/* Payment Method Radio Buttons */}
//                     <div>
//                       <label className="block mb-2">Payment Method</label>
//                       <div>
//                         <label className="inline-flex items-center mr-4">
//                           <Field
//                             type="radio"
//                             name="paymentMethod"
//                             value="PayPal"
//                             onChange={() => {
//                               setFieldValue("paymentMethod", "PayPal");
//                               setPaymentMethod("PayPal");
//                             }}
//                           />
//                           <span className="ml-2">PayPal</span>
//                         </label>
//                         <label className="inline-flex items-center">
//                           <Field
//                             type="radio"
//                             name="paymentMethod"
//                             value="Cash on Delivery"
//                             onChange={() => {
//                               setFieldValue("paymentMethod", "Cash on Delivery");
//                               setPaymentMethod("Cash on Delivery");
//                             }}
//                           />
//                           <span className="ml-2">Cash on Delivery</span>
//                         </label>
//                       </div>
//                       <ErrorMessage name="paymentMethod" component="div" className="text-red-500" />
//                     </div>
                    
//                     <button
//                       type="submit"
//                       className="hover__btn-sec text-white py-2 px-4 hover"
//                       style={{ background: "#000", width: "300px" }}
//                       disabled={isSubmitting || !canSubmit || isLoading}
//                     >
//                       {isLoading ? "Processing..." : "Make Payment"}
//                     </button>
//                   </Form>
//                 )}
//               </Formik>

//               <div id="paypal-button-container" style={{display: paymentMethod === "PayPal" && orderId ? 'block' : 'none', border: '2px solid red', padding: '20px', marginTop: '20px'}}></div>
//             </div>

//             <div className="md:w-1/2 flex flex-col items-end py-4 md:py-0">
//               <div
//                 className="w-2/3 border border-black p-4"
//                 style={{
//                   height: "400px",
//                   overflowY: "scroll",
//                   msOverflowStyle: "none",
//                   scrollbarWidth: "none",
//                 }}
//               >
//                 <style jsx>{`
//                   .w-2/3::-webkit-scrollbar {
//                     display: none;
//                   }
//                 `}</style>
//                 {cartItems.length === 0 ? (
//                   <p className="text-body-bold">No item in cart</p>
//                 ) : (
//                   <div>
//                     {cartItems.map((cartItem) => (
//                       <div
//                         key={cartItem.item._id}
//                         className="flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 max-sm:items-start justify-between"
//                       >
//                         <div className="flex">
//                           <Image
//                             src={
//                               cartItem.item.images &&
//                               cartItem.item.images.length > 0
//                                 ? cartItem.item.images[0].url
//                                 : ""
//                             }
//                             width={200}
//                             height={150}
//                             className="object-fill"
//                             alt="product"
//                             style={{ width: "150px", height: "150px" }}
//                           />
//                           <div className="flex flex-col gap-3 ml-4">
//                             <p className="text-body-bold">
//                               {cartItem.item.title}
//                             </p>
//                             {cartItem.size && (
//                               <p className="text-small-medium">
//                                 {cartItem.size}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex gap-4 items-center">
//                           <div className="flex flex-col justify-between items-end h-full">
//                             <button
//                               className="hover cursor-pointer bg-transparent border-none mb-auto"
//                               onClick={() => removeItem(cartItem.item._id)}
//                             >
//                               Delete
//                             </button>
//                             <p className="text-small-medium">
//                               $ {cartItem.item.price}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <button className="w-2/3 border border-black bg-black text-white py-2 mt-4">Edit Order</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           marginLeft: "4rem",
//           marginRight: "4rem",
//         }}
//       >
//         <div className="horizontal-divider"></div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;












import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getToken } from "../../../utils/jwt";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCart from '../../../lib/hooks/useCart';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paypalReady, setPaypalReady] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, removeItem } = useCart();

  const totalRounded = parseFloat(Array.isArray(router.query.totalRounded) ? router.query.totalRounded[0] : router.query.totalRounded);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (token) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: "GET",
            headers: {
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

    fetchUserData();
  }, []);

  useEffect(() => {
    const loadPaypalScript = async () => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        setPaypalReady(true);
        setCanSubmit(true);
      };
      script.onerror = () => {
        console.error("Failed to load PayPal SDK");
        setCanSubmit(true);
      };
      document.body.appendChild(script);
    };
  
    loadPaypalScript();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    postalCode: Yup.string().required("Postal code is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  const handleCheckout = async (values, actions) => {
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        router.push("/(auth)/sign-in");
        return;
      }
  
      const requestPayload = {
        cartItems: cartItems,
        userDetails: {
          name: values.name,
          address: values.address,
          postalCode: values.postalCode,
          city: values.city,
          country: values.country,
          phone: values.phone,
          email: values.email,
        },
        paymentMethod: values.paymentMethod,
        totalPrice: totalRounded.toFixed(2),
      };
  
      console.log('Request payload:', JSON.stringify(requestPayload, null, 2));
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log('Server response:', data);
  
        if (values.paymentMethod === "PayPal") {
          setOrderId(data.paypalOrderId);
          setApprovalUrl(data.approvalUrl);
        } else if (values.paymentMethod === "Mobile Money") {
          if (data.paymentAuthUrl) {
            window.location.href = data.paymentAuthUrl;
          } else {
            toast.info("Mobile Money payment initiated. Please check your phone for payment confirmation.");
            router.push("/(root)/orders");
          }
        } else if (values.paymentMethod === "Cash on Delivery") {
          toast.success("Your order has been placed successfully.");
          router.push("/(root)/orders");
        }
      } else {
        console.error("[handleCheckout] Error:", res.status);
        const errorData = await res.json();
        console.error("Error details:", errorData);
        toast.error("There was an error creating your order. Please try again.");
      }
    } catch (err) {
      console.error("[handleCheckout] Error:", err);
      toast.error("There was an unexpected error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (paypalReady && orderId) {
      const renderPayPalButton = () => {
        window.paypal.Buttons({
          createOrder: function(data, actions) {
            return Promise.resolve(orderId);
          },
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order.capture();
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/capture-order`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                  orderId: orderId,
                  paypalOrderId: data.orderID,
                }),
              });
              if (res.ok) {
                const captureData = await res.json();
                console.log('Payment captured:', captureData);
                toast.success(`Transaction completed by ${details.payer.name.given_name}`);
                router.push("/(root)/orders");
              } else {
                console.error("[onApprove] Error:", res.status);
                toast.error("There was an error processing your payment. Please try again.");
              }
            } catch (error) {
              console.error("[onApprove] Error:", error);
              toast.error("There was an error processing your payment. Please try again.");
            }
          },
        }).render("#paypal-button-container");
      };
  
      const container = document.getElementById("paypal-button-container");
      if (container) {
        renderPayPalButton();
      } else {
        console.error("PayPal button container not found");
      }
    }
  }, [paypalReady, orderId]);

  return (
    <div>
      <div className="gpt3__header">
        <div className="flex justify-center flex-col md:flex-row">
          <div className="flex flex-col md:flex-row w-full section__padding">
            <div className="flex flex-col md:w-1/2 max-w-[600px] mx-auto">
              <Formik
                initialValues={{
                  name: "",
                  address: "",
                  postalCode: "",
                  city: "",
                  country: "",
                  phone: "",
                  email: "",
                  paymentMethod: "PayPal",
                }}
                validationSchema={validationSchema}
                onSubmit={handleCheckout}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
                    <Field type="text" name="name" placeholder="Name" className="w-full p-2 border" style={{fontFamily: "Poppins-Regular"}}/>
                    <ErrorMessage name="name" component="div" className="text-red-500" style={{fontFamily: "Poppins-Regular"}}/>

                    <Field type="text" name="address" placeholder="Address" className="w-full p-2 border" style={{fontFamily: "Poppins-Regular"}}/>
                    <ErrorMessage name="address" component="div" className="text-red-500" style={{fontFamily: "Poppins-Regular"}}/>

                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <Field type="text" name="postalCode" placeholder="Postal Code" className="w-full p-2 border" style={{fontFamily: "Poppins-Regular"}}/>
                        <ErrorMessage name="postalCode" component="div" className="text-red-500" style={{fontFamily: "Poppins-Regular"}}/>
                      </div>
                      <div className="w-1/2">
                        <Field type="text" name="city" placeholder="City" className="w-full p-2 border" style={{fontFamily: "Poppins-Regular"}}/>
                        <ErrorMessage name="city" component="div" className="text-red-500" style={{fontFamily: "Poppins-Regular"}}/>
                      </div>
                    </div>

                    <div className="flex space-x-4" style={{marginBottom: "80px"}}>
                      <div className="w-1/2">
                        <Field type="text" name="country" placeholder="Country" className="w-full p-2 border" style={{fontFamily: "Poppins-Regular"}}/>
                        <ErrorMessage name="country" component="div" className="text-red-500" style={{fontFamily: "Poppins-Regular"}}/>
                      </div>
                      <div className="w-1/2">
                        <Field type="text" name="phone" placeholder="Phone" className="w-full p-2 border" style={{fontFamily: "Poppins-Regular"}}/>
                        <ErrorMessage name="phone" component="div" className="text-red-500" style={{fontFamily: "Poppins-Regular"}}/>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
                    <Field type="email" name="email" placeholder="Email" className="w-full p-2 border" style={{fontFamily: "Poppins-Regular"}}/>
                    <ErrorMessage name="email" component="div" className="text-red-500" style={{fontFamily: "Poppins-Regular"}}/>

                    <h2 className="text-2xl font-bold mt-8 mb-4" style={{marginTop: "80px"}}>Payment Method</h2>
                    <div className="space-y-2" style={{ marginBottom: "2rem"}}>
                      <label className="flex items-center">
                        <Field type="radio" name="paymentMethod" value="PayPal" className="mr-2" />
                        PayPal
                      </label>
                      <label className="flex items-center">
                        <Field type="radio" name="paymentMethod" value="Cash on Delivery" className="mr-2" />
                        Cash on Delivery
                      </label>
                      {/* <label className="flex items-center">
                        <Field type="radio" name="paymentMethod" value="Mobile Money" className="mr-2" />
                        Mobile Money
                      </label> */}
                    </div>
                    <ErrorMessage name="paymentMethod" component="div" className="text-red-500" />

                    <button
                      type="submit"
                      className="w-full bg-black text-white py-2 px-4 mt-4"
                      disabled={isSubmitting || !canSubmit || isLoading}
                      style={{fontFamily: "Poppins-Regular"}}
                    >
                      {isLoading ? "Processing..." : "Make Payment"}
                    </button>
                  </Form>
                )}
              </Formik>

              <div id="paypal-button-container" style={{display: paymentMethod === "PayPal" && orderId ? 'block' : 'none', marginTop: '20px'}}></div>
            </div>

            <div className="md:w-1/2 flex flex-col items-end py-4 md:py-0">
              <div
                className="md:w-2/3 border border-black p-4"
                style={{
                  height: "400px",
                  overflowY: "scroll",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                <style jsx>{`
                  .w-2/3::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {cartItems.length === 0 ? (
                  <p className="text-body-bold">No item in cart</p>
                ) : (
                  <div>
                    {cartItems.map((cartItem) => (
                      <div
                        key={cartItem.item._id}
                        className="flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 max-sm:items-start justify-between"
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
                            style={{ width: "150px", height: "150px" }}
                          />
                          <div className="flex flex-col gap-3 ml-4">
                            <p className="text-body-bold">
                              {cartItem.item.title}
                            </p>
                            {cartItem.size && (
                              <p className="text-small-medium">
                                {cartItem.size}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4 items-center">
                          <div className="flex flex-col justify-between items-end h-full">
                            <button
                              className="hover cursor-pointer bg-transparent border-none mb-auto"
                              onClick={() => removeItem(cartItem.item._id)}
                            >
                              Delete
                            </button>
                            <p className="text-small-medium">
                              $ {cartItem.item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="w-2/3 border border-black bg-black text-white py-2 mt-14" style={{fontFamily: "Poppins-Regular"}}>Edit Order</button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "4rem",
          marginRight: "4rem",
        }}
      >
        <div className="horizontal-divider"></div>
      </div>
    </div>
  );
};

export default Checkout;










// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { getToken } from "../../../utils/jwt";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import dynamic from 'next/dynamic';

// const DynamicCart = dynamic(() => import('../../../lib/hooks/useCart'), { ssr: false });

// const Checkout = () => {
//   const router = useRouter();
//   const [orderId, setOrderId] = useState(null);
//   const [approvalUrl, setApprovalUrl] = useState(null);
//   const [user, setUser] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("PayPal");
//   const [paypalReady, setPaypalReady] = useState(false);
//   const [canSubmit, setCanSubmit] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = getToken();
//         if (token) {
//           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (res.ok) {
//             const userData = await res.json();
//             setUser(userData);
//           } else {
//             setUser(null);
//           }
//         }
//       } catch (error) {
//         console.error("[fetchUserData]", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const loadPaypalScript = async () => {
//       const script = document.createElement("script");
//       script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
//       script.type = "text/javascript";
//       script.async = true;
//       script.onload = () => {
//         setPaypalReady(true);
//         setCanSubmit(true);
//       };
//       script.onerror = () => {
//         console.error("Failed to load PayPal SDK");
//         setCanSubmit(true);
//       };
//       document.body.appendChild(script);
//     };
  
//     loadPaypalScript();
//   }, []);

//   useEffect(() => {
//     const cart = DynamicCart();
//     setCartItems(cart.cartItems);
//   }, []);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     lastName: Yup.string().required("Last name is required"),
//     address: Yup.string().required("Address is required"),
//     suite: Yup.string().required("Apartment, Suite, etc. is required"),
//     city: Yup.string().required("City is required"),
//     country: Yup.string().required("Country is required"),
//     phoneCountryCode: Yup.string().required("Country code is required"),
//     phoneNumber: Yup.string().matches(/^\d+$/, "Phone number must contain only digits").required("Phone number is required"),
//     paymentMethod: Yup.string().required("Payment method is required"),
//   });
//   const totalRounded = parseFloat(router.query.totalRounded);

//   const handlePayPalCheckout = async (values, actions) => {
//     try {
//       const token = getToken();
//       if (!token) {
//         router.push("/(auth)/sign-in");
//         return;
//       }
  
//       const requestPayload = {
//         cartItems: cartItems,
//         userDetails: {
//           ...values,
//           phone: `${values.phoneCountryCode}${values.phoneNumber}`,
//         },
//         paymentMethod: values.paymentMethod,
//         totalPrice: totalRounded.toFixed(2),
//       };
      
//       console.log('Request payload:', JSON.stringify(requestPayload, null, 2));
  
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create-order`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestPayload),
//       });
  
//       if (res.ok) {
//         const data = await res.json();
//         console.log('Server response:', data);
//         setOrderId(data.paypalOrderId);
//         setApprovalUrl(data.approvalUrl);
        
//         if (values.paymentMethod !== "PayPal") {
//           router.push("/(root)/orders");
//         }
//       } else {
//         console.error("[handleCheckout] Error:", res.status);
//         const errorData = await res.json();
//         console.error("Error details:", errorData);
//         alert("There was an error creating your order. Please try again.");
//       }
//     } catch (err) {
//       console.error("[handleCheckout] Error:", err);
//       alert("There was an unexpected error. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (paypalReady && orderId) {
//       const renderPayPalButton = () => {
//         window.paypal.Buttons({
//           createOrder: function(data, actions) {
//             return Promise.resolve(orderId);
//           },
//           onApprove: async (data, actions) => {
//             try {
//               const details = await actions.order.capture();
//               const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/capture-order`, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Authorization": `Bearer ${getToken()}`,
//                 },
//                 body: JSON.stringify({
//                   orderId: orderId,
//                   paypalOrderId: data.orderID,
//                 }),
//               });
//               if (res.ok) {
//                 const captureData = await res.json();
//                 console.log('Payment captured:', captureData);
//                 alert("Transaction completed by " + details.payer.name.given_name);
//                 router.push("/(root)/orders");
//               } else {
//                 console.error("[onApprove] Error:", res.status);
//                 alert("There was an error processing your payment. Please try again.");
//               }
//             } catch (error) {
//               console.error("[onApprove] Error:", error);
//               alert("There was an error processing your payment. Please try again.");
//             }
//           },
//         }).render("#paypal-button-container");
//       };
  
//       const container = document.getElementById("paypal-button-container");
//       if (container) {
//         renderPayPalButton();
//       } else {
//         console.error("PayPal button container not found");
//       }
//     }
//   }, [paypalReady, orderId]);

//   return (
//     <div>
//       <div className="gpt3__header">
//         <div className="flex justify-center flex-col md:flex-row">
//           <div className="flex flex-col md:flex-row w-full section__padding-contact">
//             <div className="flex flex-col md:w-1/2">
//               <Formik
//                 initialValues={{
//                   email: "",
//                   lastName: "",
//                   address: "",
//                   suite: "",
//                   city: "",
//                   country: "",
//                   phoneCountryCode: "+1",
//                   phoneNumber: "",
//                   paymentMethod: "PayPal",
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={handlePayPalCheckout}
//               >
//                 {({ isSubmitting, values }) => (
//                   <Form className="flex flex-col space-y-4">
//                     {/* Form fields remain the same */}
//                     {/* ... */}
//                     <button
//                       type="submit"
//                       className="hover__btn-sec text-white py-2 px-4 hover"
//                       style={{ background: "#000", width: "300px" }}
//                       disabled={isSubmitting || !canSubmit}
//                     >
//                       {canSubmit ? "Make Payment" : "Loading PayPal..."}
//                     </button>
//                   </Form>
//                 )}
//               </Formik>

//               <div id="paypal-button-container" style={{display: paymentMethod === "PayPal" && orderId ? 'block' : 'none', border: '2px solid red', padding: '20px', marginTop: '20px'}}></div>
//             </div>

//             <div className="md:w-1/2 flex flex-col items-end py-4 md:py-0">
//               <div
//                 className="w-2/3 border border-black p-4"
//                 style={{
//                   height: "400px",
//                   overflowY: "scroll",
//                   msOverflowStyle: "none",
//                   scrollbarWidth: "none",
//                 }}
//               >
//                 <style jsx>{`
//                   .w-2/3::-webkit-scrollbar {
//                     display: none;
//                   }
//                 `}</style>
//                 {cartItems.length === 0 ? (
//                   <p className="text-body-bold">No item in cart</p>
//                 ) : (
//                   <div>
//                     {cartItems.map((cartItem) => (
//                       <div
//                         key={cartItem.item._id}
//                         className="flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 max-sm:items-start justify-between"
//                       >
//                         <div className="flex">
//                           <Image
//                             src={
//                               cartItem.item.images &&
//                               cartItem.item.images.length > 0
//                                 ? cartItem.item.images[0].url
//                                 : ""
//                             }
//                             width={200}
//                             height={150}
//                             className="object-fill"
//                             alt="product"
//                             style={{ width: "150px", height: "150px" }}
//                           />
//                           <div className="flex flex-col gap-3 ml-4">
//                             <p className="text-body-bold">
//                               {cartItem.item.title}
//                             </p>
//                             {cartItem.size && (
//                               <p className="text-small-medium">
//                                 {cartItem.size}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex gap-4 items-center">
//                           <div className="flex flex-col justify-between items-end h-full">
//                             <button
//                               className="hover cursor-pointer bg-transparent border-none mb-auto"
//                               onClick={() => {
//                                 const cart = DynamicCart();
//                                 cart.removeItem(cartItem.item._id);
//                                 setCartItems(cart.cartItems);
//                               }}
//                             >
//                               Delete
//                             </button>
//                             <p className="text-small-medium">
//                               ${cartItem.item.price}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           marginLeft: "4rem",
//           marginRight: "4rem",
//         }}
//       >
//         <div className="horizontal-divider"></div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;














// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { getToken } from "../../../utils/jwt";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import useCart from '../../../lib/hooks/useCart'; // Assuming DynamicCart is a hook

// const Checkout = () => {
//   const router = useRouter();
//   const [orderId, setOrderId] = useState(null);
//   const [approvalUrl, setApprovalUrl] = useState(null);
//   const [user, setUser] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("PayPal");
//   const [paypalReady, setPaypalReady] = useState(false);
//   const [canSubmit, setCanSubmit] = useState(false);
//   const { cartItems, removeItem } = useCart(); // Use useCart to get cartItems

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = getToken();
//         if (token) {
//           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (res.ok) {
//             const userData = await res.json();
//             setUser(userData);
//           } else {
//             setUser(null);
//           }
//         }
//       } catch (error) {
//         console.error("[fetchUserData]", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const loadPaypalScript = async () => {
//       const script = document.createElement("script");
//       script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
//       script.type = "text/javascript";
//       script.async = true;
//       script.onload = () => {
//         setPaypalReady(true);
//         setCanSubmit(true);
//       };
//       script.onerror = () => {
//         console.error("Failed to load PayPal SDK");
//         setCanSubmit(true);
//       };
//       document.body.appendChild(script);
//     };
  
//     loadPaypalScript();
//   }, []);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     lastName: Yup.string().required("Last name is required"),
//     address: Yup.string().required("Address is required"),
//     suite: Yup.string().required("Apartment, Suite, etc. is required"),
//     city: Yup.string().required("City is required"),
//     country: Yup.string().required("Country is required"),
//     phoneCountryCode: Yup.string().required("Country code is required"),
//     phoneNumber: Yup.string().matches(/^\d+$/, "Phone number must contain only digits").required("Phone number is required"),
//     paymentMethod: Yup.string().required("Payment method is required"),
//   });

//   const totalRounded = parseFloat(router.query.totalRounded);

//   const handleCheckout = async (values, actions) => {
//     try {
//       const token = getToken();
//       if (!token) {
//         router.push("/(auth)/sign-in");
//         return;
//       }
  
//       const requestPayload = {
//         cartItems: cartItems,
//         userDetails: {
//           ...values,
//           phone: `${values.phoneCountryCode}${values.phoneNumber}`,
//         },
//         paymentMethod: values.paymentMethod,
//         totalPrice: totalRounded.toFixed(2),
//       };
      
//       console.log('Request payload:', JSON.stringify(requestPayload, null, 2));
  
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create-order`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestPayload),
//       });
  
//       if (res.ok) {
//         const data = await res.json();
//         console.log('Server response:', data);

//         if (values.paymentMethod === "PayPal") {
//           setOrderId(data.paypalOrderId);
//           setApprovalUrl(data.approvalUrl);
//         } else if (values.paymentMethod === "Mobile Money") {
//           if (data.paymentAuthUrl) {
//             window.location.href = data.paymentAuthUrl;
//           } else {
//             alert("Mobile Money payment initiated. Please check your phone for payment confirmation.");
//             router.push("/(root)/orders");
//           }
//         }
//       } else {
//         console.error("[handleCheckout] Error:", res.status);
//         const errorData = await res.json();
//         console.error("Error details:", errorData);
//         alert("There was an error creating your order. Please try again.");
//       }
//     } catch (err) {
//       console.error("[handleCheckout] Error:", err);
//       alert("There was an unexpected error. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (paypalReady && orderId && paymentMethod === "PayPal") {
//       const renderPayPalButton = () => {
//         window.paypal.Buttons({
//           createOrder: function(data, actions) {
//             return Promise.resolve(orderId);
//           },
//           onApprove: async (data, actions) => {
//             try {
//               const details = await actions.order.capture();
//               const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/capture-order`, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Authorization": `Bearer ${getToken()}`,
//                 },
//                 body: JSON.stringify({
//                   orderId: orderId,
//                   paypalOrderId: data.orderID,
//                 }),
//               });
//               if (res.ok) {
//                 const captureData = await res.json();
//                 console.log('Payment captured:', captureData);
//                 alert("Transaction completed by " + details.payer.name.given_name);
//                 router.push("/(root)/orders");
//               } else {
//                 console.error("[onApprove] Error:", res.status);
//                 alert("There was an error processing your payment. Please try again.");
//               }
//             } catch (error) {
//               console.error("[onApprove] Error:", error);
//               alert("There was an error processing your payment. Please try again.");
//             }
//           },
//         }).render("#paypal-button-container");
//       };
  
//       const container = document.getElementById("paypal-button-container");
//       if (container) {
//         renderPayPalButton();
//       } else {
//         console.error("PayPal button container not found");
//       }
//     }
//   }, [paypalReady, orderId, paymentMethod]);

//   return (
//     <div>
//       <div className="gpt3__header">
//         <div className="flex justify-center flex-col md:flex-row">
//           <div className="flex flex-col md:flex-row w-full section__padding-contact">
//             <div className="flex flex-col md:w-1/2">
//               <Formik
//                 initialValues={{
//                   email: "",
//                   lastName: "",
//                   address: "",
//                   suite: "",
//                   city: "",
//                   country: "",
//                   phoneCountryCode: "+1",
//                   phoneNumber: "",
//                   paymentMethod: "PayPal",
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={handleCheckout}
//               >
//                 {({ isSubmitting, values }) => (
//                   <Form className="flex flex-col space-y-4">
//                     {/* Form fields */}
//                     <div>
//                       <label htmlFor="email">Email</label>
//                       <Field type="email" name="email" />
//                       <ErrorMessage name="email" component="div" />
//                     </div>
//                     <div>
//                       <label htmlFor="lastName">Last Name</label>
//                       <Field type="text" name="lastName" />
//                       <ErrorMessage name="lastName" component="div" />
//                     </div>
//                     <div>
//                       <label htmlFor="address">Address</label>
//                       <Field type="text" name="address" />
//                       <ErrorMessage name="address" component="div" />
//                     </div>
//                     <div>
//                       <label htmlFor="suite">Apartment, Suite, etc.</label>
//                       <Field type="text" name="suite" />
//                       <ErrorMessage name="suite" component="div" />
//                     </div>
//                     <div>
//                       <label htmlFor="city">City</label>
//                       <Field type="text" name="city" />
//                       <ErrorMessage name="city" component="div" />
//                     </div>
//                     <div>
//                       <label htmlFor="country">Country</label>
//                       <Field type="text" name="country" />
//                       <ErrorMessage name="country" component="div" />
//                     </div>
//                     <div>
//                       <label htmlFor="phoneCountryCode">Country Code</label>
//                       <Field type="text" name="phoneCountryCode" />
//                       <ErrorMessage name="phoneCountryCode" component="div" />
//                     </div>
//                     <div>
//                       <label htmlFor="phoneNumber">Phone Number</label>
//                       <Field type="text" name="phoneNumber" />
//                       <ErrorMessage name="phoneNumber" component="div" />
//                     </div>
//                     <div>
//                       <label>Payment Method</label>
//                       <div role="group" aria-labelledby="paymentMethod">
//                         <label>
//                           <Field type="radio" name="paymentMethod" value="PayPal" />
//                           PayPal
//                         </label>
//                         <label>
//                           <Field type="radio" name="paymentMethod" value="Mobile Money" />
//                           Mobile Money
//                         </label>
//                       </div>
//                       <ErrorMessage name="paymentMethod" component="div" />
//                     </div>
//                     <button
//                       type="submit"
//                       className="hover__btn-sec text-white py-2 px-4 hover"
//                       style={{ background: "#000", width: "300px" }}
//                       disabled={isSubmitting || !canSubmit}
//                     >
//                       {isSubmitting ? "Processing..." : "Make Payment"}
//                     </button>
//                   </Form>
//                 )}
//               </Formik>

//               <div
//                 id="paypal-button-container"
//                 style={{
//                   display: paymentMethod === "PayPal" && orderId ? "block" : "none",
//                   border: "2px solid red",
//                   padding: "20px",
//                   marginTop: "20px",
//                 }}
//               ></div>
//             </div>

//             <div className="md:w-1/2 flex flex-col items-end py-4 md:py-0">
//               <div
//                 className="w-2/3 border border-black p-4"
//                 style={{
//                   height: "400px",
//                   overflowY: "scroll",
//                   msOverflowStyle: "none",
//                   scrollbarWidth: "none",
//                 }}
//               >
//                 <style jsx>{`
//                   .w-2/3::-webkit-scrollbar {
//                     display: none;
//                   }
//                 `}</style>
//                 {cartItems.length === 0 ? (
//                   <p className="text-body-bold">No item in cart</p>
//                 ) : (
//                   <div>
//                     {cartItems.map((cartItem) => (
//                       <div
//                         key={cartItem.item._id}
//                         className="flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 max-sm:items-start justify-between"
//                       >
//                         <div className="flex">
//                           <Image
//                             src={
//                               cartItem.item.images && cartItem.item.images.length > 0
//                                 ? cartItem.item.images[0].url
//                                 : ""
//                             }
//                             width={200}
//                             height={150}
//                             className="object-fill"
//                             alt="product"
//                             style={{ width: "150px", height: "150px" }}
//                           />
//                           <div className="flex flex-col gap-3 ml-4">
//                             <p className="text-body-bold">{cartItem.item.title}</p>
//                             {cartItem.size && (
//                               <p className="text-small-medium">{cartItem.size}</p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex gap-4 items-center">
//                           <div className="flex flex-col justify-between items-end h-full">
//                             <button
//                               className="hover cursor-pointer bg-transparent border-none mb-auto"
//                               onClick={() => {
//                                 removeItem(cartItem.item._id);
//                               }}
//                             >
//                               Delete
//                             </button>
//                             <p className="text-small-medium">${cartItem.item.price}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           style={{
//             marginLeft: "4rem",
//             marginRight: "4rem",
//           }}
//         >
//           <div className="horizontal-divider"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
