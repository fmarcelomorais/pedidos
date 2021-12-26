let db = firebase.firestore()

async function cadastrarPedido(){
    let id = Math.abs(Math.round(Math.random() * (1 - 1000)))
    const pedido = {
        id: id,
        data: data,
        cliente: cliente,
        produto: produto,
        valor: valor
    }

    try {
        await db.collection('pedidos').doc('pedido'+ id).set(pedido)
        alert('Pedido salvo com sucesso')
    }catch (error) {
        console.log(error)
    }
}   
