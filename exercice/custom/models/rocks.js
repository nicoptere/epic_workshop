
var rocks = function (exports) {

    var group;
    exports.init = function( scene ){

        //conteneur pour les futurs objets
        group = new THREE.Object3D();
        exports.group = group;
        scene.add( group );

        var mesh = new THREE.Mesh( geometries.rock, materials.rock );
        group.add( mesh );

    };

    return exports;
}({});
