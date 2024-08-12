// import React from 'react';
// import FullImage from "../../components/FullImage"

// import Employee from '../../../public/contact.png';


// const ContactPage = () => {
//   return (
//     <>
//       <FullImage imageUrl={Employee} alt="contact" />
//       <div className="flex justify-center flex-col items-center md:flex-row md:items-start p-4 md:p-8 lg:p-20">  

//         <div className="flex flex-col md:flex-row w-full max-w-6xl space-y-8 md:space-y-0 md:space-x-8">
//           {/* Contact form */}
//           <div className="flex flex-col w-full md:w-1/2 space-y-8">
//             <form className="flex flex-col space-y-4">
//               <input type="email" placeholder="Email" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
//               <input type="text" placeholder="First name" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
//               <input type="text" placeholder="Last name" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
//               <input type="text" placeholder="City" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
//               <input type="text" placeholder="Country" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
//               <input type="tel" placeholder="Phone" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
//               <textarea placeholder="Message" rows="5" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}></textarea>
//               <button type="submit" className="bg-black text-white py-2 px-4 hover:opacity-80" style={{ width: "250px", marginTop: "2rem", fontFamily: "Poppins-Regular" }}>Send</button>
//             </form>
//           </div>

//           {/* Address */}
//           <div className="flex flex-col items-center md:items-end w-full md:w-1/2 text-center md:text-right">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold leading-tight mb-4">
//               5400 N. Lakewood Ave, Chicago
//             </h1>
//             <p className="mt-6" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> +290xxxxxxxxxxx </p>
//             <p className="mb-2" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> info@anniesboutique.com </p>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactPage;






// import React from 'react';
// import FullImage from "../../components/FullImage"
// import Employee from '../../../public/contact.png';
// import axios from 'axios';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const ContactPage = () => {
//   const initialValues = {
//     email: '',
//     firstName: '',
//     lastName: '',
//     city: '',
//     country: '',
//     mobile: '',
//     comment: ''
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     firstName: Yup.string().required('First name is required'),
//     lastName: Yup.string().required('Last name is required'),
//     city: Yup.string(),
//     country: Yup.string(),
//     mobile: Yup.string().required('Phone number is required'),
//     comment: Yup.string().required('Message is required')
//   });

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/enquiry', values);
//       console.log('Enquiry submitted:', response.data);
//       resetForm();
//       alert('Enquiry submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting enquiry:', error);
//       alert('Failed to submit enquiry. Please try again.');
//     }
//     setSubmitting(false);
//   };

//   return (
//     <>
//       <FullImage imageUrl={Employee} alt="contact" />
//       <div className="flex justify-center flex-col items-center md:flex-row md:items-start p-4 md:p-8 lg:p-20">  
//         <div className="flex flex-col md:flex-row w-full max-w-6xl space-y-8 md:space-y-0 md:space-x-8">
//           {/* Contact form */}
//           <div className="flex flex-col w-full md:w-1/2 space-y-8">
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="flex flex-col space-y-4">
//                   <Field
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="w-full border border-gray-300 px-4 py-2"
//                     style={{ fontFamily: "Poppins-Regular" }}
//                   />
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

//                   <Field
//                     type="text"
//                     name="firstName"
//                     placeholder="First name"
//                     className="w-full border border-gray-300 px-4 py-2"
//                     style={{ fontFamily: "Poppins-Regular" }}
//                   />
//                   <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

//                   <Field
//                     type="text"
//                     name="lastName"
//                     placeholder="Last name"
//                     className="w-full border border-gray-300 px-4 py-2"
//                     style={{ fontFamily: "Poppins-Regular" }}
//                   />
//                   <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

//                   <Field
//                     type="text"
//                     name="city"
//                     placeholder="City"
//                     className="w-full border border-gray-300 px-4 py-2"
//                     style={{ fontFamily: "Poppins-Regular" }}
//                   />
//                   <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />

//                   <Field
//                     type="text"
//                     name="country"
//                     placeholder="Country"
//                     className="w-full border border-gray-300 px-4 py-2"
//                     style={{ fontFamily: "Poppins-Regular" }}
//                   />
//                   <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />

//                   <Field
//                     type="tel"
//                     name="mobile"
//                     placeholder="Phone"
//                     className="w-full border border-gray-300 px-4 py-2"
//                     style={{ fontFamily: "Poppins-Regular" }}
//                   />
//                   <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />

//                   <Field
//                     as="textarea"
//                     name="comment"
//                     placeholder="Message"
//                     rows="5"
//                     className="w-full border border-gray-300 px-4 py-2"
//                     style={{ fontFamily: "Poppins-Regular" }}
//                   />
//                   <ErrorMessage name="comment" component="div" className="text-red-500 text-sm" />

//                   <button
//                     type="submit"
//                     className="bg-black text-white py-2 px-4 hover:opacity-80"
//                     style={{ width: "250px", marginTop: "2rem", fontFamily: "Poppins-Regular" }}
//                     disabled={isSubmitting}
//                   >
//                     Send
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>

//           {/* Address */}
//           <div className="flex flex-col items-center md:items-end w-full md:w-1/2 text-center md:text-right">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold leading-tight mb-4">
//               5400 N. Lakewood Ave, Chicago
//             </h1>
//             <p className="mt-6" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> +290xxxxxxxxxxx </p>
//             <p className="mb-2" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> info@anniesboutique.com </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactPage;











import React from 'react';
import FullImage from "../../components/FullImage"
import Employee from '../../../public/contact.png';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    mobile: '',
    comment: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    city: Yup.string(),
    country: Yup.string(),
    mobile: Yup.string().required('Phone number is required'),
    comment: Yup.string().required('Message is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, values);
      resetForm();
      toast.success('Submitted successfully!');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error('Failed to submit enquiry. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <FullImage imageUrl={Employee} alt="contact" />
      <div className="flex justify-center flex-col items-center md:flex-row md:items-start p-4 md:p-8 lg:p-20">  
        <div className="flex flex-col md:flex-row w-full max-w-6xl space-y-8 md:space-y-0 md:space-x-8">
          {/* Contact form */}
          <div className="flex flex-col w-full md:w-1/2 space-y-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col space-y-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 px-4 py-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className="w-full border border-gray-300 px-4 py-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className="w-full border border-gray-300 px-4 py-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full border border-gray-300 px-4 py-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />

                  <Field
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="w-full border border-gray-300 px-4 py-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                  />
                  <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />

                  <Field
                    type="tel"
                    name="mobile"
                    placeholder="Phone"
                    className="w-full border border-gray-300 px-4 py-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />

                  <Field
                    as="textarea"
                    name="comment"
                    placeholder="Message"
                    rows="5"
                    className="w-full border border-gray-300 px-4 py-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                  />
                  <ErrorMessage name="comment" component="div" className="text-red-500 text-sm" />

                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 hover:opacity-80"
                    style={{ width: "250px", marginTop: "2rem", fontFamily: "Poppins-Regular" }}
                    disabled={isSubmitting}
                  >
                    Send
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center md:items-end w-full md:w-1/2 text-center md:text-right">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold leading-tight mb-4">
              5400 N. Lakewood Ave, Chicago
            </h1>
            <p className="mt-6" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> +290xxxxxxxxxxx </p>
            <p className="mb-2" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> info@anniesboutique.com </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;