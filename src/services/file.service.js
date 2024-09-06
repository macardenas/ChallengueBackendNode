import fetch from "node-fetch";

//Obtengo la lista de arachivos
export const ListFiles = async () => {
  try {
    let resp = await fetch('https://echo-serv.tbxnet.com/v1/secret/files', {
      'Content-Type': 'application/json',
      headers: { Authorization: 'Bearer aSuperSecretKey' }
    })

    if (!resp.ok) throw new Error('Peticion no exitosa');
    let json = await resp.json();
    return json;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

/*
* Example
* { files:[ 'test1.csv', 'test2.csv']}
*/
//Descargo los datos csv de cada archivo
export const DownloadFiles = (file) => {
  return new Promise((resolve) => {
    if (file && 'files' in file && file.files.length > 0) {
      try {
        fetchData(file).then((Data) => {
          resolve(Data);
        });
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }

    } else {
      resolve('Debe proporcionar datos para proporcionar tu solicitud');
    }

  })
}

//Busco los datos y espero a que termine con todos los archivos
const fetchData = async (files) => {
  try {
    let Data = [];
    const promises = files.files.map(async (csv) => {
      const resp = await fetch('https://echo-serv.tbxnet.com/v1/secret/file/' + csv, {
        'Content-Type': 'application/json',
        headers: { Authorization: 'Bearer aSuperSecretKey' }
      });

      if (resp.ok) {
        const json = await resp.text();
        const response = FormatFile(json);
        if (response.length > 0) Data.push(response);
      }
    });

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(promises);
    return Data
  } catch (error) {
    throw new Error(error);
  }
};

//Busco los datos y espero a que termine con todos los archivos
export const fetchDataParams = async (files) => {
  try {
    const resp = await fetch('https://echo-serv.tbxnet.com/v1/secret/file/' + files, {
      'Content-Type': 'application/json',
      headers: { Authorization: 'Bearer aSuperSecretKey' }
    });

    if (resp.ok) {
      const json = await resp.text();
      const response = FormatFile(json);
      if (response.length == 0) return [];
      return response
    }
    return [];

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

/*
* Example
* file,text,number,hex
* test2.csv,HjoQf
* test2.csv,flSUlgLLuayXnsWbw,790,4295ab13bb7ef28d6392774531b034e4
* test3.csv
*/
//Valido los archivos y hago la estructura que se necesita
export const FormatFile = (csv) => {

  const lines = csv.trim().split('\n');
  const validRows = [];

  for (let i = 1; i < lines.length; i++) { // Comenzar desde 1 para omitir el encabezado
    const columns = lines[i].split(',');

    // Verificar que hay exactamente 4 columnas
    if (columns.length === 4) {
      const [file, text, number, hex] = columns;

      // Verificar que 'number' es un número
      const isNumber = !isNaN(number);

      //En este caso no tomo en cuenta la logintud o si el hex es valido, sin embargo dejo el codigo por un futuro uso (Ya que en las instrucciones no indica que valide especificamente)
      // const isHex = /^[0-9a-fA-F]+$/.test(hex); && isHex

      //Valido si ninguno esta vacio
      if (isNumber && file && text && hex) {
        if (validRows.length == 0) {
          validRows.push({
            file: file,
            line: [{
              id: randominterval(),
              file,
              text,
              number,
              hex
            }]
          });
        } else {
          validRows[0].line.push({
            id: randominterval(),
            file,
            text,
            number,
            hex
          });
        }

      }
    }
  }
  return validRows;
}

const randominterval = () => { // min and max included 
  return Math.floor(Math.random() * (2000 - 1 + 1) + 1);
}