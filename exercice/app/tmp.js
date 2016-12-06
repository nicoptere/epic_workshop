var w = window.innerWidth;
var h = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, w/h, 1, 10000 );
camera.position.set( -10,4,10 );

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( w,h );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.target.set(1.5752513044408298,4.144077362993549,0.044311631345676526);

var ground = new THREE.Mesh( new THREE.PlaneGeometry( 100,100 ), new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 10 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );


function addMesh(p, c){
    var m = new THREE.Mesh( new THREE.SphereGeometry( 1 ), new THREE.MeshBasicMaterial({color:c||0xFF0000}));
    scene.add( m )
    if( p ) m.position.copy( p )
    return m;
}
var deer;



var tl = new THREE.TextureLoader();


// var objLoader = new THREE.OBJLoader();
// objLoader.load( "../../res/animals/deer.obj", function( e ){
// objLoader.load( "../../res/grass/grass.obj", function( e ){
var JSONLoader = new THREE.JSONLoader();
JSONLoader.load( "../../res/elk.app", function( e ){

    console.log( e )

    var m = new THREE.Mesh(e, new THREE.MeshBasicMaterial({color:0xFF0000}) );
    scene.add( m );

    return;

    deer = e.children[0];

    // var material = new THREE.MeshPhongMaterial( { color: 0x555555, specular: 0x111111, shininess: 10, side:THREE.DoubleSide } );
    // deer.material = material;
    // deer.castShadow = true;
    // deer.receiveShadow = true;

    //deer.geometry.computeFaceNormals();

    var scale = .1;
    deer.geometry.computeBoundingBox();
    var bb = deer.geometry.boundingBox;
    console.log( bb );

    addMesh(bb.min, 0x00FF00);
    addMesh(bb.max, 0x0000FF);

    var ce = bb.min.add( bb.max.clone().sub( bb.min ).multiplyScalar( .5 ) ).multiplyScalar(scale);
    console.log( ce );
    addMesh(ce);

    deer.position.sub( ce );
    deer.position.y += ( bb.max.y - bb.min.y ) * .5  * scale;



    deer.geometry.computeBoundingSphere();
    var bs = deer.geometry.boundingSphere;
    console.log( bs );


    // deer.position.sub( deer.geometry.boundingSphere.center.multiplyScalar( .5 * scale ) );
    deer.scale.multiplyScalar( scale );
    //

    var material = new THREE.MeshBasicMaterial( { color: 0x555555 } );//, specular: 0x111111, shininess: 10, side:THREE.DoubleSide } );
    deer.material = material;
    scene.add( deer );
    console.log( deer );
    tl.load( "../../res/grass/grass.jpg", function(tex) {

        material.map = tex;
        tex.needsUpdate = true;
        update();
        /*
        tl.load( "../../res/deer/normal.jpg", function(nor) {

            deer.material.normalMap = nor;
            nor.needsUpdate = true;

            tl.load( "../../res/deer/bump.jpg", function(bum) {

                deer.material.displacementMap = bum;
                deer.material.displacementScale = 10;
                deer.material.displacementBias = 0;
                bum.needsUpdate = true;

            } );
        });
        //*/
    } );
});

var t = new THREE.Texture
function update(){

    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame(update);
}

var count = 3;
for( var i = 0; i < count; i++){
    var a = i * Math.PI * 2 / count;
    var r = 20;
    var x = Math.cos( a ) * r;
    var z = Math.sin( a ) * r;
    // createLight( 0xFFEEDD, 1000, x, 25, z );
}
// wh.distance = 1000;
function createLight( color, dist, x, y, z ){

    var light = new THREE.SpotLight(color||0xFFFFFF, 1, dist||100, Math.PI / 4, .5 );
    light.castShadow = true;
    // light.shadow.camera.near = 1;
    // light.shadow.camera.far =  dist||100;
    light.shadow.bias = 0.0001;
    light.shadow.darkness = 0.2;
    light.shadow.mapSize.width  = light.shadow.mapSize.height = 2048;
    light.position.x = x || 0;
    light.position.y = y || 15;
    light.position.z = z || 0;
    scene.add( light );
    return light;
}