let db = firebase.firestore()
// Cadastrar Produtos

async function cadastrarProduto(e){
    e.preventDefault();

    let id = Math.abs(Math.round(Math.random() * (1 - 1000)))
    const $produto = document.getElementById("produto").value
    const $preco = document.getElementById("preco").value

    const produto = {
        id: id,
        nome: $produto,
        preco: $preco
    }

    try {
        await db.collection('produtos').doc('produto'+ id).set(produto)
        alert('Produto salvo com sucesso')
        document.getElementById("produto").value = ""
        document.getElementById("preco").value = ""
    }catch (error) {
        console.log(error)
    }
}   

async function prodCads(){
    //e.preventDefault()
    const doc = await db.collection('produtos')
    const dados = await doc.get()
    dados.forEach(produto => {
        let html = `
        <tr>
        <th scope="row">${produto.data().id}</th>
        <td>${produto.data().nome}</td>
        <td>${produto.data().preco}</td>
        <td><button type="button" class="btn btn-danger" onclick="excluir(${produto.data().id})">Excluir</button></td>
      </tr>
        `
        document.getElementById('prodCads').innerHTML += html
    });
}
document.getElementById("btnProduto").addEventListener('click', cadastrarProduto)

async function excluir(id){
    try {
        await db.collection('produtos').doc('produto'+id).delete()
        alert('Produto Excluido')
    } catch (error) {
        console.log(error)
    }
}
