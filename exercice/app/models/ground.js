var ground = function( exports ) {

    var mesh, material;
    exports.init = function( radius, height ){

        exports.radius = radius = radius || 50;
        exports.height = height = height || .25;

        textures.ground_0.wrapS = textures.ground_0.wrapT = THREE.RepeatWrapping;
        textures.ground_0.repeat.multiplyScalar( 6 );

        mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 32, 32, 0, PI, 0, PI), materials.ground );
        // mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 6), materials.ground);

        mesh.receiveShadow = true;
        mesh.rotateX( -PI / 2 );
        mesh.scale.z = height;
        mesh.position.y = -radius * height;
        exports.mesh = mesh;

        /*
        // on va avoir besoin de manipuler des textures sur la vertex shader
        // ce qui n'est pas toujours supporté. il faut donc vérifier si cette
        // opération est possible
        //https://github.com/KhronosGroup/WebGL/blob/90ceaac0c4546b1aad634a6a5c4d2dfae9f4d124/conformance-suites/1.0.0/extra/webgl-info.html
        var gl = renderer.getContext();
        if( gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) == 0 ) {
            throw new Error( "vertex shader cannot read textures" );
        }

        shaderLoader.load([
            "app/glsl/ground_vert.glsl",
            "app/glsl/ground_frag.glsl"
        ], function () {

            textures.load( [
                'res/ground_0.jpg',
                'res/ground_1.jpg',
                'res/noise.png'
            ], onTexturesLoaded );

        });
         //*/

    };

    function onTexturesLoaded() {

        textures.ground_0.wrapS = textures.ground_0.wrapT = THREE.RepeatWrapping;
        textures.ground_1.wrapS = textures.ground_1.wrapT = THREE.RepeatWrapping;
        textures.noise.wrapS = textures.noise.wrapT = THREE.RepeatWrapping;

        material = new THREE.ShaderMaterial({
            uniforms: {
                ground_0: {type: "t", value: textures.ground_0},
                ground_1: {type: "t", value: textures.ground_1},
                noise: {type: "t", value: textures.noise},
                repeat: {type: 'f', value: 10},
                time: {type: 'f', value: 0 }
            },
            vertexShader:   shaderLoader.ground_vert,
            fragmentShader: shaderLoader.ground_frag,
        });

        mesh.material = material;
    }

    //animation
    var raf;
    exports.stop = function(){ cancelAnimationFrame(raf); };
    exports.start = function(){ exports.stop(); update(); };
    function update(){
        raf = requestAnimationFrame(update);
        material.uniforms.time.value = Math.sin( Date.now() * 0.001 );
    }

    return exports;

}({});