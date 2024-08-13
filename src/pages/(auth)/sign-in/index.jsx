// // import { useState } from 'react';
// // import { useRouter } from 'next/router';
// // import client from "../../api/client" 
// // import { setToken } from '../../../utils/jwt'; 
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import useAuthStore from '../../../stores/authStore';


// const Login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const login = useAuthStore((state) => state.login);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await client.post('/user/login', { email, password });
//       // if (response && response.status === 200) {
//       //   const data = await response.data;
//       //   setToken(data.token);
//       //   router.push('/');
//       // } else {
//       //   setError('Something went wrong. Please try again later.');
//       // }
//       const success = await login(email, password);
//       if (success){
//         router.push('/');
//       }else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('Something went wrong. Please try again later.');
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="flex flex-col">
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-gray-300 rounded-none px-3 py-2 mb-4 w-full"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-gray-300 rounded-none px-3 py-2 mb-4 w-full"
//           required
//         />
//         <button type="submit" className="bg-black text-white px-4 py-2 rounded-none">
//           Login
//         </button>
//         <p className="text-black mt-2 cursor-pointer">Forgot your password?</p>
//         <button type="submit" className="bg-black text-white px-4 py-2 rounded-none">
//           Create Account
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;









import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthStore from '../../../stores/authStore';
import { useGoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import axios from 'axios';

const OrSeparator = () => (
  <div className="or-separator flex items-center my-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="mx-2 text-gray-500">Or</span>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
);

const Login = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const [user, setUser] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setError }) => {
    try {
      const success = await login(values.email, values.password);
      if (success) {
        router.push('/'); // Redirect to home
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again later.');
    }
    setSubmitting(false);
  };

  const handleCreateAccount = () => {
    router.push('/(auth)/sign-up');
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then(async (res) => {
          const googleUser = res.data;
          const success = await googleLogin(googleUser);
          if (success) {
            router.push('/'); // Redirect to home
          } else {
            console.error('Google login failed');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, googleLogin, router]);

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ fontSize: "14px", fontFamily: "Poppins-Regular" }}>
      <div className="bg-white p-8 w-full" style={{ width: "700px" }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                Login
              </button>

              <div className="text-start" style={{marginBottom: "3rem"}}>
                <a href="#" className="text-black hover:underline text-sm">
                  Forgot your Password?
                </a>
              </div>

              <OrSeparator />

              <button 
                type="button" 
                onClick={() => googleLoginHandler()} 
                className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2"
              >
                <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              <button type="button" className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2">
                <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
                <span>Continue with Facebook</span>
              </button>
            </Form>
          )}
        </Formik>

        <button
          type="button"
          onClick={handleCreateAccount}
          className="mt-6 bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;












// import { useRouter } from 'next/router';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import useAuthStore from '../../../stores/authStore';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";

// const Login = () => {
//   const router = useRouter();
//   const login = useAuthStore((state) => state.login);
//   const googleLogin = useAuthStore((state) => state.googleLogin);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const handleSubmit = async (values, { setSubmitting, setError }) => {
//     try {
//       const success = await login(values.email, values.password);
//       if (success) {
//         router.push('/');
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('Something went wrong. Please try again later.');
//     }
//     setSubmitting(false);
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const success = await googleLogin(decoded);
//       if (success) {
//         router.push('/');
//       } else {
//         console.error('Google login failed');
//       }
//     } catch (error) {
//       console.error('Error during Google login:', error);
//     }
//   };

//   const handleCreateAccount = () => {
//     router.push('/(auth)/sign-up');
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//       <div className="min-h-screen flex justify-center items-center" style={{fontSize: "14px", fontFamily: "Poppins-Regular"}}>
//         <div className="bg-white p-8 w-full" style={{width: "700px"}}>
//           <Formik
//             initialValues={{ email: '', password: '' }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
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
//                   Login
//                 </button>

//                 <div className="text-start">
//                   <a href="#" className="text-black hover:underline text-sm">
//                     Forgot your Password?
//                   </a>
//                 </div>

//                 <div className="text-center text-gray-500 my-4">Or</div>

//                 <GoogleLogin
//                   onSuccess={handleGoogleLogin}
//                   onError={() => {
//                     console.log('Login Failed');
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
//             onClick={handleCreateAccount}
//             className="mt-6 bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
//           >
//             Create Account
//           </button>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;







// import { useRouter } from 'next/router';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import useAuthStore from '../../../stores/authStore';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import Link from "next/link";

// const Login = () => {
//   const router = useRouter();
//   const login = useAuthStore((state) => state.login);
//   const googleLogin = useAuthStore((state) => state.googleLogin);
//   const facebookLogin = useAuthStore((state) => state.facebookLogin);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const handleSubmit = async (values, { setSubmitting, setError }) => {
//     try {
//       const success = await login(values.email, values.password);
//       if (success) {
//         router.push('/');
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('Something went wrong. Please try again later.');
//     }
//     setSubmitting(false);
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const success = await googleLogin(decoded);
//       if (success) {
//         router.push('/');
//       } else {
//         console.error('Google login failed');
//       }
//     } catch (error) {
//       console.error('Error during Google login:', error);
//     }
//   };

//   const handleFacebookLogin = async (response) => {
//     try {
//       const success = await facebookLogin(response);
//       if (success) {
//         router.push('/');
//       } else {
//         console.error('Facebook login failed');
//       }
//     } catch (error) {
//       console.error('Error during Facebook login:', error);
//     }
//   };

//   const handleCreateAccount = () => {
//     router.push('/(auth)/sign-up');
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//       <div className="min-h-screen flex justify-center items-center" style={{fontSize: "14px", fontFamily: "Poppins-Regular"}}>
//         <div className="bg-white p-8 w-full" style={{width: "700px"}}>
//           <Formik
//             initialValues={{ email: '', password: '' }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
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
//                   Login
//                 </button>

//                 {/* <div className="text-start">
//                   <a href="#" className="text-black hover:underline text-sm">
//                     Forgot your Password?
//                   </a>
//                 </div> */}

//                 <div className="text-start">
//                   <Link href="(auth)/forgot-password" className="text-black hover:underline text-sm">
//                     Forgot your Password?
//                   </Link>
//                 </div>

//                 <div className="text-center text-gray-500 my-4">Or</div>

//                 <GoogleLogin
//                   onSuccess={handleGoogleLogin}
//                   onError={() => {
//                     console.log('Login Failed');
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

//                 <FacebookLogin
//                   appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
//                   callback={handleFacebookLogin}
//                   render={(renderProps) => (
//                     <button
//                       type="button"
//                       onClick={renderProps.onClick}
//                       className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2"
//                     >
//                       <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
//                       <span>Continue with Facebook</span>
//                     </button>
//                   )}
//                 />
//               </Form>
//             )}
//           </Formik>

//           <button
//             type="button"
//             onClick={handleCreateAccount}
//             className="mt-6 bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
//           >
//             Create Account
//           </button>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;
