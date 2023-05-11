let create_array = (total, numero) => Array.from(Array(total), () => number_random(numero));
let number_random = (number) => (Math.round(Math.random() * number));
let mod = (dividendo, divisor) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

function GerarChave() {
        const inputText = document.getElementById('chaveAcesso');
        const uf = sortearUf();
        const dataAtual = new Date(); 
        const mes = dataAtual.getMonth();
        const cnpj = gerarCnpj();
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

function gerarCnpj() {
        let total_array = 8;
        let n = 9;
        let [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(total_array, n);
        let n9 = 0;
        let n10 = 0;
        let n11 = 0;
        let n12 = 1;
      
        let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
        d1 = 11 - (mod(d1, 11));
        if (d1 >= 10) d1 = 0;
      
        let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
        d2 = 11 - (mod(d2, 11));
        if (d2 >= 10) d2 = 0;
      
        return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
}