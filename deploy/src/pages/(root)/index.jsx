import React from 'react';
import Collections from "../../components/Categories";
import ProductList from "../../components/ProductList";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" />
      <Collections />
      <ProductList />
    </>
  );
};

export default Home;

export const dynamic = "force-dynamic";