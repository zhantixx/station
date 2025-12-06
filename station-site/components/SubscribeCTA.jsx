"use client";

import React, { useState } from 'react';

export default function SubscribeCTA({ title, description }) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email) {
            alert('Пожалуйста, введите ваш Email.'); 
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            console.log(`Email для подписки отправлен: ${email}`);
            
            setIsLoading(false);
            setIsSubmitted(true);
            
            setTimeout(() => {
                setEmail('');
                setIsSubmitted(false);
            }, 5000); 
            
        }, 1500); 
    };

    return (
        <div className="container my-5">
            <div className="p-4 p-md-5 rounded-4 bg-primary text-white shadow-lg"> 
                <div className="row align-items-center">
                    
                    <div className="col-lg-5 col-xl-6 mb-4 mb-lg-0 pe-lg-4">
                        <h2 className="h1 fw-bolder mb-2">{title}</h2>
                        <p className="lead opacity-75">{description}</p>
                    </div>

                    <div className="d-none d-lg-block col-lg-1 border-end border-3 border-light opacity-50" style={{ height: '100px' }}></div>

                    <div className="col-lg-6 col-xl-5 ps-lg-4">
                        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                            
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-envelope-fill text-primary"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control border-start-0"
                                    placeholder="Ваш Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading || isSubmitted}
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="btn btn-warning btn-lg text-dark fw-bold w-100" 
                                disabled={isLoading || isSubmitted}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Загрузка...
                                    </>
                                ) : isSubmitted ? (
                                    '✅ Подписано'
                                ) : (
                                    'Подписаться'
                                )}
                            </button>
                        </form>
                        
                        {isSubmitted && (
                            <p className="fw-bold text-light mt-3 mb-0 text-center bg-success rounded p-2">
                                Вы успешно подписались!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}