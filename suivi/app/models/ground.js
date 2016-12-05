var ground = function(){

    function c( scene ){

        textures.load( [
            'res/ground_0.png',
            'res/ground_1.png',
            'res/noise.png'
        ]);

        var m = new THREE.ShaderMaterial(
        {
            uniforms : {

            },
            vertexShader : vs,
            fragmentShader : fs

        });

    }

    return c;
}();