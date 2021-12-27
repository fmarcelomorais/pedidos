
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
     
     async function pedidos(){
       const db = firebase.firestore()
       const ped = await db.collection('pedidos')
       const dadosPed = await ped.get()

       dadosPed.forEach(pedido => { 

         let html = `
         <th scope="row">${pedido.data().id}</th>
         <td>${pedido.data().data}</td>
         <td>${pedido.data().cliente}</td>
         <td>R$ ${pedido.data().valor}</td>
         <td><button class="btn btn-primary m-1" hidden>Produtos</button>
         <button class="btn btn-danger">Excluir</button></td>
         </tr>
         `      
         document.getElementById('pedidoCads').innerHTML += html

       });
     }



// Cadastrar Pedido

//cadastrarProduto('colonia', 19.99)
//cadastrarCliente('Elidiane', '85989659856')

