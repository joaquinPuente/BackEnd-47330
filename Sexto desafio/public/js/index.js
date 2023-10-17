document.addEventListener('DOMContentLoaded', function () {
    const socket = io('/realTimeProduct');
  
    socket.on('productos-actualizados', (productos) => {
      const productList = document.querySelector('tbody'); 
      productList.innerHTML = '';
      productos.forEach((producto) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${producto.id}</td>
          <td>${producto.title}</td>
          <td>${producto.description}</td>
          <td>${producto.price}</td>
          <td>${producto.thumbnail}</td>
          <td>${producto.code}</td>
          <td>${producto.stock}</td>
        `;
        productList.appendChild(row);
      });
    });

  socket.on('producto-actualizado', (productoActualizado) => {
    const productRow = document.querySelector(`tr[data-product-id="${productoActualizado.id}"]`);
    if (productRow) {
      productRow.innerHTML = `
        <td>${productoActualizado.id}</td>
        <td>${productoActualizado.title}</td>
        <td>${productoActualizado.description}</td>
        <td>${productoActualizado.price}</td>
        <td>${productoActualizado.thumbnail}</td>
        <td>${productoActualizado.code}</td>
        <td>${productoActualizado.stock}</td>
      `;
    }
  });
  
});
  