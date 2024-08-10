export const getCollections = async () => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    return await collections.json();
};
  
export const getCollectionDetails = async (collectionId) => {
    const collection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
    return await collection.json();
};
  
// export const getProducts = async () => {
//     const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//     return await products.json();
// };

export const getProducts = async () => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`); 
    return await products.json();
};


// export const getProducts = async () => {
//     try {
//       const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
//       if (!products.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       return await products.json();
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       throw error;
//     }
//   };
  
  
export const getProductDetails = async (productId) => {
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`);
    return await product.json();
};
  
export const getSearchedProducts = async (query) => {
    const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
    return await searchedProducts.json();
};
  
export const getOrders = async (customerId) => {
    const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`);
    return await orders.json();
};
  
export const getRelatedProducts = async (productId) => {
    const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`);
    return await relatedProducts.json();
};


// localhost:5000/api/product/65d0e580ba18fbdffe6fc6c1