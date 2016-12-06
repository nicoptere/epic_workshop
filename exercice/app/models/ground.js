var ground = function( exports ) {

    var mesh, material;
    exports.init = function( radius, height ){

        exports.radius = radius = radius || 50;
        exports.height = height = height || .25;

        textures.ground_0.wrapS = textures.ground_0.wrapT = THREE.RepeatWrapping;
        textures.ground_0.repeat.multiplyScalar( 10 );

        mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 64, 128, 0, PI, 0, PI), materials.ground );
        // mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 4), new THREE.MeshBasicMaterial({map: textures.ground_0}));

        mesh.receiveShadow = true;

        mesh.rotateX( -PI / 2 );
        mesh.scale.z = height;
        mesh.position.y = -radius * height;

        /*
        shaderLoader.load([
            "app/glsl/ground_vs.glsl",
            "app/glsl/ground_fs.glsl"
        ], function () {

            textures.load( [
                'res/ground_0.jpg',
                'res/ground_1.jpg',
                'res/noise.png'
            ], onTexturesLoaded );

        });
        //*/
        exports.mesh = mesh;

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
            vertexShader: shaderLoader.ground_vs,
            fragmentShader: shaderLoader.ground_fs

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