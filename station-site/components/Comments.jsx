"use client";

import { useState } from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { users } from "../app/data/users";

export default function Comments({ initialComments }) {
  const [comments, setComments] = useState(
    initialComments.map((c, index) => ({ ...c, id: index + 1 }))
  );
  const [text, setText] = useState("");

  const addComment = () => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      userId: null,
      name: "Вы",
      date: "Только что",
      avatar: "/image/profile.png",
      text,
    };

    setComments([newComment, ...comments]);
    setText("");
  };

  return (
    <section className="container my-4">
      <div className="d-flex mb-4 gap-3">
        <img src="/image/profile.png" className="rounded-circle" width={50} height={50} alt="avatar" />
        <div className="flex-grow-1 d-flex flex-column">
          <textarea
            className="form-control mb-2"
            placeholder="Написать комментарий..."
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary align-self-start" onClick={addComment}>
            Отправить
          </button>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {comments.map((c) => {
          const user = users.find(u => u.id === c.userId);
          return (
            <div key={c.id} className="d-flex gap-3">
              <img src={c.avatar} className="rounded-circle" width={50} height={50} alt={c.name} />
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-1">
                  {user ? (
                    <Link href={`/users/${user.id}`} className="fw-bold">
                      {user.name}
                    </Link>
                  ) : (
                    <strong>{c.name}</strong>
                  )}
                  <small className="text-muted">{c.date}</small>
                </div>
                <p className="mb-0">{c.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
