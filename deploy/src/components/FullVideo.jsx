// import React, { useEffect, useRef } from 'react';

// const FullVideo = ({ videoUrl }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(error => {
//         console.log("Autoplay was prevented:", error);
//       });
//     }
//   }, []);

//   return (
//     <div className="relative h-screen overflow-hidden">
//       <div className="absolute inset-0 z-0 h-full section__padding-home">
//         <video 
//           ref={videoRef}
//           className="object-cover w-full h-full" 
//           style={{ controlsList: "nodownload", WebkitMediaControls: true, controls: true }}
//           loop 
//           muted 
//           playsInline
//           controls
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// };

// export default FullVideo;












import React, { useEffect, useRef, useState } from 'react';

const FullVideo = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState(16 / 9); // Default aspect ratio

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });

      // Get the actual video aspect ratio once metadata is loaded
      videoRef.current.onloadedmetadata = () => {
        setVideoAspectRatio(videoRef.current.videoWidth / videoRef.current.videoHeight);
      };
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        className="absolute inset-0 flex items-center justify-center section__padding"
        style={{
          width: '100vw',
          // height: '100vh',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <video 
            ref={videoRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
            style={{
              aspectRatio: videoAspectRatio,
              objectFit: 'cover',
            }}
            loop 
            muted 
            playsInline
            controls
            controlsList="nodownload"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default FullVideo;