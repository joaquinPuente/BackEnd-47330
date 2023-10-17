(function () {
    const socket = io();

    socket.emit('new-message', 'Este es mi saludo con emit')

})();