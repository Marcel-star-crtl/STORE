import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="py-5" style={{ padding: "0 4rem" }}>
      <h2 className="text-left text-3xl font-bold mb-4" style={{ fontSize: "clamp(18px, 5vw, 35px)", lineHeight: "1.0" }}>
        You May Also Like
      </h2>
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-8 pb-4" style={{ width: 'max-content' }}>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div key={product._id} className="w-64 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;