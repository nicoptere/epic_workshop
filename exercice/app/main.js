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
    camera.position.set( -38.11485540374866, 11.733462175878932, 26.280040826937498 );

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
    document.body.appendChild( renderer.domElement );

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
        'res/grass.jpg',
        'res/ground_0.jpg',
        'res/rock_diffuse.jpg',
        'res/rock_normal.jpg',
        'res/rock_specular.jpg'
    ];
    textures.load( urls, creaeObjects );
}

function creaeObjects(){

    //les géométries et les textures sont chargées
    //on peut créer des matériaux et des meshes
    console.log( "create objects" );
    var config = [
        {
            name:"deer",
            params:{ map:textures.deer }
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
                // normalMap: textures.rock_normal,
                // displacementMap:textures.rock_specular,
                // displacementScale:10,
                // displacementBias:0
            }
        }
    ];
    materials.init( config );//synchrone, les materiaux sont disponibles immédiatement


    deer.init( scene );

    ground.init();
    scene.add( ground.mesh );

    rocks.init();
    scene.add( rocks.group );

    grass.init( renderer, ground, rocks );
    scene.add( grass.group );

    initLights();

}

function initLights(){

    console.log( "init lights & start" );

    //lance une boucle de mise à jour
    lights.init( scene, update );

}

function update(){
    requestAnimationFrame( update );
    controls.update();
    renderer.render( scene, camera );
}

function resize(){

    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w,h);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

}
init();