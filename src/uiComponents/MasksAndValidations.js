// REGEX
// Informação ente / / significa instrução regex
// \D aceita somente números e \d aceita somente letras
// g significa global (vai olhar a string por completo)
// () significa grupo de captura e no replace vai ser $1, $2, etc.
// \d{3} significa identificar grupo de 3 números
// \d{1,2} significa identificar grupor de 1 OU 2 números

export const cpfMask = value => {
  let valueString = value.toString();
  return valueString
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const zipcodeMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1') 
};

export const rgMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{10})\d+?$/, '$1') 
};

export const cellphoneMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1') 
};

export const creditCardMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1') 
};

export const dueDateMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\d+?$/, '$1') 
};

export const cvcMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})\d+?$/, '$1') 
};

export const nameMask = value => {
  return value
    .replace(/\d/g, '')
    .replace(/(\d{3})\d+?$/, '$1') 
};

export const emailValidation = email => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
  return regex.test(email);
};

export const removeMask = value => {
  let valueWithoutMask = value.replace('.','');
  valueWithoutMask = valueWithoutMask.replace('.','');
  valueWithoutMask = valueWithoutMask.replace('-','');
  valueWithoutMask = valueWithoutMask.replace('(','');
  valueWithoutMask = valueWithoutMask.replace(')','');
  valueWithoutMask = valueWithoutMask.replace(' ','');
  valueWithoutMask = valueWithoutMask.replace(' ','');
  valueWithoutMask = valueWithoutMask.replace(' ','');

  return valueWithoutMask;
};

export const currencyMask = value => {
  if (value === '' || value === undefined) {
    return '';
  } else{
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }
};

export const dateMask = timestamp => {

  const date = new Date(timestamp);

  const day = date.getDate();
  const dayFormated = day < 10 ? '0' + day : day;

  const month = date.getMonth() + 1;
  const monthFormated = month < 10 ? '0' + month : month;

  const yearFormated = date.getFullYear() - 2000;

  return dayFormated + "/" + monthFormated + "/" + yearFormated;
};