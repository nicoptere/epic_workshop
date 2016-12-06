var lights = function(exports){

    var lights = [];

    exports.init = function( scene, onComplete ){

        shaderLoader.load( [
                "app/glsl/skydome_vs.glsl",
                "app/glsl/skydome_fs.glsl"
            ],
            function(){
                createSky( scene );
            } );

        createLight( scene );

        if( onComplete )onComplete();

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
            vertexShader: shaderLoader.skydome_vs,
            fragmentShader: shaderLoader.skydome_fs,
            side: THREE.BackSide } );
        var sky = new THREE.Mesh( skyGeo, skyMat );
        scene.add( sky );

    }
    function createLight( scene ){
        // /*
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
        dirLight.shadow.bias = -0.0001;
        dirLight.shadow.darkness = 0.2;

        scene.add( dirLight );
        return dirLight;
        //*/
        /*
        var light = new THREE.SpotLight( 0xFFFFFF, 1, 100, Math.PI / 4, .5 );
        light.shadow.camera.near = 1;
        light.shadow.camera.far =  100;


        light.castShadow = true;
        light.shadow.bias = 0.0001;
        light.shadow.darkness = 0.2;
        light.shadow.mapSize.width  = light.shadow.mapSize.height = 2048;

        light.position.x = 0;
        light.position.y = 150;
        light.position.z = 0;
        scene.add( light );
        //*/
    }
    exports.animate = function(){

    };

    return exports;

}( {} );
