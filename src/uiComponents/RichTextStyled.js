import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import styled from "styled-components";

const RichTextArea = styled.div`
    width: 100%;
    min-height: 300px;
    border-radius: 5px;
    position: relative;
    float: left;
    padding-left: 15px;
    background-color: #fff;
    border: 1px solid #cecece;
`

const customTheme = createTheme({}); 

function RichTextStyled(props) {
    return (
        <RichTextArea>
            <ThemeProvider theme={customTheme}>
                <MUIRichTextEditor {...props} />
            </ThemeProvider>
        </RichTextArea>
    );
}

export default RichTextStyled;