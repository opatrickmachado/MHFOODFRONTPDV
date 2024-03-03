document.addEventListener("DOMContentLoaded", function() {
    // Recuperar o nome do cliente armazenado na localStorage
    const nomeCliente = localStorage.getItem("nomeCliente");

    // Recuperar o código do pedido armazenado na localStorage
    const codigoPedido = localStorage.getItem("codigoPedido");

    // Exibir o código do pedido e o nome do cliente na página da cozinha
    document.getElementById("codigo-pedido").textContent = `${codigoPedido} - ${nomeCliente}`;
});

document.addEventListener('DOMContentLoaded', function() {
    const pedidosPainel = document.querySelector('.cozinha-painel');

    // Adiciona evento de clique aos botões "Confirmar"
    pedidosPainel.querySelectorAll('.pedido-confirmar').forEach(botao => {
        botao.addEventListener('click', function() {
            const pedido = this.parentNode.parentNode; // Obtém o elemento do pedido
            const prontoPainel = document.querySelector('.cozinha-painel.pronto-container');

            // Move o pedido para o painel "Pronto"
            prontoPainel.appendChild(pedido);

            // Oculta o botão de confirmar
            this.style.display = 'none';
        });
    });
});

function exibirPedidoNaTela(pedido) {
    const pedidoContainer = document.querySelector('.pedidos-impressos');
    
    // Verifica se o elemento .info-pedido existe no pedido
    const infoPedido = pedido.querySelector('.info-pedido');
    if (infoPedido) {
        // Se o elemento existir, cria um novo elemento div para exibir o pedido
        const novoPedido = document.createElement('div');
        novoPedido.textContent = infoPedido.textContent;
        
        // Adiciona o novo pedido ao container de pedidos exibidos
        pedidoContainer.appendChild(novoPedido);
    } else {
        console.error("Elemento .info-pedido não encontrado no pedido:", pedido);
    }
}

function cancelarPedido(elementoPedido) {
    // Extrair as informações do pedido cancelado
    const codigoPedido = elementoPedido.querySelector('#codigo-pedido').textContent;
    const nomeCliente = codigoPedido.split('-')[1].trim(); // Extrair o nome do cliente

    // Remover o pedido da interface
    elementoPedido.remove();

    // Criar um objeto com as informações do pedido
    const pedidoCancelado = {
        codigo: codigoPedido,
        nomeCliente: nomeCliente
    };

    // Armazenar o pedido cancelado na sessionStorage para ser exibido na página retirada.html
    sessionStorage.setItem('pedidoCancelado', JSON.stringify(pedidoCancelado));

    // Redirecionar para a página retirada.html
    window.location.href = "retirada.html";
}
