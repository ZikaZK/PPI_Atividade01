import express from 'express';
const app = express();
const host = 'localhost';
const porta = 3000;
app.listen(porta, host, () => {
    console.log(`Aplicação escutando em http://${host}:${porta}`);
});

app.get('/', (req, res) => {
    res.write(`
        <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 1</title>
        </head>
        <body>
        
        </body>
        </html>
    `);
});