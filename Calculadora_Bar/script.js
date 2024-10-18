// script.js
let pessoas = [];
let itens = [];

function adicionarPessoa() {
    const nomePessoa = document.getElementById('nomePessoa').value;
    if (nomePessoa) {
        pessoas.push(nomePessoa);
        document.getElementById('nomePessoa').value = '';
        atualizarListaPessoas();
    }
}

function removerPessoa(index) {
    pessoas.splice(index, 1);
    atualizarListaPessoas();
}

function atualizarListaPessoas() {
    const listaPessoas = document.getElementById('listaPessoas');
    listaPessoas.innerHTML = '';
    pessoas.forEach((pessoa, index) => {
        const li = document.createElement('li');
        li.textContent = pessoa;
        const button = document.createElement('button');
        button.textContent = 'Remover';
        button.onclick = () => removerPessoa(index);
        li.appendChild(button);
        listaPessoas.appendChild(li);
    });
}

function adicionarItem() {
    const nomeItem = document.getElementById('nomeItem').value;
    const valorItem = parseFloat(document.getElementById('valorItem').value);
    const quantidadeItem = parseInt(document.getElementById('quantidadeItem').value);
    if (nomeItem && valorItem && quantidadeItem) {
        itens.push({ nome: nomeItem, valor: valorItem, quantidade: quantidadeItem, consumidores: [] });
        document.getElementById('nomeItem').value = '';
        document.getElementById('valorItem').value = '';
        document.getElementById('quantidadeItem').value = '';
        atualizarListaItens();
    }
}

function removerItem(index) {
    itens.splice(index, 1);
    atualizarListaItens();
}

function atualizarListaItens() {
    const listaItens = document.getElementById('listaItens');
    listaItens.innerHTML = '';
    itens.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$${item.valor} x ${item.quantidade}`;
        const button = document.createElement('button');
        button.textContent = 'Remover';
        button.onclick = () => removerItem(index);
        li.appendChild(button);
        listaItens.appendChild(li);
    });
    atualizarAtribuicaoItens();
}

function atualizarAtribuicaoItens() {
    const atribuicaoItens = document.getElementById('atribuicaoItens');
    atribuicaoItens.innerHTML = '';
    itens.forEach((item, itemIndex) => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${item.nome}</h3>`;
        pessoas.forEach((pessoa, pessoaIndex) => {
            const label = document.createElement('label');
            label.textContent = pessoa;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.onchange = () => atribuirPessoa(itemIndex, pessoa, checkbox.checked);
            label.appendChild(checkbox);
            div.appendChild(label);
        });
        atribuicaoItens.appendChild(div);
    });
}

function atribuirPessoa(itemIndex, pessoa, isChecked) {
    if (isChecked) {
        itens[itemIndex].consumidores.push(pessoa);
    } else {
        const index = itens[itemIndex].consumidores.indexOf(pessoa);
        if (index > -1) {
            itens[itemIndex].consumidores.splice(index, 1);
        }
    }
}

function calcularDivisao() {
    let totalPorPessoa = {};

    itens.forEach(item => {
        let valorPorPessoa = (item.valor * item.quantidade) / item.consumidores.length;
        item.consumidores.forEach(pessoa => {
            if (!totalPorPessoa[pessoa]) {
                totalPorPessoa[pessoa] = 0;
            }
            totalPorPessoa[pessoa] += valorPorPessoa;
        });
    });

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    for (const [pessoa, total] of Object.entries(totalPorPessoa)) {
        const div = document.createElement('div');
        div.textContent = `${pessoa}: R$${total.toFixed(2)}`;
        resultado.appendChild(div);
    }
}
