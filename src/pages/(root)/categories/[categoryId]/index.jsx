import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ProductCard from "../../../../components/ProductCard";


const CategoryDetails = () => {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const router = useRouter();
  const { categoryId } = router.query;

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        if (!categoryId) {
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch category details");
        }
        const data = await response.json();
        setCategoryDetails(data);
      } catch (error) {
        console.error("Error fetching category details:", error);
        setError(error.message);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  if (!categoryId) {
    return <div>No category selected</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!categoryDetails) {
    return <div>Loading...</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryDetails.products?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="flex flex-col items-left gap-8 px-4 sm:px-8 md:px-12 lg:px-20 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts?.length ? (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} categoryTitle={categoryDetails.title} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
        {categoryDetails.products?.length > productsPerPage && (
          <Pagination
            productsLength={categoryDetails.products.length}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

const Pagination = ({ productsLength, productsPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(productsLength / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-8 px-4 sm:px-8 md:px-12 lg:px-20">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="mr-2"
      >
        <Image src="/Line1.png" alt="Previous" width={20} height={20} />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === number ? 'bg-black text-white' : 'bg-gray-200'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))}
        disabled={currentPage === pageNumbers.length}
        className="ml-2"
      >
        <Image src="/Line2.png" alt="Next" width={20} height={20} />
      </button>
    </div>
  );
};

export default CategoryDetails;
