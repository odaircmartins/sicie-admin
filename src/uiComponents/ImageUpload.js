import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";
import { styled as muiStyled } from '@mui/material/styles';

const UploadArea = styled.div`
    width: 100%;
    height: 390px;
    border-radius: 5px;
    position: relative;
    text-align: center;
    float: left;
    background-color: #fff;
    border: 1px solid #cecece;

    &:hover {
        border: 1px solid var(--upload-image-color);
    }
`

const ImageUploaded = styled.img`
    width: 100%;
    height: 100%;
    border-radius:5px;
`

const SpanTitle = styled.span`
    width: 100%;
    margin-top: 100px;
    font-size: 16px;
    color: #757575;
    float: left;
`

const SpanDetail = styled.span`
    width: 100%;
    margin-top: 1px;
    font-size: 11px;
    line-height: 2;
    color: #757575;
`

const SpanIcon = styled.span`
    height: 30px;
    width: 100%;
    margin-top: 10px;
    float: left;
`

const Input = muiStyled('input')({
    display: 'none'
});

const DeleteIconStyled = muiStyled(DeleteIcon)({
    display: 'block',
    position: 'absolute',
    bottom: 10,
    left: 0, right: 0,
    margin: 'auto',
    zIndex: 999,
    color: '#fff'
});

function ImageUpload({ title, setProps, value, id }) {

    const handleUploadBanner = (e) => {
        
        let file = e.target.files[0];
        
        if (file) {
            const extensionsAllowed = /(.jpg|.jpeg|.png|.gif)$/i;
            
            if(!extensionsAllowed.exec(file.name)){
                alert('Selecione uma imagem e com os formatos JPG, JPEG, GIF ou PNG');
                return;
            }
            
            const size = Math.round((file.size / 1024));

            if(size > 200){
                alert('O arquivo selecionado tem ' + size + 'kb e tamanho máximo aceito é 200 Kb.');
                return;
            }

            let url = window.URL || window.webkitURL;
            let img = new Image();
            let objectUrl = url.createObjectURL(file);
        
            img.onload = function(){

                if(this.width !== 1280 || this.height !== 540){
                    alert('O arquivo selecionado tem ' + this.width + ' X ' + this.height + ' pixels, mas o formato aceito é apenas 1280 X 540 pixels.');
                    return;
                }
    
                const reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = function (event) {
                    const imageBase64 = `data:${file.type};base64,${btoa(event.target.result)}`;
                    setProps(imageBase64);
                };
    
                reader.onerror = function () {
                    alert("Falha ao ler o arquivo. Favor tentar outro ou contate o administrador.");
                };   

                url.revokeObjectURL(objectUrl);
            }
        
            img.src = objectUrl;         
        }
    }

    const handleEraseBanner = (e) => {
        setProps('');
    }

    return (
        <UploadArea value={value}>
            {value !== '' ?
                <>
                    <ImageUploaded src={value} />
                    <DeleteIconStyled onClick={handleEraseBanner} />
                </>
                :
                <>
                    <SpanTitle>
                        {title}
                    </SpanTitle>
                    <SpanDetail>
                        Somente JPG, GIF e PNG - Tamanho 1280 x 540 - Até 200 Kb
                    </SpanDetail>
                    <SpanIcon>
                        <label htmlFor={id} onChange={handleUploadBanner}>
                            <Input accept="image/*" id={id} type="file" />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <UploadIcon sx={{ color: "var(--upload-image-color)" }} />
                            </IconButton>
                        </label>
                    </SpanIcon>
                </>
            }
        </UploadArea>
    );
}

export default ImageUpload;