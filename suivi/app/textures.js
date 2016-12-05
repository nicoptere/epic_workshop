var textures = function( exports ){

    var loader, queue, name, onComplete;

    exports.load = function( urls, callback ){

        loader = new THREE.TextureLoader();
        onComplete = callback;
        queue = urls || [];
        loadNext();

    };

    function loadNext(){

        if( queue.length == 0 ){

            console.log( exports );
            if( onComplete )onComplete();
            return;

        }

        var url = queue.shift();

        var bits = url.split( '/' );
        name = bits[ bits.length - 1 ].split('.')[0];

        loader.load( url, onLoaded );

    }

    function onLoaded( texture ){

        exports[ name ] = texture;
        loadNext();
        
    }

    return exports;

}( {} );