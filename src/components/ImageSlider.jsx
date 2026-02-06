import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageSlider.css';

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1511385641857-b1effc8c5144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Comunidad de Fe'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Momento de Adoración'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Creyendo Juntos'
        }
    ];

    // Auto cambio de slide cada 4 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="image-slider">
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img src={slide.image} alt={slide.title} />
                        <div className="slide-overlay"></div>
                        <div className="slide-title">{slide.title}</div>
                    </div>
                ))}
            </div>

            {/* Botones de navegación */}
            <button className="slider-button prev" onClick={handlePrev}>
                <ChevronLeft size={24} />
            </button>
            <button className="slider-button next" onClick={handleNext}>
                <ChevronRight size={24} />
            </button>

            {/* Indicadores de puntos */}
            <div className="slider-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
