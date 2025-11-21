"use client";

import { useState } from "react";
import styles from "./Comments.module.css";

export default function Comments({ initialComments }) {
  const [comments, setComments] = useState(
    initialComments.map((c, index) => ({
      ...c,
      id: index + 1 // если нет id — создаём временный
    }))
  );

  const [text, setText] = useState("");

  const addComment = () => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),            // генерируем уникальный id
      name: "User",
      date: "Just now",
      avatar: "/image/user_avatar.png",
      text,
    };

    setComments([newComment, ...comments]);
    setText("");
  };

  return (
    <section id="comments-section" className={styles.commentsSection}>
      {/* Input Area */}
      <div className={styles.commentInputArea}>
        <img src="/image/user_avatar.png" className={styles.commentUserAvatar} />

        <div className={styles.inputFormContainer}>
          <textarea
            className={styles.commentTextarea}
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button className={styles.postCommentButton} onClick={addComment}>
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
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
