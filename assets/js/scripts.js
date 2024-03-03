// Simulação de dados dos produtos
const produtos = [
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Smash da casa', categoria: 'Combos', preco: 30.00 },
    { nome: 'Produto 2' },
    { nome: 'Produto 3' },
    { nome: 'Produto 4' }
];

// Função para exibir os produtos na página
function exibirProdutos(categoria) {
    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
    const produtosContainer = document.querySelector('.produtos-container');

    produtosContainer.innerHTML = ''; // Limpa o conteúdo existente

    produtosFiltrados.forEach(produto => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const produtoHTML = `
            <div class="produto">
                <div class="produto-wrapper">
                    <img src="assets/img/${produto.nome.replace(/\s/g, '')}.png" alt="${produto.nome}">
                    <div class="produto-info">
                        <h3>${produto.nome}</h3>
                        <p>2x hambúrguer 200g</p>
                        <p class="preco">R$${precoFormatado}</p>
                    </div>
                </div>
            </div>
        `;

        produtosContainer.insertAdjacentHTML('beforeend', produtoHTML); // Adiciona o produto ao container

        // Adicionar evento de clique para cada produto
        produtosContainer.lastElementChild.addEventListener('click', () => {
            // Quando um produto for clicado, exibe a tela de revisão do pedido com os detalhes desse produto
            exibirTelaRevisao(produto);

            // Altera a classe do elemento clicado para marcar como selecionado
            event.currentTarget.querySelector('.selecionar').classList.toggle('selecionado');
        });
    });
}

// Função para exibir a tela de revisão do pedido ao clicar em um produto
function exibirTelaRevisao(produto, precoTotalPedido) {
    // Preenche os detalhes do produto na tela de revisão do pedido
    document.getElementById('produto-imagem').src = `assets/img/${produto.nome.replace(/\s/g, '')}.png`;
    document.getElementById('produto-nome').textContent = produto.nome;
    document.getElementById('preco-lanche').textContent = produto.preco.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    // Atualiza a quantidade para 1 e limpa os adicionais selecionados
    document.getElementById('quantidade').textContent = '1';
    document.getElementById('observacoes').value = '';
    // Exibe a tela de revisão do pedido
    document.querySelector('.revisar-pedido').classList.add('visible');

    // Atualiza o total do pedido na tela de revisão
    const precoTotalFormatado = precoTotalPedido.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Exibir o preço total na tela
    document.getElementById('total-pedido-revisar').textContent = `R$ ${precoTotalFormatado}`;
}

// Evento de clique no botão de adicionar ao pedido
document.getElementById('adicionar-ao-pedido').addEventListener('click', () => {
    // Obtém os detalhes do produto selecionado
    const nomeProduto = document.getElementById('produto-nome').textContent;
    const quantidade = parseInt(document.getElementById('quantidade').textContent);
    const observacoes = document.getElementById('observacoes').value;
    const precoUnitario = parseFloat(document.getElementById('preco-lanche').textContent.replace('R$ ', ''));

    // Calcula o preço total do produto
    const precoTotal = precoUnitario * quantidade;

    // Cria um objeto com os detalhes do produto para adicionar ao pedido
    const itemPedido = {
        nome: nomeProduto,
        quantidade: quantidade,
        observacoes: observacoes,
        precoTotal: precoTotal
    };

    // Adiciona o resumo do pedido
    adicionarResumoPedido(itemPedido);

    // Limpa os campos
    document.getElementById('observacoes').value = '';
    document.querySelector('.revisar-pedido').classList.remove('visible');

    // Atualiza o preço total do pedido
    atualizarTotalPedido();

    // Exibe o resumo do pedido
    document.querySelector('.resumo-pedido').style.display = 'block';

    // Modifica a imagem do produto selecionado
    document.getElementById('produto-imagem').src = 'assets/img/selecionado.png';
});

