var lights = function(exports){

    exports.init = function( scene, onComplete ){

        shaderLoader.load( [

            "finished/glsl/skydome_vert.glsl",
            "finished/glsl/skydome_frag.glsl"

        ],
        function(){

            createSky( scene );
            createLight( scene );

            if( onComplete )onComplete();
        } );
    };

    function createSky( scene ){

        //dome de lumière
        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.9 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 500, 0 );
        scene.add( hemiLight );

        // arrire plan dégradé
        var uniforms = {
            topColor:    { value:hemiLight.color },
            bottomColor: { value: new THREE.Color( 0xffffff ) },
            offset:      { value: 1000 },
            exponent:    { value: 0.6 }
        };

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

        //ajoute des ombres à cette lumière

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

    return exports;

}( {} );
