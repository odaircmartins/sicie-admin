import styled from "styled-components";
import { useState, useContext} from "react";

import { breakpoints as bp } from "../config/globalStyle";
import NavLink from "./navbar/NavLink";
import Backdrop from "./Backdrop";
import Logo from './navbar/Logo';
import NavLinksGroup from "./navbar/NavLinksGroup";
import NavToggle from "./navbar/NavToggle";

import { Context } from "../context/authContext";

const StyledNav = styled.nav`
    background-color: black;
    width: ${p => p.compact ? "70px" : "var(--navbar-width)"};
    height: 100vh;
    position: relative;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transition-property: width, transform !important;
    transition-duration: 0.3s !important;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1) !important;

    &::before{
        content:"";
        background-color: rgba(var(--color-secondary-rgb), .2);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    @media(max-width: ${bp.desktop}){
        position: fixed;
        transform: translate3d(${p => p.visible ? 0 : "calc(var(--navbar-width) *-1)"}, 0, 0);
        transition: transform .3s ${p => p.visible ? "cubic-bezier(0.4, 0, 1, 1)" : "cubic-bezier(0, 0, 0.2, 1)"} !important;
    }
    
`;

function Navbar(props){
    const [compact, setCompact] = useState(0);
    const { handleLogout } = useContext(Context);

    return(
        <>
            <Backdrop visible={props.visible} onClick={props.close}/>
            <StyledNav compact={compact} {...props}>
                <Logo  compact={compact}/>
                <NavLinksGroup compact={compact}/>
                <NavLink compact={compact} onClick={ handleLogout } iconClassName="fas fa-sign-out-alt" label="Sair"/>
                <NavToggle compact={compact} setCompact={setCompact}/>
            </StyledNav>
        </>
    );
}

export default Navbar;