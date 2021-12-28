//const db = firebase.firestore()

async function cadastrarCliente(e){
    e.preventDefault();
    
    const $nome = document.getElementById("cliente").value
    const $telefone = document.getElementById("telefone").value
    if($nome == '' && $telefone == '') {
        swal({text:'Nome do Cliente é obrigatório', icon:'warning'})
    }else{

        let id = Math.abs(Math.round(Math.random() * (1 - 1000)))
        const cliente = {
            id: id,
            nome: $nome ,
            telefone: $telefone == '' ? 'Sem Telefone' : $telefone
        }
    
        try {
            await db.collection('clientes').doc('cliente'+ id).set(cliente)
            swal(`Cliente ${id}`, 'Cadastrado com Sucesso', 'success')
            document.getElementById("cliente").value = ""
            document.getElementById("telefone").value = ""
        }catch (error) {
            console.log(error)
        }
        //atualiza()
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
        <th scope="row" id="tdId">${cliente.data().id}</th>
        <td id="tdNome">${cliente.data().nome}</td>
        <td id="tdTelefone">${cliente.data().telefone}</td>
        <td>
        <button type="button" class="btn btn-warning  m-1" id="altera${cliente.data().id}" onclick="alterar(${cliente.data().id})">Editar</button>
        <button type="button" class="btn btn-danger" onclick="excluir(${cliente.data().id})">Excluir</button>
        </td>
      </tr>
        `
        document.getElementById('cliCads').innerHTML += html
    });
}

async function alterar(id){
    try {
        let a = await db.collection('clientes').doc('cliente'+id).get()
        document.getElementById("id").value = a.data().id
        document.getElementById("cliente").value = a.data().nome
        document.getElementById("telefone").value = a.data().telefone
        document.getElementById(`altera${id}`).setAttribute('class', 'btn btn-success')
        document.getElementById(`altera${id}`).setAttribute('onclick', 'salvar()')
        document.getElementById(`altera${id}`).innerHTML = 'Salvar'

    } catch (error) {
        console.log(error)
    }
}

async function salvar(){
   const id = document.getElementById("id").value
   const nome = document.getElementById("cliente").value
   const telefone = document.getElementById("telefone").value
   const cliente = {
        id:  id,
        nome: nome,
        telefone: telefone
    }

    try {
        await db.collection('clientes').doc('cliente'+id).set(cliente)
        swal(`Cliente ${id}`, 'Alterado com Sucesso','success')
        document.getElementById("cliente").value = ""
        document.getElementById("telefone").value = ""
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
        await db.collection('clientes').doc('cliente'+id).delete()
        swal(`Cliente ${id}`, 'Excluido com Sucesso', 'success')
    } catch (error) {
        console.log(error)
    }
    //atualiza()
}