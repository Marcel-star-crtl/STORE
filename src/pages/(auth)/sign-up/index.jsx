
// // import { useState } from 'react';
// // import { useRouter } from 'next/router';
// // import client from "../../api/client";
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import useAuthStore from '../../../stores/authStore';

// const Register = () => {
//   const router = useRouter();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const register = useAuthStore((state) => state.register);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await client.post('/user/register', {
//   //       firstname: firstName,
//   //       lastname: lastName,
//   //       email,
//   //       mobile,
//   //       password,
//   //     });
//   //     if (response.status === 200) {
//   //       router.push('/dashboard'); 
//   //     } else {
//   //       const data = await response.json();
//   //       setError(data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error('Registration error:', error);
//   //     setError('Something went wrong. Please try again later.');
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await register({
//       firstname: firstName,
//       lastname: lastName,
//       email,
//       mobile,
//       password,
//     });
//     if (success) {
//       router.push('/login');
//     } else {
//       setError('Registration failed. Please try again.');
//     }
//   };

//   const handleLoginClick = () => {
//     router.push('/(auth)/sign-in');
//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="flex flex-col">
//         {/* <h1 className="text-2xl font-bold mb-4">Register</h1> */}
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <input
//           type="text"
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className="border border-gray-300 rounded-none px-3 py-2 mb-4"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className="border border-gray-300 rounded-none px-3 py-2 mb-4"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-gray-300 rounded-none px-3 py-2 mb-4"
//           required
//         />
//         <input
//           type="tel"
//           placeholder="Mobile"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//           className="border border-gray-300 rounded-none px-3 py-2 mb-4"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-gray-300 rounded-none px-3 py-2 mb-4"
//           required
//         />
//         <button type="submit" className="bg-black text-white px-4 py-2 rounded-none">
//           Create Account
//         </button>
//         <button
//           type="button"
//           onClick={handleLoginClick}
//           className="bg-black text-white px-4 my-8 rounded-none py-2"
//         >
//           Have an Account? Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;









// import { useRouter } from 'next/router';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import useAuthStore from '../../../stores/authStore';

// const Register = () => {
//   const router = useRouter();
//   const register = useAuthStore((state) => state.register);

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required('First Name is required'),
//     lastName: Yup.string().required('Last Name is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const handleSubmit = async (values, { setSubmitting, setError }) => {
//     const success = await register({
//       firstname: values.firstName,
//       lastname: values.lastName,
//       email: values.email,
//       password: values.password,
//     });
//     if (success) {
//       router.push('/(auth)/sign-in');
//     } else {
//       setError('Registration failed. Please try again.');
//     }
//     setSubmitting(false);
//   };

//   const handleLoginClick = () => {
//     router.push('/(auth)/sign-in');
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center" style={{fontFamily: "Poppins-Regular"}}>
//       {/* <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> */}
//       <div className="bg-white p-8 w-full" style={{width: "700px"}}>
//         <Formik
//           initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="space-y-4">
//               <Field
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 className="border border-gray-300 px-3 py-2 w-full"
//               />
//               <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

//               <Field
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 className="border border-gray-300 px-3 py-2 w-full"
//               />
//               <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

//               <Field
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="border border-gray-300 px-3 py-2 w-full"
//               />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

//               <Field
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className="border border-gray-300 px-3 py-2 w-full"
//               />
//               <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

//               <button
//                 type="submit"
//                 className="bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
//                 disabled={isSubmitting}
//               >
//                 Create Account
//               </button>

//               <div className="text-center text-gray-500 my-4 pt-4">Or</div>

//               <button type="button" className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2">
//                 <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
//                 <span>Continue with Google</span>
//               </button>

//               <button type="button" className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2">
//                 <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
//                 <span>Continue with Facebook</span>
//               </button>
//             </Form>
//           )}
//         </Formik>

//         <button
//           type="button"
//           onClick={handleLoginClick}
//           className="mt-6 bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
//         >
//           Have an Account? Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;










// import { useRouter } from 'next/router';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import useAuthStore from '../../../stores/authStore';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";

// const Register = () => {
//   const router = useRouter();
//   const register = useAuthStore((state) => state.register);
//   const googleRegister = useAuthStore((state) => state.googleRegister);

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required('First Name is required'),
//     lastName: Yup.string().required('Last Name is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const handleSubmit = async (values, { setSubmitting, setError }) => {
//     const success = await register({
//       firstname: values.firstName,
//       lastname: values.lastName,
//       email: values.email,
//       password: values.password,
//     });
//     if (success) {
//       router.push('/(auth)/sign-in');
//     } else {
//       setError('Registration failed. Please try again.');
//     }
//     setSubmitting(false);
//   };

//   const handleGoogleRegister = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const success = await googleRegister(decoded);
//       if (success) {
//         router.push('/(auth)/sign-in');
//       } else {
//         console.error('Google registration failed');
//       }
//     } catch (error) {
//       console.error('Error during Google registration:', error);
//     }
//   };

//   const handleLoginClick = () => {
//     router.push('/(auth)/sign-in');
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//       <div className="min-h-screen flex justify-center items-center" style={{fontFamily: "Poppins-Regular"}}>
//         <div className="bg-white p-8 w-full" style={{width: "700px"}}>
//           <Formik
//             initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <Field
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

//                 <Field
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

//                 <Field
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

//                 <button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Create Account
//                 </button>

//                 <div className="text-center text-gray-500 my-4 pt-4">Or</div>

//                 <GoogleLogin
//                   onSuccess={handleGoogleRegister}
//                   onError={() => {
//                     console.log('Registration Failed');
//                   }}
//                   render={(renderProps) => (
//                     <button
//                       type="button"
//                       onClick={renderProps.onClick}
//                       disabled={renderProps.disabled}
//                       className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2"
//                     >
//                       <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
//                       <span>Continue with Google</span>
//                     </button>
//                   )}
//                 />

//                 <button type="button" className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2">
//                   <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
//                   <span>Continue with Facebook</span>
//                 </button>
//               </Form>
//             )}
//           </Formik>

//           <button
//             type="button"
//             onClick={handleLoginClick}
//             className="mt-6 bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
//           >
//             Have an Account? Login
//           </button>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Register;









import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthStore from '../../../stores/authStore';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Register = () => {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const googleRegister = useAuthStore((state) => state.googleRegister);
  const facebookRegister = useAuthStore((state) => state.facebookRegister);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setError }) => {
    const success = await register({
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      password: values.password,
    });
    if (success) {
      router.push('/(auth)/sign-in');
    } else {
      setError('Registration failed. Please try again.');
    }
    setSubmitting(false);
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      const success = await googleRegister(decoded);
      if (success) {
        router.push('/(auth)/sign-in');
      } else {
        console.error('Google registration failed');
      }
    } catch (error) {
      console.error('Error during Google registration:', error);
    }
  };

  const handleFacebookRegister = async (response) => {
    try {
      const success = await facebookRegister(response);
      if (success) {
        router.push('/(auth)/sign-in');
      } else {
        console.error('Facebook registration failed');
      }
    } catch (error) {
      console.error('Error during Facebook registration:', error);
    }
  };

  const handleLoginClick = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex justify-center items-center" style={{fontFamily: "Poppins-Regular"}}>
        <div className="bg-white p-8 w-full" style={{width: "700px"}}>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  Create Account
                </button>

                <div className="text-center text-gray-500 my-4 pt-4">Or</div>

                <GoogleLogin
                  onSuccess={handleGoogleRegister}
                  onError={() => {
                    console.log('Registration Failed');
                  }}
                  render={(renderProps) => (
                    <button
                      type="button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2"
                    >
                      <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                      <span>Continue with Google</span>
                    </button>
                  )}
                />

                {/* <button type="button" className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2">
                  <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button> */}

                <FacebookLogin
                  appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                  callback={handleFacebookRegister}
                  render={(renderProps) => (
                    <button
                      type="button"
                      onClick={renderProps.onClick}
                      className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2"
                    >
                      <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
                      <span>Continue with Facebook</span>
                    </button>
                  )}
                />
              </Form>
            )}
          </Formik>

          <button
            type="button"
            onClick={handleLoginClick}
            className="mt-6 bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
          >
            Have an Account? Login
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
