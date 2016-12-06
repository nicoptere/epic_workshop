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
        var mat = new THREE.MeshStandardMaterial(config.params);
        mat.roughness = .75;
        mat.metalness = .05;
        exports[ config.name ] = mat;

    };

    return exports;

}({});