var materials = function( exports ){


    /**
     * crée une série de mateiaux à partir d'un tableau d'objets de configuration
     * @param config
     */
    exports.init = function( configurations ){

        configurations.forEach( function( config ){
            exports.add(config);
        });

    };

    exports.add = function( config ){

        config.params.color = 0xFFFFFF;
        exports[ config.name ] = new THREE.MeshBasicMaterial(config.params);

    };

    return exports;

}({});