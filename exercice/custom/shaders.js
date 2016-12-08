var shaderLoader = function( exports ){

    var loader, queue, name, onComplete;

    exports.load = function( urls, callback ){

        loader = new XMLHttpRequest();
        loader.onload = onLoaded;
        onComplete = callback;
        queue = urls || [];
        loadNext();

    };

    function loadNext(){

        if( queue.length == 0 ){
            if( onComplete )onComplete( exports );
            return;
        }

        var url = queue.shift();
        var bits = url.split( '/' );
        name = bits[ bits.length - 1 ].split('.')[0];

        loader.open( "GET", url );
        loader.send();

    }

    function onLoaded( e ){
        exports[ name ] = e.target.responseText;
        loadNext();
    }

    return exports;

}( {} );