//let db = firebase.firestore()
// Cadastrar Produtos

async function cadastrarProduto(e){
    e.preventDefault();
    const $produto = document.getElementById("produto").value
    const $preco = document.getElementById("preco").value
    if($produto == '' && $preco == ''){
        swal({text:'Nenhum Produto e preço foi informado',icon: 'warning'})
    }else{

        let id = Math.abs(Math.round(Math.random() * (1 - 1000)))
        const produto = {
            id: id,
            nome: $produto,
            preco: $preco
        }
    
        try {
            await db.collection('produtos').doc('produto'+ id).set(produto)
            swal(`Produto ${id}`, 'Cadastrado com Sucesso', 'success')
            document.getElementById("produto").value = ""
            document.getElementById("preco").value = ""
        }catch (error) {
            console.log(error)
        }
        //atualiza()
    }
    //prodCads()

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
        <td>R$ ${produto.data().preco}</td>
        <td>
        <button type="button" class="btn btn-warning m-1" id="altera${produto.data().id}" onclick="alterar(${produto.data().id})">Editar</button>
        <button type="button" class="btn btn-danger" onclick="excluir(${produto.data().id})">Excluir</button>
        </td>
      </tr>
        `
        document.getElementById('prodCads').innerHTML += html
    });
}
document.getElementById("btnProduto").addEventListener('click', cadastrarProduto)

async function alterar(id){
    try {
        let a = await db.collection('produtos').doc('produto'+id).get()
        document.getElementById("id").value = a.data().id
        document.getElementById("produto").value = a.data().nome
        document.getElementById("preco").value = a.data().preco
        document.getElementById(`altera${id}`).setAttribute('class', 'btn btn-success')
        document.getElementById(`altera${id}`).setAttribute('onclick', 'salvar()')
        document.getElementById(`altera${id}`).innerHTML = 'Salvar'
        
    } catch (error) {
        console.log(error)
    }
}

async function salvar(){
   const id = document.getElementById("id").value
   const nome = document.getElementById("produto").value
   const preco = document.getElementById("preco").value
   const produto = {
        id:  id,
        nome: nome,
        preco: preco
    }

    try {
        await db.collection('produtos').doc('produto'+id).set(produto)
        swal(`Produto ${id}`, 'Alterado com Sucesso', 'success')
        document.getElementById("produto").value = ""
        document.getElementById("preco").value = ""
        document.getElementById(`altera${id}`).setAttribute('class', 'btn btn-warning')
        document.getElementById(`altera${id}`).setAttribute('onclick', 'alterar(id)')
        document.getElementById(`altera${id}`).innerHTML = 'Editar'
        
    }catch (error) {
        console.log(error)
    }
    //atualiza()
    
}



async function excluir(id){
    try {
        await db.collection('produtos').doc('produto'+id).delete()
        swal(`Produto ${id}`, 'Excluido com Sucesso', 'success')
        
    } catch (error) {
        console.log(error)
    }
    //atualiza()
}
