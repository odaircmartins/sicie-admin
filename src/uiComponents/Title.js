import styledComponent from "styled-components";

const TitleStyle = styledComponent.div`
    h3{
        color: var(--color-gray-light);
        margin: 0px;
        font-size: 1.875rem;
        font-family: var(--primary-font);
        font-weight: 700;
        line-height: 1.235;
    }

    h4 {
        margin: 0px;
        font-size: 1.125rem;
        line-height: 1.5;
        font-family: var(--primary-font);
        color: var(--color-gray);
        font-weight: 400;
    }
`

function Title(props) {
    return (
        <TitleStyle>
            <h4>{props.subtitle}</h4>
            <h3>{props.title}</h3>
        </TitleStyle>
    );
}

export default Title;