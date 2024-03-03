    document.addEventListener("DOMContentLoaded", function() {
        // Recuperar o pedido cancelado da sessionStorage
        const pedidoCanceladoJSON = sessionStorage.getItem('pedidoCancelado');
        if (pedidoCanceladoJSON) {
            const pedidoCancelado = JSON.parse(pedidoCanceladoJSON);
            // Exibir o nome do cliente na área "Pronto"
            const prontoContainer = document.querySelector('.pedido-pronto');
            prontoContainer.textContent = `Pedido de ${pedidoCancelado.nomeCliente} está pronto para retirada.`;
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Recuperar o pedido cancelado da sessionStorage
        const pedidoCanceladoJSON = sessionStorage.getItem('pedidoCancelado');
        if (pedidoCanceladoJSON) {
            const pedidoCancelado = JSON.parse(pedidoCanceladoJSON);
            // Verificar se há pedidos em preparação na cozinha
            const pedidosEmPreparacao = document.querySelectorAll('.cozinha-painel:not(.pronto-container) .pedido');
            if (pedidosEmPreparacao.length > 0) {
                // Exibir apenas se houver pedidos em preparação na cozinha
                const preparandoContainer = document.querySelector('.retirada-painel strong');
                preparandoContainer.textContent = `Preparando: ${pedidoCancelado.nomeCliente}`;
            }
        }
    });