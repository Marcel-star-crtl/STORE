// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import useAuthStore from '../../../stores/authStore';

// const ResetPassword = () => {
//   const router = useRouter();
//   const [step, setStep] = useState('request'); 
//   const [email, setEmail] = useState('');
//   const [resetToken, setResetToken] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
//   const verifyResetToken = useAuthStore((state) => state.verifyResetToken);
//   const resetPassword = useAuthStore((state) => state.resetPassword);

//   const requestSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//   });

//   const verifySchema = Yup.object().shape({
//     token: Yup.string().required('Reset token is required'),
//   });

//   const resetSchema = Yup.object().shape({
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
//   });

//   const handleRequestSubmit = async (values, { setSubmitting }) => {
//     try {
//       const success = await requestPasswordReset(values.email);
//       if (success) {
//         setEmail(values.email);
//         setStep('verify');
//       } else {
//         setErrorMessage('Failed to send reset email. Please try again.');
//       }
//     } catch (error) {
//       console.error('Request reset error:', error);
//       setErrorMessage('Something went wrong. Please try again later.');
//     }
//     setSubmitting(false);
//   };

//   const handleVerifySubmit = async (values, { setSubmitting }) => {
//     try {
//       const success = await verifyResetToken(email, values.token);
//       if (success) {
//         setResetToken(values.token);
//         setStep('reset');
//       } else {
//         setErrorMessage('Invalid or expired token. Please try again.');
//       }
//     } catch (error) {
//       console.error('Verify token error:', error);
//       setErrorMessage('Something went wrong. Please try again later.');
//     }
//     setSubmitting(false);
//   };

//   const handleResetSubmit = async (values, { setSubmitting }) => {
//     try {
//       const success = await resetPassword(email, resetToken, values.password);
//       if (success) {
//         router.push('/login');
//       } else {
//         setErrorMessage('Failed to reset password. Please try again.');
//       }
//     } catch (error) {
//       console.error('Reset password error:', error);
//       setErrorMessage('Something went wrong. Please try again later.');
//     }
//     setSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center" style={{fontSize: "14px", fontFamily: "Poppins-Regular"}}>
//       <div className="bg-white p-8 w-full" style={{width: "700px"}}>
//         {errorMessage && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//             <span className="block sm:inline">{errorMessage}</span>
//           </div>
//         )}
//         {step === 'request' && (
//           <Formik
//             initialValues={{ email: '' }}
//             validationSchema={requestSchema}
//             onSubmit={handleRequestSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//                 <button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 w-full hover:bg-gray-900 transition"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Sending...' : 'Send Reset Email'}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         )}
//         {step === 'verify' && (
//           <Formik
//             initialValues={{ token: '' }}
//             validationSchema={verifySchema}
//             onSubmit={handleVerifySubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <h2 className="text-2xl font-bold mb-4">Verify Reset Token</h2>
//                 <Field
//                   type="text"
//                   name="token"
//                   placeholder="Reset Token"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="token" component="div" className="text-red-500 text-sm" />
//                 <button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 w-full hover:bg-gray-900 transition"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Verifying...' : 'Verify Token'}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         )}
//         {step === 'reset' && (
//           <Formik
//             initialValues={{ password: '', confirmPassword: '' }}
//             validationSchema={resetSchema}
//             onSubmit={handleResetSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
//                 <Field
//                   type="password"
//                   name="password"
//                   placeholder="New Password"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//                 <Field
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   className="border border-gray-300 px-3 py-2 w-full"
//                 />
//                 <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
//                 <button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 w-full hover:bg-gray-900 transition"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Resetting...' : 'Reset Password'}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;










import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthStore from '../../../stores/authStore';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
  const resetPassword = useAuthStore((state) => state.resetPassword);

  useEffect(() => {
    if (token) {
      setStep('reset');
      setResetToken(token);
    }
  }, [token]);

  const requestSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const resetSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleRequestSubmit = async (values, { setSubmitting }) => {
    try {
      const success = await requestPasswordReset(values.email);
      if (success) {
        setEmail(values.email);
        setStep('verify');
      } else {
        setErrorMessage('Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Request reset error:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
    setSubmitting(false);
  };

  const handleResetSubmit = async (values, { setSubmitting }) => {
    try {
      const success = await resetPassword(email, resetToken, values.password);
      if (success) {
        router.push('/(auth)/sign-in');
      } else {
        setErrorMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ fontSize: "", fontFamily: "Poppins-Regular" }}>
      <div className="bg-white p-8 w-full" style={{ width: "700px" }}>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        {step === 'request' && (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={requestSchema}
            onSubmit={handleRequestSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <h2 className="text-2xl font-bold mb-4" style={{ fontSize: "14px", fontFamily: "Playfair-Display" }}>Forgot Password</h2>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  Request Reset
                </button>
              </Form>
            )}
          </Formik>
        )}
        {step === 'reset' && (
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={resetSchema}
            onSubmit={handleResetSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <h2 className="text-2xl font-bold mb-4" style={{ fontSize: "", fontFamily: "Playfair-Display" }}>Reset Password</h2>
                <Field
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
