const form = document.querySelector('#form-calculadora');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputJuros = event.target.querySelector('#input-juros');
    const inputMulta = event.target.querySelector('#input-multa');
    const inputDias = event.target.querySelector('#input-dias');
    const inputValor = event.target.querySelector('#input-valor');

    const juros = parseNumero(inputJuros.value) / 30 / 100;
    const multa = parseNumero(inputMulta.value) / 100;
    const dias = Number(inputDias.value);
    const valor = parseNumero(inputValor.value);

    if (!juros) {
        setResultado('Juros inválido', false);
        return;
    }

    if (!multa) {
        setResultado('Multa inválida', false);
        return;
    }

    if (!dias) {
        setResultado('Dias inválidos', false);
        return;
    }

    if (!valor) {
        setResultado('Valor inválido', false);
        return;
    }

    const resultado = (valor * (juros * dias) + (valor * multa) + valor);

    const msg = `O valor total da cobrança é R$${resultado.toFixed(2)}.`;

    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.push(msg);
    localStorage.setItem('historico', JSON.stringify(historico));

    setResultado(msg, true);

});

function criaP (){
    const p = document.createElement('p');
    return p;
}

function setResultado(msg, isValid){
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = ' ';
    
    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);

    if (isValid) {
        const listaResultados = document.getElementById('lista-resultados');
        const item = document.createElement('li');
        item.textContent = msg;
        listaResultados.appendChild(item);
    }

};

function parseNumero(valor) {
    return parseFloat(valor.replace(',', '.'));
}

window.addEventListener('DOMContentLoaded', () => {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    historico.forEach(msg => {
        const item = document.createElement('li');
        item.textContent = msg;
        document.getElementById('lista-resultados').appendChild(item);
    });

    document.getElementById('limparHistorico').addEventListener('click', () => {
        localStorage.removeItem('historico');
        document.getElementById('lista-resultados').innerHTML = '';
    });
});


