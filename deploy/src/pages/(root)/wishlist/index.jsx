import { useState, useEffect } from 'react';
import Link from "next/link";
import { getToken } from '../../../utils/jwt';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Imagery from "../../../components/Imagery";

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/user/wishlist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("[fetchWishlist] Error:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        // Fetch category details for each product
        const wishlistWithCategories = await Promise.all(data.wishlist.map(async (product) => {
          if (product.category) {
            const categoryRes = await fetch(`http://localhost:5000/api/category/${product.category}`);
            if (categoryRes.ok) {
              const categoryData = await categoryRes.json();
              return { ...product, categoryTitle: categoryData.title };
            }
          }
          return { ...product, categoryTitle: 'Unknown Category' };
        }));
        setWishlist(wishlistWithCategories);
        setLoading(false);
      } catch (error) {
        console.error("[fetchWishlist] Error:", error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    const token = getToken();
    if (!token) {
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/user/wishlist', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error('Error message:', errorMessage);
        throw new Error('Failed to remove from wishlist');
      }

      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
      toast.error('Item removed from wishlist');
    } catch (err) {
      console.error('[wishlist_DELETE]', err);
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-8 md:py-12 ">
      {/* <h2 className="font-bold mb-4 text-2xl sm:text-3xl lg:text-4xl">Saved Items</h2> */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">Saved Items</h2>
      </div>
      {wishlist.length === 0 && <p>No items in your wishlist</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product._id} className="w-full flex flex-col gap-2 cursor-pointer">
            <Link href={`/(root)/products/${product._id}`}>
              <div className="relative w-full">
                {product.images.length > 0 ? (
                  <Imagery productMedia={product.images.map(image => image.url)} />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start mt-2">
                <div>
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-sm text-gray-500">
                    {product.categoryTitle}
                  </p>
                  <p className="text-sm">$ {product.price}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFromWishlist(product._id);
                  }}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Remove
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
