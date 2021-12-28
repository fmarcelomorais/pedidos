
  function atualiza(){        
    window.location.reload()
    //pedidos()
  }
   (function(){
     const firebaseConfig = {
      apiKey: "AIzaSyCPD19C98vGIgDcn58p_T4VVZASpjosjjs",
      authDomain: "pedidos-cacca.firebaseapp.com",
      projectId: "pedidos-cacca",
      storageBucket: "pedidos-cacca.appspot.com",
      messagingSenderId: "411154805586",
      appId: "1:411154805586:web:70b1938230b795abb6008b"
    };
  
     firebase.initializeApp(firebaseConfig);
  })()
    const db = firebase.firestore()

  async function pedidos(){
    ///const db = firebase.firestore()    
    const ped = await db.collection('pedidos')
    const dadosPed = await ped.get()
    
    dadosPed.forEach((pedido) => { 
              
        let html = `
        <th scope="row">${pedido.data().id}</th>
        <td>${pedido.data().data}</td>
        <td>${pedido.data().cliente}</td>
        <td>R$ ${Number(pedido.data().valor).toFixed(2)}</td>
        <td>
        <button class="btn btn-primary m-1" onclick="mostrarProdutos(${pedido.data().id})">Ver</button>
        <button class="btn btn-danger" hidden>Excluir</button>
        </td>
        </tr>
        `      
        
        document.getElementById('pedidoCads').innerHTML += html
      });
  }

  async function mostrarProdutos(id){  
      let prod = await db.collection('pedidos')
        .doc(`pedido${id}`).get()
      let produtos = [] 
      produtos.push(...prod.data().produto)
      let x = produtos.reduce((acc, i) => {        
        return acc += `${i.produto}\n `
      },'')
      swal({
        title: "Produtos",
        text: x,
        icon: "success",
      })
   }



// Cadastrar Pedido

//cadastrarProduto('colonia', 19.99)
//cadastrarCliente('Elidiane', '85989659856')

