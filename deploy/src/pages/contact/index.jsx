import React from 'react';
import FullImage from "../../components/FullImage"

import Employee from '../../../public/contact.png';


const ContactPage = () => {
  return (
    <>
      <FullImage imageUrl={Employee} alt="contact" />
      <div className="flex justify-center flex-col items-center md:flex-row md:items-start p-4 md:p-8 lg:p-20">  

        <div className="flex flex-col md:flex-row w-full max-w-6xl space-y-8 md:space-y-0 md:space-x-8">
          {/* Contact form */}
          <div className="flex flex-col w-full md:w-1/2 space-y-8">
            <form className="flex flex-col space-y-4">
              <input type="email" placeholder="Email" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
              <input type="text" placeholder="First name" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
              <input type="text" placeholder="Last name" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
              <input type="text" placeholder="City" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
              <input type="text" placeholder="Country" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
              <input type="tel" placeholder="Phone" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}/>
              <textarea placeholder="Message" rows="5" className="w-full border border-gray-300 px-4 py-2" style={{ fontFamily: "Poppins-Regular" }}></textarea>
              <button type="submit" className="bg-black text-white py-2 px-4 hover:opacity-80" style={{ width: "250px", marginTop: "2rem", fontFamily: "Poppins-Regular" }}>Send</button>
            </form>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center md:items-end w-full md:w-1/2 text-center md:text-right">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold leading-tight mb-4">
              5400 N. Lakewood Ave, Chicago
            </h1>
            <p className="mt-6" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> +290xxxxxxxxxxx </p>
            <p className="mb-2" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}> info@anniesboutique.com </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactPage;
