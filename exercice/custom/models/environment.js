var environment = function( exports ){

    var mesh, material;
    exports.init = function( scene ){

        material = materials.environment;
        mesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 1,128,64 ), material );
        material.blending = THREE.AdditiveBlending;
        material.transparent = true;

        mesh.scale.multiplyScalar( -1000 );
        scene.add( mesh );
        exports.start();

    };

    //animation
    var raf;
    exports.stop = function(){ cancelAnimationFrame(raf); };
    exports.start = function(){ exports.stop(); update(); };
    function update(){
        raf = requestAnimationFrame(update);
        material.opacity =  .35;// + .25 * Math.sin( Date.now() * 0.001 );
        mesh.rotation.x -= RAD * .01;
        mesh.rotation.y -= RAD * .01;

    }


    return exports;

}({});