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

const Login = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setError }) => {
    try {
      const success = await login(values.email, values.password);
      if (success) {
        router.push('/');
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

  return (
    <div className="min-h-screen flex justify-center items-center" style={{fontSize: "14px", fontFamily: "Poppins-Regular"}}>
      <div className="bg-white p-8 w-full" style={{width: "700px"}}>
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

              <div className="text-start">
                <a href="#" className="text-black hover:underline text-sm">
                  Forgot your Password?
                </a>
              </div>

              <div className="text-center text-gray-500 my-4">Or</div>

              <button type="button" className="border border-gray-300 px-3 py-2 w-full text-left flex items-center justify-center space-x-2">
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