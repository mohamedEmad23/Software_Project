import React from 'react';
import './Homepage.css';
import img1 from '../../Images/p3.png';
import icon1 from '../../Icons/menu-white.svg';
import icon2 from '../../Icons/user-white.svg';
import videoSrc from '../../videos/3.mp4';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <nav className="navbar bg-body-tertiary text-center" style={{backgroundColor: "transparent !important"}}>
                <div className="container-fluid w-100">
                    <div className="row w-100">
                        <div className="col-6 px-5 d-flex justify-content-start align-items-center ">
                            <button className="navbar-toggler me-auto" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <img src={icon2} alt="" width="20" height="20" className="d-inline-block align-top"/>
                            </button>
                        </div>
                        <div className="col-6 d-flex justify-content-end align-items-center">
                            <Link to="/LoginPage" className="navbar-brand mb-0 h1 ms-auto">
                                <img src={icon1} alt="" width="20" height="20" className="d-inline-block align-top"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="col-4 d-flex justify-content-center align-items-center">
                <Link to="/" className="navbar-brand mb-0 h1">
                    <img src={img1} alt="" width="100" height="100" className="d-inline-block align-top"/>
                </Link>
            </div>
            <div className="container-fluid p-0 m-0">
                <div className="video-background p-0 m-0">
                    <video playsInline="playsinline" height="700" width="1519" autoPlay="autoplay" muted="muted"
                           loop="loop">
                        <source src={videoSrc} type="video/mp4"/>
                    </video>
                    <div className="video-overlay" style={{color: "aqua"}}></div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;