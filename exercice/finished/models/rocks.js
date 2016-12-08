
var rocks = function (exports) {

    var group;
    exports.init = function( scene ){

        //conteneur pour les futurs objets
        group = new THREE.Object3D();
        exports.group = group;
        scene.add( group );

        //charge une scène faite avec https://threejs.org/editor/
        var xhr = new XMLHttpRequest();
        xhr.onload = distributeObjects;
        xhr.open( "GET", "res/scene.json" );
        xhr.send();

    };

    function createRock( matrix ){

        var mesh = new THREE.Mesh( geometries.rock, materials.rock );
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix = false;

        var m = new THREE.Matrix4();
        m.fromArray(matrix);
        mesh.matrix = m;
        group.add( mesh );

    }

    function distributeObjects( e ){

        var json = JSON.parse( e.target.responseText );
        json.object.children.forEach( function(item ){
            if( item.name.toLowerCase().indexOf( "sphere") == -1 ){
                createRock( item.matrix  );
            }
        });

    }

    return exports;
}({});
