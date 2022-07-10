import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    min-height: 48px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    font-size: 1rem;
    font-weight: 400;
    color: #3f3f3f;
    margin: 0px 0px 8px;
    box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.1);
    border-radius: 9px;

    i {
        min-height: 22px;
        min-width: 22px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    span {
        padding-left: 14px;
        line-height: 19px;
        white-space: nowrap;
        opacity: ${(p) => Number(!p.compact)};
        transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
    }

    &:hover {
        text-decoration: none;
        background-color: #eeeeee;
        color: #3f3f3f;
    }

    &.active {
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        appearance: none;
        display: flex;
        -webkit-box-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        align-items: center;
        position: relative;
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        text-align: left;        
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;      
        color: white;
        background-color: var(--color-one);
    }
`;

function NavLink({children, iconClassName, label, ...rest}) {
    return (
        <StyledLink to="" {...rest}>
            {children ||
                <>
                    <i className={iconClassName}/>
                    <span className="label">{label}</span>
                </>
            }
        </StyledLink>
    );
}

export default NavLink;

