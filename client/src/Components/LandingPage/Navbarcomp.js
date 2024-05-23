import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logoim from '../src/assets/293 x 267-01 1.png';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import "./Navbar.css";
const AppBar = () => {
    return (
        <>
            <Navbar className='navcontent sticky-top' expand="lg" >
                <Container>
                    <Navbar.Brand href="#home"><img src={Logoim} className='logim' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
                        <Nav>
                            <Nav.Link href='#landing' className='fw-bold text-light'>HOME</Nav.Link>
                            <Nav.Link href='#procedure' className='fw-bold text-light'>ABOUT</Nav.Link>
                            <Nav.Link href='#our' className='fw-bold text-light' >STORY</Nav.Link>
                            <Nav.Link href="#concept" className='fw-bold text-light'>EVOLUTION</Nav.Link>
                            <Nav.Link href="#community" className='fw-bold text-light'>COMMUNITY</Nav.Link>
                        </Nav>
                        <Nav className='ms-auto'>
                            <Nav.Link>
                                <button className='btn btn-light rounded-1'>Login</button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>  
        </>
    )
}

export default AppBar;