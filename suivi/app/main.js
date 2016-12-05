var PI = Math.PI;
var PI2 = PI * 2;
var w, h, scene, camera, controls, renderer;
function init(){

    w = window.innerWidth;
    h = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 60, 16 / 9, 1, 10000 );
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer();
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

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

var ground, deer, grass, rock;
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
            params:{ map:textures.ground_0  }
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

    var radius = 75;
    var height = .1;
    ground = new THREE.Mesh( new THREE.SphereBufferGeometry(radius, 64,128, 0,PI, 0, PI ), materials.ground );
    ground.rotateX( - PI / 2 );
    ground.scale.z = height;
    ground.position.y = -radius * height;
    textures.ground_0.wrapS = textures.ground_0.wrapT = THREE.RepeatWrapping;
    textures.ground_0.repeat.multiplyScalar( 10 );
    scene.add( ground );

    deer = new THREE.Mesh( geometries.deer, materials.deer );
    scene.add(deer);

    grass = new THREE.Mesh( geometries.grass, materials.grass );
    scene.add(grass);

    rock = new THREE.Mesh( geometries.rock, materials.rock );
    scene.add(rock);


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