function GerarChave() {
        const inputText = document.getElementById('chaveAcesso');
        const uf = sortearUf();
        const dataAtual = new Date(); 
        const mes = dataAtual.getMonth();
        const cnpj = '06073566000120';
        const serie = Math.floor(Math.random() * 999) + 1;
        const numero = Math.floor(Math.random() * 999999999) + 1;
        const codNum = Math.floor(Math.random() * 99999999) + 1;
        const chaveSemDv = `${formatar(uf, 2)}23${formatar(mes, 2)}${cnpj}55${formatar(serie, 3)}${formatar(numero, 9)}1${formatar(codNum, 8)}`
        const chave = chaveSemDv + gerarDv(chaveSemDv);

        inputText.value = chave;
        navigator.clipboard.writeText(chave);

        
}

function formatar(valor, quantidade) {
        return valor.toString().padStart(quantidade, '0')
}

function gerarDv(chave) {
        const ChaveArray = chave.split('');
        const pesos = [4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2];
        let soma = 0;
        let index = 0;

        ChaveArray.forEach(valor => {
                soma += valor * pesos[index];
                index++;
        });

        const resto = soma % 11;
        return resto <= 1 ? 0 : 11 - resto
}

function sortearUf() {
        const codigosUf = [11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 35, 41, 42, 43, 50, 51, 52, 53]
        const index = Math.floor(Math.random() * 27);

        return codigosUf[index]
}