
import React from 'react';
import HeroSection from '../../../components/Hero';
import Collections from '../../../components/Categories';
import FullImage from '../../../components/FullImage';
import { toast } from 'react-toastify';

import cat from '../../../../public/category.png';

const Category = () => {
  return (
    <>
      <div>
        {/* <FullImage imageUrl="/category.png" /> */}
        <FullImage imageUrl={cat} alt="employee" />
        <Collections />
      </div>
    </>
  );
};

export default Category;
