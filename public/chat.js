$(function() {
    var socket = io.connect(window.location.hostname);
    socket.on('data', function(data) {
        
        var total = data.total;
        for (var key in data.symbols) {
            var val = data.symbols[key] / total;
            if (isNaN(val)) {
                val = 0;
            }
            $('#content').append('<p>Something</p>');
        }
     
    });
})