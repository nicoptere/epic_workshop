var deer = function( exports ) {


    var group, material;
    exports.init = function( scene ){



        var mesh = new THREE.Mesh( geometries.deer, materials.deer );
        materials.deer.side = THREE.DoubleSide;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add( mesh );

    };

    return exports;

}({});