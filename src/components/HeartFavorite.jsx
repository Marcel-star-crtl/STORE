// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Heart } from 'lucide-react';
// import { getToken } from '../utils/jwt';

// const HeartFavorite = ({ product, updateSignedInUser }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         setLoading(true);
//         const token = getToken();
//         if (!token) {
//           setUser(null);
//           setLoading(false);
//           return;
//         }

//         const res = await fetch('http://localhost:5000/api/user', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           console.error('Response status:', res.status);
//           console.error('Response status text:', res.statusText);
//           throw new Error('Failed to fetch user data');
//         }
//         const data = await res.json();
//         setUser(data);
//         if (data && data.wishlist) {
//           setIsLiked(data.wishlist.includes(product._id));
//         }
//       } catch (err) {
//         console.error('[users_GET]', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUser();
//   }, [product._id]);

//   const handleLike = async (e) => {
//     e.preventDefault();
//     const token = getToken();
//     if (!token) {
//       router.push('/sign-in');
//       return;
//     }
  
//     try {
//       const res = await fetch('http://localhost:5000/api/user/wishlist', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ productId: product._id }),
//       });
  
//       if (!res.ok) {
//         if (res.status === 404) {
//           console.error('Endpoint not found. Check the URL and server configuration.');
//         }
//         throw new Error('Failed to update wishlist');
//       }
  
//       const updatedUser = await res.json();
//       if (updatedUser && updatedUser.wishlist) {
//         setIsLiked(updatedUser.wishlist.includes(product._id));
//         if (updateSignedInUser) {
//           updateSignedInUser(updatedUser);
//         }
//       }
//     } catch (err) {
//       console.error('[wishlist_POST]', err);
//     }
//   };
  

//   return (
//     <button onClick={handleLike} disabled={loading}>
//       <Heart fill={isLiked ? 'red' : 'white'} />
//     </button>
//   );
// };

// export default HeartFavorite;









import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { getToken } from '../utils/jwt';

const HeartFavorite = ({ product, updateWishlist }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        setLoading(true);
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('Response status:', res.status);
          console.error('Response status text:', res.statusText);
          throw new Error('Failed to fetch user data');
        }

        const data = await res.json();
        setIsLiked(data?.wishlist?.includes(product._id));
      } catch (err) {
        console.error('[checkIfLiked]', err);
      } finally {
        setLoading(false);
      }
    };

    checkIfLiked();
  }, [product._id]);

  const handleLike = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      router.push('/sign-in');
      return;
    }

    try {
      setLoading(true);
      const method = isLiked ? 'DELETE' : 'POST';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/wishlist`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error('Error message:', errorMessage);
        throw new Error('Failed to update wishlist');
      }

      if (isLiked) {
        toast.error('Already added to wishlist');
      } else {
        toast.success('Added to wishlist');
      }

      setIsLiked(!isLiked);
      updateWishlist(product._id, !isLiked);
    } catch (err) {
      console.error(`[wishlist_${isLiked ? 'DELETE' : 'POST'}]`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading} className="">
      <Heart fill={isLiked ? 'black' : 'white'} />
    </button>
  );
};

export default HeartFavorite;
