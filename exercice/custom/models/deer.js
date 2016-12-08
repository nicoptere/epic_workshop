var deer = function( exports ) {

    exports.init = function( scene ){

        var mesh = new THREE.Mesh( geometries.deer, materials.deer );
        scene.add( mesh );

    };

    return exports;

}({});