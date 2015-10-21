$(function ($) {
    var $addButton = $('#-add-connection'),
    $modal = $('#-add-server-modal'),
    $modalSave = $modal.find('.-save'),
    $serverSelect = $('#-server-selector');

    io.socket.get('/add');
    io.socket.get('/del');

    $serverSelect.on('click', '.-select-server a span', function () {
        var id = $(event.target).parent().data('id');
        io.socket.get('/del', {id: id});
    });

    $modalSave.click(function () {
        var formData = $modal.find('form').serializeArray(),
        server = {};

        for (var i = 0; i < formData.length; ++i) {
            server[formData[i].name] = formData[i].value;
        }
        io.socket.get('/add', server);
    });

    function onDestroy(event) {
        var id = event.id;
        $('li.-select-server a[data-id="' + id + '"]').parent().remove();
        $('.-console-' + id).remove();
    }

    function onCreated(event) {
        var server = event.data;
        $('.-console').not('.-console-' + server.id).hide();
        $('.container-fluid')
            .append(
                $('<pre></pre>')
                    .addClass('-console')
                    .addClass('-console-' + server.id)
                    .text('Console for ' + server.name + ' (' + server.host + ':' + server.port + ')')
            );

        $('<li></li>')
            .addClass('-select-server')
            .append(
                $('<a></a>')
                    .addClass('active')
                    .attr('href', '#' + server.id)
                    .data('id', server.id)
                    .text(server.name)
                    .append(
                    $('<span></span>')
                        .addClass('glyphicon')
                        .addClass('glyphicon-remove')
                        .css('color', 'red')
                )
            )
            .insertBefore($('#-server-selector li.add'));
        $('#-add-server-modal').modal('hide');
    }

    io.socket.on('server', function (event) {
        var action = event.verb;
        switch (action) {
            case 'destroyed':
                onDestroy(event);
                break;
            case 'created':
                onCreated(event);
                break;
        }
    });

    io.socket.on('rcon', function (event) {
        $('#' + event.from).append($('<pre></pre>').text(event.msg));
        $('html, body').scrollTop($(document).height());
    });

    $('form#command').submit(function (event) {
        event.preventDefault();
        var command = $('form#command input').val(),
        autocompletes = JSON.parse(localStorage.getItem('autocomplete')) || [];
        autocompletes.push(command);
        autocompletes = autocompletes.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
        localStorage.setItem('autocomplete', JSON.stringify(autocompletes));
        io.socket.get('/rcon', {serverId: $serverSelect.find('.-select-server.active a').data('id'), command: command});
    });


    $('form#command input').autocomplete({
        minLength: 0,
        position: { my: "left bottom", at: "left top", collision: "flip" },
        source: function( request, response ) {
            var autocompletes = JSON.parse(localStorage.getItem('autocomplete')) || [];
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "i" );
            response( $.grep( autocompletes, function( value ) {
                value = value.label || value.value || value;
                return matcher.test( value );
            }));
        }
    })
});