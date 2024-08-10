import React from 'react';
import Image, { StaticImageData } from 'next/image';

const FullImage = ({ imageUrl }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="gpt3__header-content section__padding-vid">
        <div className="gpt3__header-image">
          <Image src={imageUrl.src} alt="hey" className="object-cover w-full h-full" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default FullImage;










// import React from 'react';
// import Image, { StaticImageData } from 'next/image';

// interface FullImageProps {
//   imageUrl: StaticImageData;  
//   alt: string;  
// }

// const FullImage = ({ imageUrl, alt }: FullImageProps) => {
//   return (
//     <div className="gpt3__header-content section__padding">
//       <div className="gpt3__header-image">
//         <Image src={imageUrl.src} alt={alt} className="object-cover w-full h-full rounded-md" layout="fill" />
//       </div>
//     </div>
//   );
// };

// export default FullImage;