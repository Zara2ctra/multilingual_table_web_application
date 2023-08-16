import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import LanguageButton from "./LanguageButton.js"

const NavBar = observer(() => {
    const {user} = useContext(Context);

    return (
        <Navbar bg="black" data-bs-theme="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={"/"}>
                    Task 5
                </NavLink>
                <Nav className="ml-auto" style={{color: 'white'}}>
                    {["en", "de", "ru"].map((locale) =>
                        <LanguageButton key={locale} locale={locale} user={user} />
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
});

export default NavBar;