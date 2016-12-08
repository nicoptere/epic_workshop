var environment = function( exports ){

    var mesh, material;
    exports.init = function( scene ){

        material = materials.environment;
        mesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 1,128,64 ), material );
        scene.add( mesh );

    };
    return exports;

}({});