// import React from 'react';

// const paragraphStyles = {
//   fontFamily: 'Poppins',
//   fontSize: '12.8px',
//   fontWeight: 400,
//   lineHeight: '19.2px',
//   textAlign: 'left'
// };

// const Footer = () => {
//   return (
//     <div className="flex justify-between" style={{fontFamily: "Poppins-Regular", fontSize: "18px", padding: "0 4rem 4rem 4rem"}}>
//       <p style={paragraphStyles}>COMMUNITY</p>
//       <p style={paragraphStyles}>OUR STORY</p>
//       <p style={paragraphStyles}>TERMS & CONDITIONS</p>
//       <p style={paragraphStyles}>CONTACT US</p>
//       <p style={paragraphStyles}>FAQS</p>
//       <p style={paragraphStyles}>SOCIALS</p>
//     </div>
//   );
// };

// export default Footer;


import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 px-4 md:px-8" style={{fontFamily: "Poppins-Regular"}}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-center">
          <div className="footer-item">
            <Link href="/community" className="mb-2 text-sm md:text-base hover:underline" style={{fontSize: "14px"}}>
              COMMUNITY
            </Link>
          </div>
          <div className="footer-item">
            <Link href="/our-story" className="mb-2 text-sm md:text-base hover:underline" style={{fontSize: "14px"}}>
              OUR STORY
            </Link>
          </div>
          <div className="footer-item">
            <Link href="/terms-and-conditions" className="mb-2 text-sm md:text-base hover:underline" style={{fontSize: "14px"}}>
              TERMS & CONDITIONS
            </Link>
          </div>
          <div className="footer-item">
            <Link href="/contact
            " className="mb-2 text-sm md:text-base hover:underline" style={{fontSize: "14px"}}>
              CONTACT US
            </Link>
          </div>
          <div className="footer-item">
            <Link href="/(root)/faqs" className="mb-2 text-sm md:text-base hover:underline" style={{fontSize: "14px"}}>
              FAQS
            </Link>
          </div>
          <div className="footer-item">
            <Link href="/socials" className="mb-2 text-sm md:text-base hover:underline" style={{fontSize: "14px"}}>
              SOCIALS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;