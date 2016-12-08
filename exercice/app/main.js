var PI = Math.PI;
var PI2 = PI * 2;
var RAD = PI / 180;
function lerp ( t, a, b ){ return a + t * ( b - a ); }
function norm( t, a, b ){return ( t - a ) / ( b - a );}
function map( t, a0, b0, a1, b1 ){ return lerp( norm( t, a0, b0 ), a1, b1 );}

var w, h, scene, camera, controls, renderer;
var ground, grass, rock, deer;

function init(){

    w = window.innerWidth;
    h = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 60, 16 / 9, 1, 10000 );
    camera.position.set( -40, 10, 25 );

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );

    // postprocessing
    post_processing.init( renderer, scene, camera );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 35;
    controls.maxDistance = 100;
    controls.minPolarAngle = RAD * 10;
    controls.maxPolarAngle = RAD * 90;
    controls.target.y = 10;

    window.addEventListener( "resize", resize );
    resize();

    //charge les objets
    console.log( "load geometries" );
    var urls = [
        'res/deer.obj',
        'res/grass.obj',
        'res/rock.obj'
    ];
    geometries.load( urls, initTextures );

}

function initTextures(){

    //charge les textures
    console.log( "load textures" );
    var urls = [
        'res/deer.jpg',
        'res/environment.png',
        'res/grass.jpg',
        'res/ground_0.jpg',
        'res/rock_diffuse.jpg',
        'res/rock_normal.jpg'
    ];
    textures.load( urls, initLights );
}

function initLights(){

    //charge et crée les lumières
    console.log( "init lights" );
    lights.init( scene, creaeObjects );

}

function creaeObjects(){

    //les géométries et les textures sont chargées
    //on peut créer des matériaux et des meshes
    console.log( "create objects" );
    var config = [
        {
            name:"deer",
            params:{ map:textures.deer}
        },
        {
            name:"environment",
            params:{ map:textures.environment }
        },
        {
            name:"grass",
            params:{ map:textures.grass }
        },
        {
            name:"ground",
            params:{ map:textures.ground_0}
        },
        {
            name:"rock",
            params:{
                map:textures.rock_diffuse,
                normalMap: textures.rock_normal
            }
        }
    ];

    //ajoute un brouillard de distance
    scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );


    //initialise les matériaux qui seront utillisé par les objets
    materials.init( config );

    //crée le bichon
    deer.init( scene );

    //crée l'arrière plan
    environment.init( scene );

    //crée le terrain
    ground.init();
    scene.add( ground.mesh );

    //ajooute les cailloux
    rocks.init();
    scene.add( rocks.group );

    //ajoute la végétation
    grass.init( renderer, ground, rocks );
    scene.add( grass.group );

    //lance une boucle de mise à jour
    update();

}

function update(){

    requestAnimationFrame( update );

    controls.update();

    // renderer.render( scene, camera );

    post_processing.render();

}

function resize(){

    w = window.innerWidth;
    h = window.innerHeight;

    renderer.setSize(w,h);

    post_processing.setSize(w,h);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

}

window.onload = function(){
    init();
};