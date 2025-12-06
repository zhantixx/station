"use client";

import React, { useState, useMemo } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Dropdown, DropdownButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const getHourlyDataForDay = (tempBase, icon) => {
    const hours = ["0:00", "3:00", "6:00", "9:00", "12:00", "15:00", "18:00", "21:00"];
    return hours.map((time, i) => ({
        time,
        temp: tempBase + Math.floor(Math.random() * 5 - 2), 
        icon: (i >= 5 && tempBase < 5) ? '🌙' : icon
    }));
};

const CITIES_DATA = {
    Astana: {
        city: "Астана",
        current: { 
            temp: 5, feelsLike: 1, condition: "Облачно с прояснениями", wind: 15, humidity: 65, pressure: 750, uvIndex: 3, sunrise: "08:15", sunset: "17:30", icon: "☁️" 
        },
        keyMetrics: {
            airQuality: "Умеренный (55 AQI)",
            pop: "15%",
            visibility: "10 км",
            summary: "Сохраняется переменная облачность. Условия для прогулок хорошие."
        },
        hourly: [
            { time: "9:00", temp: 3, icon: "☁️" }, { time: "12:00", temp: 7, icon: "☀️" }, { time: "15:00", temp: 9, icon: "☀️" }, { time: "18:00", temp: 5, icon: "🌥️" }, 
            { time: "21:00", temp: 2, icon: "🌙" }, { time: "0:00", temp: -1, icon: "🌙" }, { time: "3:00", temp: -3, icon: "☁️" },
        ],
        weekly: [
            { day: "Четверг", max: 8, min: 2, icon: "🌥️", condition: "Переменная облачность" },
            { day: "Пятница", max: 10, min: 4, icon: "☀️", condition: "Солнечно" },
            { day: "Суббота", max: 5, min: -1, icon: "❄️", condition: "Небольшой снег" },
            { day: "Воскресенье", max: 0, min: -5, icon: "❄️", condition: "Мороз и снег" },
            { day: "Понедельник", max: 3, min: -2, icon: "☁️", condition: "Пасмурно" },
            { day: "Вторник", max: 7, min: 1, icon: "☀️", condition: "Ясно" },
            { day: "Среда", max: 12, min: 5, icon: "🌞", condition: "Потепление" },
        ]
    },
    Almaty: {
        city: "Алматы",
        current: { 
            temp: 12, feelsLike: 10, condition: "Ясно, без осадков", wind: 5, humidity: 55, pressure: 700, uvIndex: 7, sunrise: "07:50", sunset: "18:10", icon: "☀️" 
        },
        keyMetrics: {
            airQuality: "Хороший (30 AQI)",
            pop: "0%",
            visibility: "20 км",
            summary: "День будет солнечным и теплым, осадков не ожидается."
        },
        hourly: [
            { time: "9:00", temp: 8, icon: "☀️" }, { time: "12:00", temp: 13, icon: "☀️" }, { time: "15:00", temp: 15, icon: "☀️" }, { time: "18:00", temp: 10, icon: "🌥️" },
            { time: "21:00", temp: 6, icon: "🌙" }, { time: "0:00", temp: 3, icon: "🌙" }, { time: "3:00", temp: 2, icon: "☁️" },
        ],
        weekly: [
            { day: "Четверг", max: 15, min: 8, icon: "☀️", condition: "Солнечно" },
            { day: "Пятница", max: 14, min: 7, icon: "🌥️", condition: "Переменная облачность" },
            { day: "Суббота", max: 10, min: 5, icon: "🌧️", condition: "Дождь" },
            { day: "Воскресенье", max: 9, min: 3, icon: "🌧️", condition: "Сильный дождь" },
            { day: "Понедельник", max: 12, min: 5, icon: "☀️", condition: "Ясно" },
            { day: "Вторник", max: 17, min: 9, icon: "🌞", condition: "Потепление" },
            { day: "Среда", max: 16, min: 10, icon: "☀️", condition: "Ясно" },
        ]
    }
};

