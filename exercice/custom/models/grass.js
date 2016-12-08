var grass = function( exports ) {


    var group, material;
    exports.init = function( scene, ground, rocks ){

        group = new THREE.Object3D();
        exports.group = group;
        scene.add( group );

        var mesh = new THREE.Mesh( geometries.grass, materials.grass );
        group.add( mesh );

    };

    return exports;

}({});