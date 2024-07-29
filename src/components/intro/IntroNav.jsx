import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
`;

const Brand = styled.a`
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    text-decoration: none;
`;

const Toggler = styled.button`
    background: none;
    border: none;
    font-size: 1.25rem;
`;

const Collapse = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 992px) {
        display: none;
    }
`;

const NavList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    margin-left: 2rem;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: #000;
    font-size: 1rem;

    &:hover {
        color: #0056b3;
    }
`;

const Button = styled.button`
    background-color: #0056b3;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 0.5rem 1rem;
    font-size: 1rem;

    &:hover {
        background-color: #004494;
    }
`;

const Icon = styled.i`
    margin-right: 0.5rem;
`;

const IntroNav = () => {
    return (
        <Navbar>
            <Container>
                <Brand href="/">Gangwon-GO!</Brand>
                <Toggler type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu <i className="bi-list"></i>
                </Toggler>
                <Collapse id="navbarResponsive">
                    <NavList>
                        <NavItem><NavLink to="/introduce">소개</NavLink></NavItem>
                        <NavItem><NavLink as="a" target="_blank" href="https://www.instagram.com/low_o80">인스타그램</NavLink></NavItem>
                    </NavList>
                    <Button data-bs-toggle="modal" data-bs-target="#feedbackModal">
                        <Icon className="bi-chat-text-fill" />
                        <span>Contact Us</span>
                    </Button>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default IntroNav;
