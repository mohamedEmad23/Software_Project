import React from 'react';
import './AboutPage.css';
import img1 from '../../Images/c1.jpg';

const AboutPage = () => {
    return (
        <div className="about-page-specific">
            <div className="text-center">
                <h1 className="title-specific">About Porsche:</h1>
            </div>

            <div className="p-2">
                <div className="row">
                    <div className="col-md-6">
                        <p className="about-text">The origin story of Porsche, the iconic car manufacturer, dates back to 1948 when Ferdinand Porsche unveiled
                            the first-ever Porsche vehicle, the Porsche 356. However, the roots of the company stretch further back to the
                            early 20th century when Ferdinand Porsche, an Austrian automotive engineer, founded his own engineering consultancy.
                            His expertise in automotive design and engineering led to significant contributions to the development of various high-performance vehicles, including the Volkswagen Beetle.
                            After World War II, Ferdinand's son, Ferry Porsche, spearheaded the creation of the Porsche 356, which embodied the family's vision of combining performance, elegance, and precision engineering.
                            With its distinctive design and exceptional driving dynamics, the Porsche 356 laid the foundation for Porsche's enduring legacy as a premier sports car manufacturer.</p>
                    </div>
                    <div className="col-md-6">
                        <img src={img1} className="about-image d-block w-100" alt="Porsche 356" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;