let db = firebase.firestore()

const produtos = []
function incluiProdutoPedido(e){
    e.preventDefault();    
    const select = document.getElementById("selectProduto")
    const indice = select.selectedIndex
    const nomeProd = select.options[indice].text
    const valorProd = Number(select.value)
    let prod = {produto: nomeProd, valor: valorProd}
    produtos.push(prod)
    console.log(produtos)
    soma(e)
}
document.getElementById("btnIncluirProd").addEventListener('click', incluiProdutoPedido)

function soma(e){    
    e.preventDefault()
   const total = produtos
                    .map(x => x.valor)
                    .reduce((total, preco) => total + preco)
    return total
}
//document.getElementById("btnCadPedido").addEventListener("click", soma)


function excluirProdutoPedido(e){
    e.preventDefault();    
    const select = document.getElementById("selectProduto")
    produtos.pop(select.value)
    console.log(produtos)
}
document.getElementById("btnExcluirProd").addEventListener('click', excluirProdutoPedido)


async function cadastrarPedido(e){
    e.preventDefault()
    let id = Math.abs(Math.round(Math.random() * (1 - 1000)))
    const data = document.getElementById("data").value
    const select = document.getElementById("selectCliente")
    const cliente = select.value
    const total = soma(e)

    const pedido = {
        id: id,
        data: data,
        cliente: cliente,
        produto: produtos,
        valor: total
    }

    try {
        await db.collection('pedidos').doc('pedido'+ id).set(pedido)
        alert('Pedido salvo com sucesso')
    }catch (error) {
        console.log(error)
    }
}   

document.getElementById("btnCadPedido").addEventListener("click", cadastrarPedido)

async function lista(){
    //e.preventDefault()
    const cli = await db.collection('clientes')
    const dadosCli = await cli.get()
    dadosCli.forEach(cliente => {
        let html = `
        <option value="${cliente.data().nome}">${cliente.data().nome}</option>
        `
        document.getElementById('selectCliente').innerHTML += html
    });

    const prod = await db.collection('produtos')
    const dadosProd = await prod.get()
    dadosProd.forEach(produto => {
        let html = `
        <option value="${produto.data().preco}">${produto.data().nome} - R$ ${produto.data().preco}</option>
        `
        document.getElementById('selectProduto').innerHTML += html
    });
}

