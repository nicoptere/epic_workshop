var post_processing = function( exports ){

    var composer, rt, renderPass, bloom, shift, vignette, ssao, fxaa, startTime;

    exports.init = function( renderer, scene, camera, w, h ){

        //on crée des "passes" ; des couches d'effets

        //cette passe dessine simplement la scène dans une texture
        renderPass = new THREE.RenderPass( scene, camera );

        //applique un anti alias
        fxaa = new THREE.ShaderPass(THREE.FXAAShader);
        fxaa.uniforms.resolution.value.set( 1 / w, 1 / h );

        //assombrit les coins de l'écran
        vignette = new THREE.ShaderPass( THREE.VignetteShader );
        // vignette.uniforms.offset.value = 1;
        // vignette.uniforms.darkness.value = 2;

        //cette passe disperse les canaux de couleur
        shift = new THREE.ShaderPass( THREE.RGBShiftShader );
            // shift.uniforms.amount.value = 0.0015;
            // shift.uniforms.angle.value = 0;

        //renforce les ombres
        ssao = new THREE.ShaderPass( THREE.SSAOShader );
            // ssao.uniforms.cameraNear.value = 10;
            // ssao.uniforms.cameraFar.value = 100;
            // ssao.uniforms.onlyAO.value = 0;
            // ssao.uniforms.aoClamp.value = .5;
            // ssao.uniforms.lumInfluence.value = .5;

        //blOOOOOOOOm...
        bloom = new THREE.UnrealBloomPass(new THREE.Vector2(w,h), 3.5, 0.4, 0.85);//1.0, 9, 0.5, 512);

        //stocke les passes dans un certain ordre
        var passes = [
            renderPass,
            // shift,
            // ssao,
            // bloom,
            vignette,
            fxaa,
        ];

        //on affichera le résultat de la pile d'effets
        passes[ passes.length - 1 ].renderToScreen = true;

        //on crée un composer qui va exécuter toutes les passes à la suite et afficher le résultat
            //rt = new THREE.WebGLRenderTarget( THREE.Math.nextPowerOfTwo(w), THREE.Math.nextPowerOfTwo(h) );
        composer = new THREE.EffectComposer( renderer );//, rt );

        //on ajoute les passes de rendu
        passes.forEach( function( pass ){
            composer.addPass( pass );
        } );

        startTime = Date.now();

    };

    exports.setSize = function( w,h ){
        composer.setSize(w,h);
        fxaa.uniforms.resolution.value.set(1/w, 1/h);
    };

    exports.render = function(){

        //bloom.strength = 4 * ( Math.sin( Date.now() * 0.001 ) * .5 + .5 );
        //bloom.radius = ( Math.cos( Date.now() * 0.001 ) * .5 + .5 );

        // https://www.shadertoy.com/view/lsf3WH
        // shift.uniforms.angle.value += RAD;
        // shift.uniforms.amount.value = ( Math.sin( shift.uniforms.angle.value ) * .5 + .5 ) * .1;

        composer.render(0.05);
    };

    return exports;
}({});