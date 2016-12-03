

var scene = new THREE.Scene();
/*
 la scène est un graphe représentant une hiérarchie d'objets 3D.
 elle est maintenue côté CPU et assure le transfert d'objets vers le GPU.
 il peut y avoir plusieurs scènes dans la même application.
 les scènes possèdent une matrice de transformation.
 */


var camera = new THREE.PerspectiveCamera( 60, 16 / 9, 1, 10000 );
/*
 la caméra représente notre "oeil" dans la scène, il permet de choisir ce qu'on regarde.
 il en existe deux types:

    - perspective:
        la caméra "normale", avec un angle d'ouverture variable (focale)
        distorsion des objets en fonction de leur distance
        la plus utilisée dans les environnements 3D "normaux"

    - orthographique:
        une caméra "2D" sans focale, sans profondeur
        rend tous les objets "à plat", sans perspective
        utile pour les UI, les HUD, le post processing

 */


var renderer = new THREE.WebGLRenderer( {/* [+] parameters */} );
/*
 le moteur de rendu, ce qui permet de produire une image de notre scène 3D.
 il existe plusieurs types de moteurs de rendu:

    - Canvas 2D:
        les objets sont calculés, transformés et rendus sur le CPU
        pas d'accéleration matérielle et des artefacts de rendu
        possibilité d'avoir des options de stylisation avancées
        option valide pour des scènes simples, cross platform

     - CSS:
        les objets sont des élément du DOM HTML
        on calcule / assigne uniquement leur matrice de transformation
        le rendu proprement dit est pris en charge par le navigateur, souvent accéléré
        option valide pour des scènes simples, cross platform % prise en charge CSS 3

     - WebGL 2D/3D:
        les objets sont passés au GPU, transformés et rendus avec des shaders
        temps de marshalling non négligeable, meilleurs temps de rendu
        recommandé pour des scènes 2D/3D ayant soit un nombre important d'éléments soit des maillages de grande taille

 le moteur de rendu attend 2 paramètres ; une scène et une caméra.
*/

    document.body.appendChild( renderer.domElement );
    /*
      le renderer WebGL crée un élément canvas, pour voir quelque chose.
      il faut ajouter ce canvas sur la scène.
     */


var geometry = new THREE.CylinderGeometry(6,18,50,64,32,false);
/*
 une géométrie contient des informations sur la partie "physique" d'un objet:
 - les positions des points (vertices)
 - les coordonnées de texture (uvs)
 - les indices de faces: comment connecter les points pour dessiner des triangles
 + des attributs personnalisés
 */


var material = new THREE.MeshBasicMaterial({color:0xFF0000 /*, [+] parameters */});
/*
 un matériau contient des informations sur l'aspect d'un objet.
 il y a un nombre variablme de paramètres.
 certains paramètres nécessitent l'ajout de propiétés géométriques
 */


var mesh = new THREE.Mesh( geometry, material );
/*
  Mesh est un object 3d qui met en relation une géométrie et un matériau.
 */

//on recule l'object sur l'axe Z pour qu'il soit visible par la caméra.
mesh.position.z = -100;
/*
 le mesh maintient une matrice de transformation permettant de positionner, pivoter et mettre l'objet à l'échelle.
 les propiétés sont accessibles via:
    - mesh.position.x/y/z:
        positionne l'objet dans l'espace 3D aux coordonnées passées en paramètres

    - mesh.rotation.x/y/z
        pivote l'objet sur les axes X,Y,Z, les mesures sont en radians (1 RAD = Math.PI/180)

    - mesh.scale.x/y/z
        met à l'échelle sur les axes X,Y,Z, les valeurs doivent toujours être différentes de 0, au moins sur un axe.
 */

    scene.add( mesh );
    //on ajoute le mesh au graphe de la scène
    //NB on peut manipuler le mesh sans qu'il soit ajouté à la scène


renderer.render( scene, camera );
//on appelle un rendu en lui passant la scène et la caméra