// Função para adicionar o resumo do pedido
function adicionarResumoPedido(itemPedido) {
    const pedidoInfo = document.querySelector('.pedido-info');
    const precoFormatado = itemPedido.precoTotal.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Obtém os adicionais selecionados
    const adicionaisSelecionados = document.querySelectorAll('.adicional input:checked');

    // Obtém os nomes e preços dos adicionais selecionados
    const nomesAdicionais = [];
    let precoAdicionais = 0;
    adicionaisSelecionados.forEach(adicional => {
        nomesAdicionais.push(adicional.parentNode.querySelector('.nome-adicional').textContent.trim());
        precoAdicionais += parseFloat(adicional.parentNode.querySelector('.preco-adicional').textContent.replace('R$ ', ''));
    });

    // Monta a lista de nomes de adicionais selecionados
    let adicionaisTexto = nomesAdicionais.join(', ');

    // Se não houver adicionais selecionados, exibe "Nenhum"
    if (nomesAdicionais.length === 0) {
        adicionaisTexto = "Nenhum";
    }

    // Calcula o preço total do pedido considerando os adicionais
    const precoTotalComAdicionais = itemPedido.precoTotal + precoAdicionais;

    const pedidoHTML = `
        <div class="pedido-item">
            <p>${itemPedido.nome} - ${itemPedido.quantidade}x - R$${precoFormatado}</p>
            <p>Observações: ${itemPedido.observacoes}</p>
            <p>Adicionais: ${adicionaisTexto}</p>
            <p>Total com adicionais: R$${precoTotalComAdicionais.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</p>
        </div>
    `;
    pedidoInfo.insertAdjacentHTML('beforeend', pedidoHTML);
}

// Chama a função para exibir os produtos da primeira categoria por padrão ao carregar a página
exibirProdutos('Combos');

// Função para atualizar os preços dos produtos
function atualizarPrecos() {
    const precoElements = document.querySelectorAll('.produto .preco');
    produtos.forEach((produto, index) => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        precoElements[index].textContent = `R$${precoFormatado}`;
    });
}

// Função para marcar o link ativo no menu
function marcarLinkAtivo(link) {
    // Remove a classe 'selected' de todos os links
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('selected');
    });

    // Adiciona a classe 'selected' apenas ao link clicado
    link.classList.add('selected');
}

// Event listener para a caixa de texto de procura
document.getElementById('input-procura').addEventListener('keyup', (event) => {
    // Verifica se a tecla pressionada é Enter (código 13)
    if (event.keyCode === 13) {
        const termoBusca = document.getElementById('input-procura').value.toLowerCase();
        filtrarProdutosPorNome(termoBusca);
    }
});

function filtrarProdutosPorNome(termo) {
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(termo));
    const produtosContainer = document.querySelector('.produtos-container');

    // Limpa o conteúdo existente
    produtosContainer.innerHTML = '';

    if (produtosFiltrados.length === 0) {
        // Se não houver produtos correspondentes, exibe a mensagem de produto não encontrado
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Desculpe, não encontramos nada com esse nome.';
        produtosContainer.appendChild(mensagem);

        // Oculta a mensagem "Selecione um produto" se ela estiver presente
        const mensagemSelecionarProduto = document.querySelector('.produtos p');
        mensagemSelecionarProduto.style.display = 'none';
    } else {
        // Se houver produtos correspondentes, exibe-os na página
        exibirProdutosFiltrados(produtosFiltrados);

        // Remove a mensagem de produto não encontrado se ela estiver presente
        const mensagemProdutoNaoEncontrado = document.querySelector('.produtos-container p');
        if (mensagemProdutoNaoEncontrado) {
            mensagemProdutoNaoEncontrado.remove();
        }
    }
}

function exibirProdutosFiltrados(produtos) {
    const produtosContainer = document.querySelector('.produtos-container');
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const produtoHTML = `
            <div class="produto">
                <div class="produto-wrapper">
                    <img src="assets/img/SmashDaCasa.png" alt="${produto.nome}">
                    <div class="produto-info">
                        <h3>${produto.nome}</h3>
                        <p>2x hambúrguer 200g</p>
                        <p class="preco">R$${precoFormatado}</p>
                    </div>
                </div>
            </div>
        `;

        produtosContainer.insertAdjacentHTML('beforeend', produtoHTML);

        // Adicionar evento de clique para cada produto
        produtosContainer.lastElementChild.addEventListener('click', () => {
            // Quando um produto for clicado, exibe a tela de revisão do pedido com os detalhes desse produto
            exibirTelaRevisao(produto);

            // Altera a classe do elemento clicado para marcar como selecionado
            event.currentTarget.querySelector('.selecionar').classList.toggle('selecionado');
        });
    });
}

// Adiciona evento de clique para cada produto
document.querySelectorAll('.produto').forEach((produtoElement, index) => {
    produtoElement.addEventListener('click', () => {
        // Quando um produto for clicado, exibe a tela de revisão do pedido com os detalhes desse produto
        exibirTelaRevisao(produtos[index]);
    });
});

// Variáveis globais para armazenar o preço do lanche e o total do pedido
let precoLanche = 0;
let quantidade = 1;

