// import { useState } from 'react';

// const FAQItem = ({ question }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border-b border-black py-4">
//       <button
//         className="flex justify-between items-center w-full text-left"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>{question}</span>
//         <span>{isOpen ? '-' : '+'}</span>
//       </button>
//       {isOpen && (
//         <div className="mt-2">
//           <p style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const FAQPage = () => {
//   const faqs = [
//     "What is costume jewelry?",
//     "How can I contact customer service?",
//     "Where are you located?",
//     "How do I place an order?",
//     "What payment methods do you accept?",
//     "Can I change or cancel my order after it has been placed?",
//     "Do you offer international shipping?",
//     "How much does shipping cost?",
//     "How long does it take to receive my order?",
//   ];

//   return (
//     <div className="max-w-2xl mx-auto section__padding">
//       <h1 className="text-3xl font-bold mb-4 ml-12" style={{padding: ""}}>FAQS</h1>
//       <p className="mb-12 ml-12" style={{fontFamily: "Poppins-Regular", fontSize: "14px"}}>Frequently Asked Questions<br />Here are some common frequently asked questions.</p>
//       <p className='border-b border-black'></p>
//       {faqs.map((question, index) => (
//         <FAQItem key={index} question={question} />
//       ))}
//     </div>
//   );
// };

// export default FAQPage;




import { useState } from 'react';

const FAQItem = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-2">
          <p style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    "What is costume jewelry?",
    "How can I contact customer service?",
    "Where are you located?",
    "How do I place an order?",
    "What payment methods do you accept?",
    "Can I change or cancel my order after it has been placed?",
    "Do you offer international shipping?",
    "How much does shipping cost?",
    "How long does it take to receive my order?",
  ];

  return (
    <div className="max-w-2xl mx-auto section__padding">
      <h1 className="text-3xl font-bold mb-4 ml-12" style={{ padding: "" }}>FAQS</h1>
      <p className="mb-12 ml-12" style={{ fontFamily: "Poppins-Regular", fontSize: "14px" }}>
        Frequently Asked Questions<br />Here are some common frequently asked questions.
      </p>
      <p className='border-b border-black'></p>
      {faqs.map((question, index) => (
        <FAQItem key={index} question={question} />
      ))}
    </div>
  );
};

export default FAQPage;
