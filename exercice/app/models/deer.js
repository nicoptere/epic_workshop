var deer = function( exports ) {


    var group, material;
    exports.init = function( scene ){



        var mesh = new THREE.Mesh( geometries.deer, materials.deer );
        // materials.deer.side = THREE.DoubleSide;

        var vertices = mesh.geometry.getAttribute( "position" ).array;
        var buffer = new Uint16Array( vertices.length / 3 );
        for( var i = 0; i < vertices.length; i+= 3 ){

            buffer[i] = i;
            buffer[i+1] = i + 2;
            buffer[i+2] = i + 1;

        }
        var indices = new THREE.BufferAttribute( buffer,1 );
        geometries.deer.setIndex( indices );

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add( mesh );

    };

    return exports;

}({});