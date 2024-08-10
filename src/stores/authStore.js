// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import client from '../../src/pages/api/client';
// import { setToken, removeToken } from '../utils/jwt';

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       login: async (email, password) => {
//         try {
//           const response = await client.post('/user/login', { email, password });
//           if (response && response.status === 200) {
//             const data = response.data;
//             setToken(data.token);
//             set({ user: data.user, isAuthenticated: true });
//             return true;
//           }
//         } catch (error) {
//           console.error('Login error:', error);
//         }
//         return false;
//       },
//       register: async (userData) => {
//         try {
//           const response = await client.post('/user/register', userData);
//           if (response.status === 200) {
//             return true;
//           }
//         } catch (error) {
//           console.error('Registration error:', error);
//         }
//         return false;
//       },
//       logout: () => {
//         removeToken();
//         set({ user: null, isAuthenticated: false });
//       },
//     }),
//     {
//       name: 'auth-storage',
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useAuthStore;









// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import client from '../../src/pages/api/client';
// import { setToken, removeToken } from '../utils/jwt';

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       // user: null,
//       // isAuthenticated: false,
//       fetchUser: async () => {
//         try {
//           const response = await fetch('/api/user', { method: 'GET', credentials: 'include' });
//           if (response.ok) {
//             const data = await response.json();
//             set({ user: data, isAuthenticated: true });
//           } else {
//             set({ user: null, isAuthenticated: false });
//           }
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           set({ user: null, isAuthenticated: false });
//         }
//       },
//       login: async (email, password) => {
//         try {
//           const response = await client.post('/user/login', { email, password });
//           if (response && response.status === 200) {
//             const data = response.data;
//             setToken(data.token);
//             set({ user: data.user, isAuthenticated: true });
//             return true;
//           }
//         } catch (error) {
//           console.error('Login error:', error);
//         }
//         return false;
//       },
//       register: async (userData) => {
//         try {
//           const response = await client.post('/user/register', userData);
//           if (response.status === 200) {
//             return true;
//           }
//         } catch (error) {
//           console.error('Registration error:', error);
//         }
//         return false;
//       },
//       logout: async () => {
//         try {
//           const response = await client.get('/user/logout', { withCredentials: true });
//           if (response.status === 204) {
//             removeToken();
//             set({ user: null, isAuthenticated: false });
//             return true;
//           }
//         } catch (error) {
//           console.error('Logout error:', error);
//         }
//         return false;
//       },
//     }),
//     {
//       name: 'auth-storage',
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useAuthStore;













// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import client from '../../src/pages/api/client';
// import { setToken, removeToken } from '../utils/jwt';

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       fetchUser: async () => {
//         try {
//           const response = await fetch('/api/user', { method: 'GET', credentials: 'include' });
//           if (response.ok) {
//             const data = await response.json();
//             set({ user: data, isAuthenticated: true });
//           } else {
//             set({ user: null, isAuthenticated: false });
//           }
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           set({ user: null, isAuthenticated: false });
//         }
//       },
//       login: async (email, password) => {
//         try {
//           const response = await client.post('/user/login', { email, password });
//           if (response && response.status === 200) {
//             const data = response.data;
//             setToken(data.token);
//             set({ user: data.user, isAuthenticated: true });
//             return true;
//           }
//         } catch (error) {
//           console.error('Login error:', error);
//         }
//         return false;
//       },
//       register: async (userData) => {
//         try {
//           const response = await client.post('/user/register', userData);
//           if (response.status === 200) {
//             return true;
//           }
//         } catch (error) {
//           console.error('Registration error:', error);
//         }
//         return false;
//       },
//       logout: async () => {
//         try {
//           const response = await client.get('/user/logout', { withCredentials: true });
//           if (response.status === 204) {
//             removeToken();
//             set({ user: null, isAuthenticated: false });
//             return true;
//           }
//         } catch (error) {
//           console.error('Logout error:', error);
//         }
//         return false;
//       },
//       googleLogin: async (googleUser) => {
//         try {
//           const response = await client.post('/user/google-login', { googleUser });
//           if (response && response.status === 200) {
//             const data = response.data;
//             setToken(data.token);
//             set({ user: data.user, isAuthenticated: true });
//             return true;
//           }
//         } catch (error) {
//           console.error('Google login error:', error);
//         }
//         return false;
//       },
//       googleRegister: async (googleUser) => {
//         try {
//           const response = await client.post('/user/google-register', { googleUser });
//           if (response.status === 200) {
//             return true;
//           }
//         } catch (error) {
//           console.error('Google registration error:', error);
//         }
//         return false;
//       },
//     }),
//     {
//       name: 'auth-storage',
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useAuthStore;








import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import client from '../../src/pages/api/client';
import { setToken, removeToken } from '../utils/jwt';

const useAuthStore = create(
  persist(
    (set) => ({
      fetchUser: async () => {
        try {
          const response = await fetch('/api/user', { method: 'GET', credentials: 'include' });
          if (response.ok) {
            const data = await response.json();
            set({ user: data, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          set({ user: null, isAuthenticated: false });
        }
      },
      login: async (email, password) => {
        try {
          const response = await client.post('/user/login', { email, password });
          if (response && response.status === 200) {
            const data = response.data;
            setToken(data.token);
            set({ user: data.user, isAuthenticated: true });
            return true;
          }
        } catch (error) {
          console.error('Login error:', error);
        }
        return false;
      },
      register: async (userData) => {
        try {
          const response = await client.post('/user/register', userData);
          if (response.status === 200) {
            return true;
          }
        } catch (error) {
          console.error('Registration error:', error);
        }
        return false;
      },
      logout: async () => {
        try {
          const response = await client.get('/user/logout', { withCredentials: true });
          if (response.status === 204) {
            removeToken();
            set({ user: null, isAuthenticated: false });
            return true;
          }
        } catch (error) {
          console.error('Logout error:', error);
        }
        return false;
      },
      googleLogin: async (googleUser) => {
        try {
          const response = await client.post('/user/google-login', { googleUser });
          if (response && response.status === 200) {
            const data = response.data;
            setToken(data.token);
            set({ user: data.user, isAuthenticated: true });
            return true;
          }
        } catch (error) {
          console.error('Google login error:', error);
        }
        return false;
      },
      googleRegister: async (googleUser) => {
        try {
          const response = await client.post('/user/google-register', { googleUser });
          if (response.status === 200) {
            return true;
          }
        } catch (error) {
          console.error('Google registration error:', error);
        }
        return false;
      },
      facebookLogin: async (facebookUser) => {
        try {
          const response = await client.post('/user/facebook-login', { facebookUser });
          if (response && response.status === 200) {
            const data = response.data;
            setToken(data.token);
            set({ user: data.user, isAuthenticated: true });
            return true;
          }
        } catch (error) {
          console.error('Facebook login error:', error);
        }
        return false;
      },
      facebookRegister: async (facebookUser) => {
        try {
          const response = await client.post('/user/facebook-register', { facebookUser });
          if (response.status === 200) {
            return true;
          }
        } catch (error) {
          console.error('Facebook registration error:', error);
        }
        return false;
      },
      requestPasswordReset: async (email) => {
        try {
          const response = await client.post('/user/forgot-password-token', { email });
          return response.data.success;
        } catch (error) {
          console.error('Request password reset error:', error);
          return false;
        }
      },
      verifyResetToken: async (email, token) => {
        try {
          const response = await client.post('/user/verify-reset-token', { email, token });
          return response.data.success;
        } catch (error) {
          console.error('Verify reset token error:', error);
          return false;
        }
      },
      // resetPassword: async (email, token, newPassword) => {
      //   try {
      //     const response = await client.put('/user/reset-password', { email, token, password: newPassword });
      //     return response.data.success;
      //   } catch (error) {
      //     console.error('Reset password error:', error);
      //     return false;
      //   }
      // },
      resetPassword: async (email, token, newPassword) => {
        try {
          const response = await client.put(`/user/reset-password/${token}`, { email, password: newPassword });
          return response.data.success;
        } catch (error) {
          console.error('Reset password error:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
