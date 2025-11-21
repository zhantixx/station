import React from "react";
import styles from "./VideoSection.module.css";

export default function VideosSection({ mainVideo, sidebarVideos }) {
  return (
    <div className={styles.videosSection}>
      {/* Главное видео */}
      <div className={styles.mainVideo}>
        <iframe
          width="100%"
          height="450"
          src={mainVideo.url}
          title={mainVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <h3>{mainVideo.title}</h3>
        <p>{mainVideo.meta}</p>
      </div>

      {/* Боковые видео */}
      <div className={styles.sidebarVideos}>
        {sidebarVideos.map((video, index) => (
          <div key={index} className={styles.sidebarVideoCard}>
            <iframe
              width="100%"
              height="180"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h4>{video.title}</h4>
            <p>{video.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
