document.getElementById("cancelar").addEventListener("click", function() {
    location.reload(); // Recarrega a página atual
});

document.getElementById("finalizar").addEventListener("click", function() {
    // Recuperar informações do pedido da localStorage
    const pedido = JSON.parse(localStorage.getItem('pedido')) || [];
    const totalPedido = parseFloat(localStorage.getItem('totalPedido')) || 0;

    // Armazenar informações do pedido na sessionStorage da página de pagamentos
    sessionStorage.setItem('pedido', JSON.stringify(pedido));
    sessionStorage.setItem('totalPedido', totalPedido);

    // Redirecionar para a página de pagamentos
    window.location.href = "pagamentos.html";
});
