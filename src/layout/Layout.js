import { useState } from "react";
import styled from "styled-components";

import Navbar from "./Navbar";
import Header from "./Header";

const Grid = styled.div`
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr;
`

const GridNav = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
    background: black;
    color: white;
`

function Layout({children, ...rest}) {
    const [showNav, setShowNav] = useState(0);
    const toggle = () => setShowNav(Number(!showNav));

    return (
        <Grid {...rest}>
            <GridNav>
                <Navbar visible = {showNav} close = {toggle}/>    
            </GridNav> 
            
            <Header toggle={toggle}/>
           
            <main>{children}</main>
        </Grid>
    );
}

export default Layout;

