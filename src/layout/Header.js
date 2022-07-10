import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";

import { breakpoints as bp } from "../config/globalStyle";
import { useState } from "react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  height: 48px;
  align-items: stretch;
  padding: 0 30px;
  color: #949DB2;

  div {
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 1px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  button {
    white-space: nowrap;
  }

  i{
    display: none;
    @media(max-width: ${bp.desktop}) {
      display: inline;
    }
  }

  span{
    margin-left: 10px;
  }
`;

function Header({ toggle }) {
  const [user] = useState(JSON.parse(localStorage.getItem("email")));

  return (
    <Grid>
      <div onClick={toggle}>
        <i className="fas fa-bars" />
      </div>

      <div className="mid">
        <FaRegUser/>
        <span> {user} </span>
      </div>
    </Grid>
  );
}

export default Header;