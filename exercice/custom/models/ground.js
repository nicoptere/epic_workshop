var ground = function( exports ) {

    var mesh, material;
    exports.init = function( scene, radius, height ) {

        exports.radius = radius = radius || 50;
        exports.height = height = height || .25;

        mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 6), materials.ground );

        scene.add(mesh);

        exports.mesh = mesh;
    };
    return exports;

}({});