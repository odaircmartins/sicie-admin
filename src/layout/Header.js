import styled from "styled-components";

import { breakpoints as bp } from "../config/globalStyle";

const Grid = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  height: 48px;
  align-items: stretch;
  padding: 0 24px;
  > div {
    display: flex;
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
`;

function Header({ toggle }) {
  return (
    <Grid>
      <div onClick={toggle}>
        <i className="fas fa-bars" />
      </div>

      <div className="mid"></div>
      <div>
        info
      </div>
    </Grid>
  );
}

export default Header;