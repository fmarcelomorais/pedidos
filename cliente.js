const db = firebase.firestore()

async function cadastrarCliente(e){
    e.preventDefault();
    
    const $nome = document.getElementById("cliente").value
    const $telefone = document.getElementById("telefone").value

    let id = Math.abs(Math.round(Math.random() * (1 - 1000)))
    const cliente = {
        id: id,
        nome: $nome,
        telefone: $telefone
    }

    try {
        await db.collection('clientes').doc('cliente'+ id).set(cliente)
        alert('Cliente salvo com sucesso')
        document.getElementById("cliente").value = ""
        document.getElementById("telefone").value = ""
    }catch (error) {
        console.log(error)
    }
} 

document.getElementById("btnCliente").addEventListener('click', cadastrarCliente)

async function cliCads(){
    //e.preventDefault()
    const doc = await db.collection('clientes')
    const dados = await doc.get()
    dados.forEach(cliente => {
        let html = `
        <tr>
        <th scope="row">${cliente.data().id}</th>
        <td>${cliente.data().nome}</td>
        <td>${cliente.data().telefone}</td>
        <td><button type="button" class="btn btn-danger" onclick="excluir(${cliente.data().id})">Excluir</button></td>
      </tr>
        `
        document.getElementById('cliCads').innerHTML += html
    });
}


async function excluir(id){
    try {
        await db.collection('clientes').doc('cliente'+id).delete()
        alert('Cliente Excluido')
    } catch (error) {
        console.log(error)
    }
}