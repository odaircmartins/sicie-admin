import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: var(--fsize-7);
  font-weight: 700;
  color: var(--color-two);
  min-height: 48px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  border-bottom: var(--color-two) 1px solid;
  
  &:hover {
    text-decoration: none;
    color: #3f3f3f;
  }

  span {
    margin-left: 16px;
    font-weight: 500;
    color: black;
    opacity: ${p => Number(!p.compact)};
    transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
  }
`;

function Logo(props) {
  return (
    <StyledLink {...props} to="/">
      S<span>sicie</span>
    </StyledLink>
  );
}

export default Logo;