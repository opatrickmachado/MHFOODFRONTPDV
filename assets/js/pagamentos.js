// Definir o número do pedido
const numeroPedido = 1; // Altere este valor conforme necessário

// Formatar o número do pedido para ter três dígitos
const codigoPedido = numeroPedido.toString().padStart(3, '0');

// Preencher o campo de código do pedido na página de pagamentos
document.getElementById("codigo-cliente").value = codigoPedido;

// Adicionar evento de clique ao botão "Finalizar"
document.getElementById("finalizar").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do botão

    const nomeCliente = document.getElementById("nome-cliente").value;
    const codigoPedido = document.getElementById("codigo-cliente").value;
    const formaPagamento = document.querySelector('input[name="forma-pagamento"]:checked').value;

    localStorage.setItem("nomeCliente", nomeCliente);
    localStorage.setItem("codigoPedido", codigoPedido);

    if (formaPagamento === 'pix') {
        const { codigoPix, qrCodeUrl } = generatePixCode(); // Chama a função para obter o código PIX e o URL do QR Code

        // Cria um novo elemento img para exibir o QR Code
        const qrCodeImage = document.createElement('img');
        qrCodeImage.src = qrCodeUrl;

        // Cria um novo elemento para exibir o código PIX
        const codigoPixElement = document.createElement('p');
        codigoPixElement.textContent = `Para efetuar o pagamento via PIX, utilize o seguinte código:\n${codigoPix}`;

        // Cria um novo elemento div para envolver o QR Code e o código PIX
        const qrCodeContainer = document.createElement('div');
        qrCodeContainer.appendChild(qrCodeImage);
        qrCodeContainer.appendChild(codigoPixElement);

        // Limpa o conteúdo existente do main
        const mainElement = document.querySelector('main');
        mainElement.innerHTML = '';

        // Adiciona o QR Code e o código PIX ao main
        mainElement.appendChild(qrCodeContainer);

        // Atualiza o título da página
        document.title = "Pagamento PIX";
    } 
});

document.getElementById("finalizar").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do botão

    const nomeCliente = document.getElementById("nome-cliente").value;
    const codigoPedido = document.getElementById("codigo-cliente").value;
    const formaPagamento = document.querySelector('input[name="forma-pagamento"]:checked').value;

    localStorage.setItem("nomeCliente", nomeCliente);
    localStorage.setItem("codigoPedido", codigoPedido);

    if (formaPagamento === 'pix') {
        // Gerar um código PIX (pode ser um UUID ou um código específico do pedido)
        const codigoPix = generatePixCode(); // Implemente essa função para gerar o código PIX

        // Exibir o código PIX para pagamento
        alert(`Para efetuar o pagamento via PIX, utilize o seguinte código:\n${codigoPix}`);
    } else {
        alert("Pedido finalizado com sucesso! \nO pedido foi encaminhado para a cozinha.");
        window.location.href = "cozinha.html";
    }
});

function generatePixCode() {
    // Implemente a lógica para gerar o código PIX aqui
    // Por exemplo, você pode usar um UUID
    const uuid = generateUUID();
    return uuid;
}

function generateUUID() {
    // Função para gerar um UUID (Identificador Único Universal)
    // Você pode encontrar implementações dessa função na web ou usar bibliotecas como uuid.js
    // Aqui está uma implementação simples:
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    // Recuperar informações do pedido da sessionStorage
    const pedido = JSON.parse(sessionStorage.getItem('pedido')) || [];
    const totalPedido = parseFloat(sessionStorage.getItem('totalPedido')) || 0;

    // Selecione o elemento onde você deseja exibir o resumo da compra
    const resumoCompra = document.querySelector('.resumo-compra ul');

    // Limpe o conteúdo existente
    resumoCompra.innerHTML = '';

    // Adicione cada item do pedido ao resumo da compra
    pedido.forEach(item => {
        const li = document.createElement('li');
        const spanNome = document.createElement('span');
        const spanValor = document.createElement('span');

        spanNome.textContent = `${item.nome} (${item.quantidade}x)`;
        spanValor.textContent = `R$ ${item.valor.toFixed(2)}`;

        li.appendChild(spanNome);
        li.appendChild(spanValor);

        resumoCompra.appendChild(li);
    });

    // Adicione o total do pedido ao resumo da compra
    const liTotal = document.createElement('li');
    const spanTotalLabel = document.createElement('span');
    const spanTotalValor = document.createElement('span');

    spanTotalLabel.textContent = 'Total do pedido:';
    spanTotalValor.textContent = `R$ ${totalPedido.toFixed(2)}`;

    liTotal.appendChild(spanTotalLabel);
    liTotal.appendChild(spanTotalValor);

    resumoCompra.appendChild(liTotal);
});

// Recuperar informações do pedido da sessionStorage
const pedido = JSON.parse(sessionStorage.getItem('pedido')) || [];
const totalPedido = parseFloat(sessionStorage.getItem('totalPedido')) || 0;

// Selecionar o elemento onde você deseja exibir os detalhes do pedido
const pedidoInfo = document.querySelector('.resumo-pedido .pedido-info');

// Limpar o conteúdo existente
pedidoInfo.innerHTML = '';

// Adicionar cada item do pedido aos detalhes do pedido
pedido.forEach(item => {
    const divItem = document.createElement('div');
    divItem.textContent = `${item.nome}: R$ ${item.valor.toFixed(2)}`;

    pedidoInfo.appendChild(divItem);
});

// Preencher o total do pedido
document.getElementById('total-pedido').textContent = `R$ ${totalPedido.toFixed(2)}`;

