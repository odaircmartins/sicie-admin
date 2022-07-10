import { useState } from "react";
import styled from "styled-components";

import Navbar from "./Navbar";
import Header from "./Header";

const Grid = styled.div`
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr;

    main{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 37px 0 0 30px;
        flex-direction: column;        
    }
`

const GridNav = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
    background: #fff;
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

