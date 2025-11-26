"use client";

import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SportPosts({ posts, isStream }) {
  return (
    <div className="container my-4">
      <div className="row g-4">
        {posts.map((post) => (
          <div key={post.id} className={isStream ? "col-12" : "col-md-6 col-lg-4"}>
            <Link href={`/sports/${post.id}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  {isStream ? (
                    <div className="bg-secondary d-flex justify-content-center align-items-center" style={{height: '200px'}}>
                      <span className="text-white fs-2">▶</span>
                    </div>
                  ) : (
                    post.img && (
                      <img
                        src={post.img}
                        className="card-img-top"
                        alt={post.title}
                        style={{objectFit: 'cover', height: '200px'}}
                      />
                    )
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <div className="text-muted small mb-2 d-flex gap-2">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="card-text text-truncate" style={{WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                    {post.text}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
