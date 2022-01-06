import React, { useState } from "react";

import api from "../config/api";
import history from "../config/history";

const CreateEvent = () => {
    const [formValues, setFormValues] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    };

    const handleSubmit = (e) => {  
        e.preventDefault();

        api.post( '/events', formValues)
            .then(response => {
                if(response.status === 201) alert("Evento criado com sucesso");
                console.log(response.data);
            })
            .catch(error => {
                alert("Dados inválidos");
                console.log(error);
            });
    }

    const handleGoToPanel = () => {
        history.push('/home');
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                        <h2>Criar Evento</h2>
                    </legend>
                    <div>
                        <label> Valido de:
                            <input type="text" name="validFrom" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Valida ate:
                            <input type="text" name="validUntil" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Nome:
                            <input type="text" name="name" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Categoria:
                            <select name="category" onChange={handleInputChange || ''}>
                                <option value="Cartódromo" >Cartódromo</option>
                                <option value="Autódromo">Autódromo</option>
                                <option value="Arrancada">Arrancada</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label> Resumo:
                            <input type="text" name="summary" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Banner:
                            <input type="text" name="banner" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Imagens:
                            <input type="text" name="images" onChange={handleInputChange || '["image1.png", "imagem2.png"]'}/>
                        </label>
                    </div>
                    <div>
                        <label> Está ativo:
                            <input type="radio" name="isActive" value="true" onChange={handleInputChange || 'true'}/> Sim<br />
                            <input type="radio" name="isActive" value="false" onChange={handleInputChange || 'true'}/> Não<br />
                        </label>
                    </div>
                    <div>
                        <label> Preço Evento:
                            <input type="text" name="eventTicket" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Preço Estacionamento Carro:
                            <input type="text" name="carParkingTicket" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Preço Estacionamento Moto:
                            <input type="text" name="motoParkingTicket" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <label> Número de parcelas:
                            <input type="text" name="installments" onChange={handleInputChange || ''}/>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Enviar</button>
                        <button onClick={handleGoToPanel}>Voltar</button>
                    </div>
                </fieldset>
            </form>                      
        </div>
    )
}

export default CreateEvent;