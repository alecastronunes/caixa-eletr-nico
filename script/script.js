let saldoAtual = 0
let extrato = []

function depositarDinheiro() {
    let deposito = document.getElementById('deposito').value
    document.getElementById('deposito').value = ""
    if(deposito > 0) {
        saldoAtual = parseFloat(saldoAtual)  + parseFloat(deposito)
        saldoNaTela.innerHTML = saldoAtual.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        salvarTransacao('Depósito', deposito)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Depósito realizado com sucesso!!!",
            showConfirmButton: false,
            timer: 1500
          });
    }else{
        Swal.fire({   title: "Atenção",   text: "Operação inválida!!!",   icon: "error"});
    }   
}   

function sacarDinheiro() {
    let saque = document.getElementById('sacar').value
    document.getElementById('sacar').value = ""
    if(saldoAtual < saque){
        Swal.fire({   title: "Atenção",   text: "Saldo Insuficiente!!!",   icon: "error"});
    }else if(saque > 0) {
        saldoAtual = parseFloat(saldoAtual) - parseFloat(saque)
        saldoNaTela.innerHTML = saldoAtual.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        salvarTransacao('Saque', saque)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Saque realizado com sucesso!!!",
            showConfirmButton: false,
            timer: 1500
          });
    }else{
        Swal.fire({   title: "Atenção",   text: "Operação inválida!!!",   icon: "error"});
     }
}

function salvarTransacao(tipo, valor) {
    const textoExtrato = `${dataAtualFormatada()} - ${tipo} - Valor: ${formataValor(valor)}` 
    extrato.push(textoExtrato)
}

//Exibe o Extrato
function exibirExtrato() {
    var extratoResultado = document.getElementById('extrato-resultado')
    extratoResultado.value = extrato.join("\n")
}

 //Formata a data do Extrato
function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
}

//Formata o Valor para o Real
function formataValor(valor){
    valor = parseFloat(valor)
    return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}
