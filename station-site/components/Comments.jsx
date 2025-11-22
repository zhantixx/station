"use client";

import { useState } from "react";
import styles from "./Comments.module.css";

export default function Comments({ initialComments }) {
  const [comments, setComments] = useState(
    initialComments.map((c, index) => ({
      ...c,
      id: index + 1 
    }))
  );

  const [text, setText] = useState("");

  const addComment = () => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),            
      name: "Вы",
      date: "Только что",
      avatar: "/image/profile.png",
      text,
    };

    setComments([newComment, ...comments]);
    setText("");
  };

  return (
    <section id="comments-section" className={styles.commentsSection}>
      <div className={styles.commentInputArea}>
        <img src="/image/profile.png" className={styles.commentUserAvatar} />

        <div className={styles.inputFormContainer}>
          <textarea
            className={styles.commentTextarea}
            placeholder="Написать комментарий..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button className={styles.postCommentButton} onClick={addComment}>
            Отправить
          </button>
        </div>
      </div>

      <div className={styles.commentsList}>
        {comments.map((c) => (
          <div key={c.id} className={styles.commentItem}>
            <img src={c.avatar} className={styles.commentAuthorAvatar} />
            <div className={styles.commentContent}>
              <span className={styles.commentAuthorName}>{c.name}</span>
              <span className={styles.commentDate}>{c.date}</span>
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