export default function WeatherPage() {
    const [selectedCityKey, setSelectedCityKey] = useState('Astana');
    
    const weatherData = useMemo(() => CITIES_DATA[selectedCityKey] || CITIES_DATA['Astana'], [selectedCityKey]);

    const currentTemp = weatherData.current.temp;
    const isCold = currentTemp < 0;
    const primaryColor = isCold ? '#4dd0e1' : '#1e88e5';
    const secondaryColor = isCold ? '#00bcd4' : '#42a5f5';
    const accentColor = isCold ? '#0097a7' : '#1565c0';

    const currentTime = '12:00'; 
    
    const handleCitySelect = (key) => {
        setSelectedCityKey(key);
    };

    const MetricItem = ({ icon, title, value, badgeVariant = "primary" }) => (
        <Col xs={6} md={3} className="mb-3">
            <Card className="text-center h-100 shadow-sm border-0">
                <Card.Body className="p-3">
                    <div style={{ fontSize: '1.5rem', color: accentColor }}>{icon}</div>
                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>{title}</p>
                    <Badge bg={badgeVariant} className="text-white fw-bold py-1 px-2">{value}</Badge>
                </Card.Body>
            </Card>
        </Col>
    );

    const CityHeader = ({ cityName, selectedKey, onSelect }) => (
        <Row className="mb-4 align-items-center">
            <Col className="d-flex justify-content-between align-items-center">
                <h1 className="fw-bolder mb-0" style={{ color: primaryColor, fontSize: '2.5rem' }}>
                    {cityName}
                </h1>
                <DropdownButton
                    id="city-selector-dropdown"
                    title={`Город ${cityName}`}
                    variant="primary"
                    onSelect={onSelect}
                    size="sm"
                >
                    {Object.keys(CITIES_DATA).map(key => (
                        <Dropdown.Item
                            key={key}
                            eventKey={key}
                            active={key === selectedKey}
                        >
                            {CITIES_DATA[key].city}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </Col>
        </Row>
    );

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            <Header />

            <Container className="my-5 flex-grow-1">
                
                <CityHeader
                    cityName={weatherData.city}
                    selectedKey={selectedCityKey}
                    onSelect={handleCitySelect}
                />
                
                <Card 
                    id="current"
                    className="shadow-lg mb-4 border-0" 
                    style={{ 
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`, 
                        color: 'white', 
                        borderRadius: '20px' 
                    }}
                >
                    <Card.Body className="p-4 p-md-5">
                        <Row className="align-items-center justify-content-center">
                            <Col xs={12} md={5} className="text-center text-md-start mb-4 mb-md-0">
                                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                                    <div style={{ fontSize: '7rem', lineHeight: '1', marginRight: '20px' }}>
                                        {weatherData.current.icon}
                                    </div>
                                    <h2 className="fw-bolder" style={{ fontSize: '6rem', margin: 0 }}>
                                        {currentTemp}°
                                    </h2>
                                </div>
                                <p className="mb-0 fw-bold mt-2" style={{ fontSize: '1.5rem' }}>
                                    {weatherData.current.condition}
                                </p>
                                <p className="mb-0 opacity-75 mt-1" style={{ fontSize: '1.1rem' }}>
                                    Ощущается как: {weatherData.current.feelsLike}°
                                </p>
                            </Col>
                            
                            <Col xs={12} md={5}>
                                <ListGroup variant="flush" style={{ fontSize: '1.1rem' }}>
                                    <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between">
                                        Ветер: 
                                        <Badge bg="light" className="text-primary fw-bold">{weatherData.current.wind} км/ч</Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between">
                                        Влажность: 
                                        <Badge bg="light" className="text-primary fw-bold">{weatherData.current.humidity}%</Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between">
                                        Давление: 
                                        <Badge bg="light" className="text-primary fw-bold">{weatherData.current.pressure} мм рт. ст.</Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between">
                                        УФ-индекс: 
                                        <Badge bg="warning" className="text-dark fw-bold">{weatherData.current.uvIndex}</Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between">
                                        Восход: 
                                        <span className="fw-bold">{weatherData.current.sunrise} </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between">
                                        Заход: 
                                        <span className="fw-bold">{weatherData.current.sunset} </span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <h3 className="fw-bold mb-3" style={{ color: accentColor }}>
                    Ключевые показатели
                </h3>
                <Card className="shadow-sm border-0 mb-5 p-3" style={{ borderRadius: '15px' }}>
                    <Card.Body className="p-2">
                        <p className="text-center fw-bold mb-3" style={{ color: primaryColor }}>
                            {weatherData.keyMetrics.summary}
                        </p>
                        <Row className="text-center">
                            <MetricItem 
                                icon="💨" 
                                title="Качество воздуха" 
                                value={weatherData.keyMetrics.airQuality} 
                                badgeVariant={weatherData.keyMetrics.airQuality.includes("Умеренный") ? "warning" : "success"}
                            />
                            <MetricItem 
                                icon="💧" 
                                title="Вероятность осадков" 
                                value={weatherData.keyMetrics.pop} 
                                badgeVariant={weatherData.keyMetrics.pop === "0%" ? "success" : "info"}
                            />
                            <MetricItem 
                                icon="👁️" 
                                title="Видимость" 
                                value={weatherData.keyMetrics.visibility} 
                            />
                            <MetricItem 
                                icon="🌡️" 
                                title="Ощущается" 
                                value={`${weatherData.current.feelsLike}°C`}
                                badgeVariant={isCold ? "info" : "danger"}
                            />
                        </Row>
                    </Card.Body>
                </Card>

                <h3 className="fw-bold mb-3" style={{ color: accentColor }}>
                    Прогноз на сегодня (По часам)
                </h3>
                <Row className="flex-nowrap overflow-x-scroll g-3 mb-5 pb-2">
                    {weatherData.hourly.map((hour, index) => {
                        const isCurrentTime = hour.time === currentTime;
                        return (
                            <Col key={index} xs={4} sm={3} md={2} style={{ minWidth: '130px' }}>
                                <Card 
                                    className={`text-center shadow-sm h-100 ${isCurrentTime ? 'border-' + (isCold ? 'info' : 'primary') : 'border-light'}`}
                                    style={{ 
                                        borderRadius: '15px',
                                        backgroundColor: isCurrentTime ? '#e3f2fd' : 'white',
                                    }}
                                >
                                    <Card.Body className="py-3 px-2">
                                        <p className={`mb-1 fw-bold ${isCurrentTime ? 'text-primary' : 'text-muted'}`}>
                                            {isCurrentTime ? 'Сейчас' : hour.time}
                                        </p>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '5px' }}>
                                            {hour.icon}
                                        </div>
                                        <p className="mb-0 fw-bold" style={{ fontSize: '1.3rem', color: accentColor }}>
                                            {hour.temp}°C
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                <h3 id="weekly" className="fw-bold mb-3" style={{ color: accentColor }}>
                    Прогноз на 7 дней
                </h3>
                <Row className="g-3">
                    {weatherData.weekly.map((day, index) => (
                        <Col key={index} xs={12} lg={6}>
                            <Card 
                                className="shadow-sm border-0 h-100"
                                style={{ borderRadius: '15px' }}
                            >
                                <Card.Body className="py-3 px-4 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div style={{ fontSize: '2rem', marginRight: '15px' }}>{day.icon}</div>
                                        <div>
                                            <p className="mb-0 fw-bold">{day.day}</p>
                                            <small className="text-muted">{day.condition}</small>
                                        </div>
                                    </div>
                                    <div className="fw-bold d-flex align-items-center">
                                        <span className="text-primary" style={{ fontSize: '1.1rem' }}>{day.max}°</span>
                                        <span className="text-muted ms-2">{day.min}°</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            
            <Footer />
        </div>
    );
}