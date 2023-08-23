let create_array = (total, numero) =>
  Array.from(Array(total), () => number_random(numero));
let number_random = (number) => Math.round(Math.random() * number);
let mod = (dividendo, divisor) =>
  Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);

const manterCnpj = document.getElementById("manterCnpj");
const pesquisaManualCheckbox = document.getElementById("pesquisaManual");

function updateButtonStatus() {
  if (pesquisaManualCheckbox.checked) {
    manterCnpj.disabled = true;
  } else {
    manterCnpj.disabled = false;
  }
}

updateButtonStatus();

pesquisaManualCheckbox.addEventListener("change", updateButtonStatus);

function GerarChave() {
  const inputText = document.getElementById("chaveAcesso");
  const inputCnpj = document.getElementById("cnpj").value;
  const inputNumero = document.getElementById("numeroNfe");
  const valorNumero = inputNumero.value;
  const labelInfo = document.getElementById("info");

  const uf = sortearUf();
  const dataAtual = new Date();
  const mes = dataAtual.getMonth();
  const cnpj = inputCnpj != "" ? (manterCnpj.checked ? inputCnpj : gerarCnpj()) : gerarCnpj();
  const serie = Math.floor(Math.random() * 889) + 1;
  const numero = valorNumero != "" ? valorNumero : Math.floor(Math.random() * 999999999) + 1;
  const codNum = Math.floor(Math.random() * 99999999) + 1;
  const chaveSemDv = `${formatar(uf, 2)}23${formatar(mes, 2)}${cnpj}55${formatar(serie, 3)}${formatar(numero, 9)}1${formatar(
    codNum,
    8
  )}`;
  const chave = chaveSemDv + gerarDv(chaveSemDv);

  inputText.value = pesquisaManualCheckbox.checked ? inputText.value : chave;
  inputNumero.value = "";
  labelInfo.innerHTML = valorNumero != ""
    ? `Chave gerada para o documento de  número: ${valorNumero}`
    : "";

  navigator.clipboard.writeText(inputText.value);
  JsBarcode("#barcode", inputText.value);
}

function formatar(valor, quantidade) {
  return valor.toString().padStart(quantidade, "0");
}

function gerarDv(chave) {
  const ChaveArray = chave.split("");
  const pesos = [
    4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4,
    3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ];
  let soma = 0;
  let index = 0;

  ChaveArray.forEach((valor) => {
    soma += valor * pesos[index];
    index++;
  });

  const resto = soma % 11;
  return resto <= 1 ? 0 : 11 - resto;
}

function sortearUf() {
  const codigosUf = [
    11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33,
    35, 41, 42, 43, 50, 51, 52, 53,
  ];
  const index = Math.floor(Math.random() * 27);

  return codigosUf[index];
}

function gerarCnpj() {
  let total_array = 8;
  let n = 9;
  let [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(total_array, n);
  let n9 = 0;
  let n10 = 0;
  let n11 = 0;
  let n12 = 1;

  let d1 =
    n12 * 2 +
    n11 * 3 +
    n10 * 4 +
    n9 * 5 +
    n8 * 6 +
    n7 * 7 +
    n6 * 8 +
    n5 * 9 +
    n4 * 2 +
    n3 * 3 +
    n2 * 4 +
    n1 * 5;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 =
    d1 * 2 +
    n12 * 3 +
    n11 * 4 +
    n10 * 5 +
    n9 * 6 +
    n8 * 7 +
    n7 * 8 +
    n6 * 9 +
    n5 * 2 +
    n4 * 3 +
    n3 * 4 +
    n2 * 5 +
    n1 * 6;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
}

function CriarCnpj() {
  const inputCnpj = document.getElementById("cnpj");
  const cnpj = gerarCnpj();
  inputCnpj.value = cnpj;
  navigator.clipboard.writeText(cnpj);
}

function downloadSVGAsPNG(e) {
  const canvas = document.createElement("canvas");
  const svg = document.querySelector("#barcode");
  const input_value = document.getElementById("chaveAcesso").value;
  const base64doc = btoa(svg.outerHTML);
  const w = parseInt(svg.getAttribute("width"));
  const h = parseInt(svg.getAttribute("height"));
  const img_to_download = document.createElement("img");
  img_to_download.src = "data:image/svg+xml;base64," + base64doc;

  img_to_download.onload = function () {
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    const context = canvas.getContext("2d");
    //context.clearRect(0, 0, w, h);
    context.drawImage(img_to_download, 0, 0, w, h);
    const dataURL = canvas.toDataURL("image/png");
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(canvas.msToBlob(), `${input_value}.png`);
      e.preventDefault();
    } else {
      const a = document.createElement("a");
      const my_evt = new MouseEvent("click");
      a.download = `${input_value}.png`;
      a.href = dataURL;
      a.dispatchEvent(my_evt);
    }
  };
}
