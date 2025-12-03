"use client";

import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const inputStyle = {
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: 'none',
};

export default function EditorApplicationModal({ show, handleClose, handleSubmit, username, email }) {
    const [motivation, setMotivation] = useState('');
    const [expertise, setExpertise] = useState('');
    const [error, setError] = useState('');

    const handleInternalSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (motivation.length < 50) {
            setError('Пожалуйста, заполните все поля. Мотивация должна быть не менее 50 символов.');
            return;
        }
        
        if (expertise.length < 10) {
             setError('Пожалуйста, заполните все поля. Область экспертизы должна быть не менее 10 символов.');
             return;
        }

        handleSubmit({ username, email, motivation, expertise });
        
        setMotivation('');
        setExpertise('');
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title className="text-dark fw-bold" style={{ fontSize: '1.5rem' }}>
                    <span className="me-2">📝</span> Заявка на Редактора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 pt-0">
                <Alert variant="info" className="small">
                    Заявки рассматриваются. В демо-режиме одобрение произойдет через 5 секунд после отправки.
                </Alert>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleInternalSubmit}>
                    
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-muted">Ваш логин</Form.Label>
                        <Form.Control type="text" value={username} disabled style={inputStyle} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="expertise">
                        <Form.Label className="fw-semibold text-dark">Область экспертизы (Темы)</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Например: Политика, IT, Спорт, Культура"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="motivation">
                        <Form.Label className="fw-semibold text-dark">Мотивационное письмо (Мин. 50 символов)</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={4}
                            placeholder="Расскажите, почему вы подходите на роль редактора..."
                            value={motivation}
                            onChange={(e) => setMotivation(e.target.value)}
                            required
                            style={inputStyle}
                        />
                         <Form.Text className="text-muted">
                            Текущая длина: {motivation.length} символов.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2 fw-bold" style={{ borderRadius: '50px' }}>
                        Отправить Заявку
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}