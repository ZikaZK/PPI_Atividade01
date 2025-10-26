import express from 'express';
const app = express();
const host = 'localhost';
const porta = 3000;
app.listen(porta, host, () => {
    console.log(`Aplicação escutando em http://${host}:${porta}`);
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    const idade = parseInt(req.query.idade);
    const sexo = req.query.sexo;
    const salarioBase = parseFloat(req.query.salarioBase);
    const anoContratacao = parseInt(req.query.anoContratacao);
    const matricula = parseInt(req.query.matricula);
    var guarda = 0;
    res.write(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 1</title>
        </head>
        <body>
        <p>Informe na URL no subdiretório de "reajuste" os seguintes dados: idade, sexo (F ou M), salarioBase, anoContratacao e matricula</p>
    `);

    if(!Number.isInteger(idade) || idade <= 16){
        res.write('<p>A idade precisa ser acima de 16 anos</p>');
        guarda = 1;
    }
    if(sexo.toUpperCase() != 'F' && sexo.toUpperCase() != 'M'){
        res.write('<p>O sexo está inválido</p>');
        guarda = 1;
    }
    if(!(typeof salarioBase === 'number' && Number.isFinite(salarioBase) && !Number.isInteger(salarioBase)) || salarioBase < 0){
        res.write('<p>O salário base precisa ser um número real positivo</p>');
        guarda = 1;
    }
    if(!anoContratacao.isInteger() || anoContratacao <= 1960){
        res.write('<p>O ano de contratação precisa ser acima de 1960</p>');
        guarda = 1;
    }
    if(!matricula.isInteger() || matricula < 0){
        res.write('<p>O número de matrícula precisa ser um inteiro maior que 0</p>');
        guarda = 1;
    }

    if(guarda != 1){
        let salarioNovo;
        let anosEmpresa = 2025 - anoContratacao;
        res.write(`
            <h2>Informações:</h2><br><br>
            <p>Idade: ${idade}</p>
            <p>Sexo: ${sexo}</p>
            <p>Salário base: R$${salarioBase.toFixed()}</p>
            <p>Ano de contratação: ${anoContratacao}</p>
            <p>Número de matrícula: ${matricula}</p>
            <br>
        `);
        
        if(idade > 16 && idade <= 39){
            if(sexo.toUpperCase() == 'M'){
                salarioNovo = salarioBase * 1.1;
                if(anosEmpresa <= 10){
                    salarioNovo -= 10.0;
                } else {
                    salarioNovo += 17.0;
                }
            } else if(sexo.toUpperCase() == 'F'){
                salarioNovo = salarioBase * 1.08;
                if(anosEmpresa <= 10){
                    salarioNovo -= 11.0;
                } else {
                    salarioNovo += 16.0;
                }
            }
        } else if(idade > 39 && idade <= 69){
            if(sexo.toUpperCase() == 'M'){
                salarioNovo = salarioBase * 1.08;
                if(anosEmpresa <= 10){
                    salarioNovo -= 5.0;
                } else {
                    salarioNovo += 15.0;
                }
            } else if(sexo.toUpperCase() == 'F'){
                salarioNovo = salarioBase * 1.1;
                if(anosEmpresa <= 10){
                    salarioNovo -= 7.0;
                } else {
                    salarioNovo += 14.0;
                }
            }
        } else if(idade > 69){
            if(sexo.toUpperCase() == 'M'){
                salarioNovo = salarioBase * 1.15;
                if(anosEmpresa <= 10){
                    salarioNovo -= 15.0;
                } else {
                    salarioNovo += 13.0;
                }
            } else if(sexo.toUpperCase() == 'F'){
                salarioNovo = salarioBase * 1.17;
                if(anosEmpresa <= 10){
                    salarioNovo -= 17.0;
                } else {
                    salarioNovo += 12.0;
                }
            }
        }

        res.write(`<p>Novo salário reajustado: R$${salarioNovo.toFixed(2)}`);
    }

    res.write(`
        </body>
        </html>    
    `);
    res.end();
});