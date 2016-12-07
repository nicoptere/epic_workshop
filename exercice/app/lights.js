var lights = function(exports){

    var lights = [];

    exports.init = function( scene, onComplete ){

        shaderLoader.load( [
                "app/glsl/skydome_vert.glsl",
                "app/glsl/skydome_frag.glsl"
            ],
            function(){
                createSky( scene );
                if( onComplete )onComplete();
            } );

        createLight( scene );

    };

    function createSky( scene ){

        // https://threejs.org/examples/webgl_lights_hemisphere.html

        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.9 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 500, 0 );
        scene.add( hemiLight );

        // SKYDOME

        var uniforms = {
            topColor:    { value: new THREE.Color( 0x0077ff ) },
            bottomColor: { value: new THREE.Color( 0xffffff ) },
            offset:      { value: 1000 },
            exponent:    { value: 0.6 }
        };
        uniforms.topColor.value.copy( hemiLight.color );

        scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
        scene.fog.color.copy( uniforms.bottomColor.value );

        var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
        var skyMat = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            vertexShader: shaderLoader.skydome_vert,
            fragmentShader: shaderLoader.skydome_frag,
            side: THREE.BackSide } );
        var sky = new THREE.Mesh( skyGeo, skyMat );
        scene.add( sky );

    }
    function createLight( scene ){

        var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -1, 1.75, 1 );
        dirLight.position.multiplyScalar( 50 );


        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        var d = 50;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = 0.00001;

        scene.add( dirLight );
    }
    exports.animate = function(){

    };

    return exports;

}( {} );
