import React, { useEffect, useState } from 'react';

export default function Vedeo() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    console.log("Video component mounted.");
  }, []);

  return (
    <div>
      <h5>Tutorial Video</h5>
      <video
        width="100%"
        height="auto"
        controls
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!videoLoaded && <p>Loading video...</p>} {/* Loading message */}
    </div>
  );
}
