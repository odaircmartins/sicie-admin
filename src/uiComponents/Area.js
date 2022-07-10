import styledComponent from "styled-components";

const AreaStyled = styledComponent.div`
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow: hidden;
    max-width: 95%;
    border-radius: 10px;
    padding: 25px 15px 25px 15px;
    margin: 20px 0 30px 0;
    box-shadow: rgba(90, 114, 123, 0.11) 0px 7px 30px 0px;
    `;

function Area(props) {
    return (
        <AreaStyled {...props}/>
    );
}

export default Area;