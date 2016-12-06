var grass = function( exports ) {


    var group, material;
    exports.init = function( renderer, ground, rocks ){

        // on va avoir besoin de manipuler des textures sur la vertex shader
        // ce qui n'est pas toujours supporté. il faut donc vérifier si cette
        // opération est possible
        //https://github.com/KhronosGroup/WebGL/blob/90ceaac0c4546b1aad634a6a5c4d2dfae9f4d124/conformance-suites/1.0.0/extra/webgl-info.html
        var gl = renderer.getContext();
        if( gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) == 0 ) {
            throw new Error( "vertex shader cannot read textures" );
        }

        group = new THREE.Object3D();
        exports.group = group;

        /*
        var mesh = new THREE.Mesh( geometries.grass, materials.grass );

        //recentre le mesh des plantes
        var geom = geometries.grass;
        geom.computeBoundingBox();

        //ce est lme centre de la bounding box
        var bbox = geom.boundingBox;
        var center = bbox.min.add( bbox.max.clone().sub( bbox.min ).multiplyScalar( .5 ) );

        //si on soustrait le centre de la bounding box, ça recentre le mesh
        mesh.position.sub( center );

        //et on le décale en hauteur pour qu'il soit posé sur le sol
        mesh.position.y += ( bbox.max.y - bbox.min.y );
        group.add( mesh );
        //*/

        centerGeometry( geometries.grass, .1 );

        var scale = new THREE.Vector2( .35,1.1 );
        distributeObjects( ground, 200, scale );


    };


    function centerGeometry( geom, scale ){

        //recentre le mesh des plantes
        geom.computeBoundingBox();

        //ce est lme centre de la bounding box
        var bbox = geom.boundingBox;
        var center = bbox.min.add( bbox.max.clone().sub( bbox.min ).multiplyScalar( .5 ) );
        var height = ( bbox.max.y - bbox.min.y );

        //itère sur chaque entrée des vertices
        var attr = geom.getAttribute( "position" );

        for( var i =0; i < attr.array.length; i += 3 ){

            //repositionne
            attr.array[ i ] -= center.x;

            attr.array[ i + 1 ] -= center.y;
                attr.array[ i + 1 ] += height;

            attr.array[ i + 2 ] -= center.z;

            //re scale
            attr.array[i] *= scale;
            attr.array[i+1] *= scale;
            attr.array[i+2] *= scale;

        }

    }

    function distributeObjects( ground, count, scale ){

        var center = new THREE.Vector3(0,ground.radius * ground.height,0);
        var earthCenter = new THREE.Vector3(0,-ground.radius * 10,0);

        for( var i = 0; i < count; i++ ){

            var mesh = new THREE.Mesh( geometries.grass, materials.grass );
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            var lat = ( Math.sqrt( Math.random() ) )* Math.PI / 2;
            var lon = Math.random() * Math.PI * 2;

            mesh.position.set( Math.sin( lat ) * Math.sin( lon ),
                            Math.cos( lat ) * ground.height,
                            Math.sin( lat ) * Math.cos( lon ) ).multiplyScalar( ground.radius ).sub( center );

            mesh.lookAt( earthCenter );
            mesh.rotateX( - Math.PI / 2 );
            mesh.scale.multiplyScalar( lerp( Math.random(), scale.x, scale.y ) );
            group.add( mesh );

        }
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