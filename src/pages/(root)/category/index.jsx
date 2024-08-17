
import { useEffect, useState } from 'react';
import HeroSection from '../../../components/Hero';
import Collections from '../../../components/Categories';
import FullImage from '../../../components/FullImage';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';

import cat from '../../../../public/category.png';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div>
        {/* <FullImage imageUrl="/category.png" /> */}
        <FullImage imageUrl={cat} alt="employee" />
        {/* <Collections /> */}
        <div className="flex flex-col items-center gap-10 pt-8">
          {!categories.length ? (
            <p className="text-body-bold px-4 sm:px-8 md:px-12 lg:px-20">No categories found</p>
          ) : (
            <>
              <div className="hidden md:block w-full" style={{padding: "4rem 4rem 0 4rem"}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  w-full">
                  {categories.map((category) => (
                    <Link href={`/(root)/categories/${category._id}`} key={category._id} className="w-full">
                      <div className="cursor-pointer w-full">
                        <Image
                          src={category.image?.url || '/default-image.jpg'}
                          alt={category.title}
                          width={350}
                          height={200}
                          layout="responsive"
                          className="w-full"
                        />
                        <p className="text-left" style={{ fontSize: "28px", fontWeight: "700" }}>{category.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="block md:hidden w-full px-4 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Link href={`/(root)/categories/${category._id}`} key={category._id} className="w-full">
                      <div className="cursor-pointer w-full">
                        <Image
                          src={category.image?.url || '/default-image.jpg'}
                          alt={category.title}
                          width={350}
                          height={200}
                          layout="responsive"
                          className="w-full"
                        />
                        <p className="text-left text-xl sm:text-2xl md:text-3xl font-bold mt-2">{category.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
