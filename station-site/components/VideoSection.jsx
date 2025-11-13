import React from "react";
import styles from "./VideoSection.module.css";

export default function VideosSection({ mainVideo, sidebarVideos }) {
  return (
    <div className={styles.videosContainer}>
      <div className={styles.videosHeader}>
        <h2 className={styles.sectionTitle}>Видео</h2>
        <button className={styles.viewAllButton}>Смотреть все</button>
      </div>
      <div className={styles.videosLayout}>
        <a href="#" className={styles.mainVideoCard}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.playIcon}></div>
          </div>
          <h3 className={styles.videoTitle}>{mainVideo.title}</h3>
          <p className={styles.videoMeta}>{mainVideo.meta}</p>
        </a>
        <div className={styles.sidebarVideos}>
          {sidebarVideos.map((vid, i) => (
            <a key={i} href="#" className={styles.sidebarVideoItem}>
              <div className={styles.videoPlaceholder}></div>
              <div className={styles.videoDetails}>
                <h4 className={styles.videoTitle}>{vid.title}</h4>
                <p className={styles.videoMeta}>{vid.meta}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