// Evento de clique no botão de aumentar quantidade
document.getElementById('aumentar-quantidade').addEventListener('click', function () {
    quantidade++;
    document.getElementById('quantidade').textContent = quantidade;
    atualizarTotalPedido();
});

// Evento de clique no botão de diminuir quantidade
document.getElementById('diminuir-quantidade').addEventListener('click', function () {
    if (quantidade > 1) {
        quantidade--;
        document.getElementById('quantidade').textContent = quantidade;
        atualizarTotalPedido();
    }
});

// Evento de clique nos botões de selecionar adicionais
const botoesAdicionais = document.querySelectorAll('.selecionar-adicional');
botoesAdicionais.forEach(botao => {
    botao.addEventListener('click', function () {
        // Adiciona o adicional à lista de adicionais selecionados
        const precoAdicional = parseFloat(this.parentNode.querySelector('.preco-adicional').textContent.replace('R$ ', ''));
        adicionaisSelecionados.push({
            nome: this.parentNode.querySelector('.nome-adicional').textContent.trim(),
            preco: precoAdicional
        });

        // Atualiza o preço total do pedido
        atualizarTotalPedido();
    });
});

let adicionaisSelecionados = [];

function atualizarTotalPedido() {
    let totalPedido = 0;

    // Obtém o preço do lanche base
    const precoUnitario = parseFloat(document.getElementById('preco-lanche').textContent.replace('R$ ', ''));
    // Obtém a quantidade do lanche
    const quantidade = parseInt(document.getElementById('quantidade').textContent);
    // Calcula o preço total do lanche base multiplicando pelo número de unidades
    totalPedido += precoUnitario * quantidade;

    // Obtém os preços dos adicionais selecionados
    adicionaisSelecionados.forEach(adicional => {
        totalPedido += adicional.preco;
    });

    // Formata o preço total novamente antes de exibi-lo na tela
    const precoTotalFormatado = totalPedido.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Exibir o preço total na tela
    document.getElementById('total-pedido').textContent = `R$ ${precoTotalFormatado}`;
}


// Função para adicionar um item ao pedido
function adicionarItemAoPedido(itemPedido) {
    // Verifica se já existem pedidos salvos no localStorage
    const pedidosSalvos = localStorage.getItem('pedidos');

    if (pedidosSalvos) {
        // Se houver pedidos salvos, recupera e adiciona o novo item
        const pedidos = JSON.parse(pedidosSalvos);
        pedidos.push(itemPedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    } else {
        // Se não houver pedidos salvos, cria um novo array contendo apenas o novo item
        const pedidos = [itemPedido];
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }
}

// Função para exibir os pedidos na página de cozinha
function exibirPedidosNaCozinha() {
    const pedidosSalvos = localStorage.getItem('pedidos');

    if (pedidosSalvos) {
        const pedidos = JSON.parse(pedidosSalvos);
        // Agora você pode iterar sobre os pedidos e exibi-los na interface da cozinha
    }
}

// Função para exibir os pedidos na página de pagamentos
function exibirPedidosNoPagamento() {
    const pedidosSalvos = localStorage.getItem('pedidos');

    if (pedidosSalvos) {
        const pedidos = JSON.parse(pedidosSalvos);
        // Agora você pode iterar sobre os pedidos e exibi-los na interface de pagamentos
    }
}

// Seletor para o botão Cancelar
const cancelarButton = document.getElementById("cancelar");

// Adicionando um evento de clique ao botão Cancelar
cancelarButton.addEventListener("click", function() {
    // Verifica se estamos na página de pagamentos
    if (window.location.pathname.includes('pagamentos.html')) {
        // Se sim, voltamos para a página anterior
        window.history.back();
    } else {
        // Caso contrário, recarregamos a página atual
        location.reload();
    }
});

// Verifica se estamos na página index.html
if (window.location.pathname.includes('index.html')) {
    document.getElementById("cancelar").addEventListener("click", function() {
        location.reload(); // Recarrega a página atual
    });

    document.getElementById("finalizar").addEventListener("click", function() {
        window.location.href = "pagamentos.html"; // Redireciona para a página de pagamentos
    });
}

const finalizarPedidoEl = document.querySelector('.finalizar-pedido');

finalizarPedidoEl.addEventListener('click', () => {
  // TODO: Validar dados do cliente e forma de pagamento
  // TODO: Enviar dados para o servidor
  // TODO: Redirecionar para página de confirmação

  alert('Pedido finalizado com sucesso!');
});
