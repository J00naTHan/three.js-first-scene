import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// cria a cena para adição dos objetos e define a câmera perspectiva a ser usada
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, // campo de visão (FOV)
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // distância mínima de renderização
    1000 // distância máxima de renderização
);

// instancia o renderizador WebGL, define o tamanho da tela, o looping de animação e adiciona o canvas na página
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// cria controles orbitais para a câmera e ativa suavização no movimento dela
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// define um plano de fundo na cor preta e o posiciona mais ao fundo
const planeGeometry = new THREE.PlaneGeometry(40, 16);
const planeMaterial = new THREE.MeshBasicMaterial({color: '#000000', side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.z = -10;
scene.add(plane);

// define uma figura esférica e a posiciona
const sphere_geometry = new THREE.SphereGeometry(2, 30, 30);
const sphere_material = new THREE.MeshBasicMaterial({color: 0x00ff});
const sphere = new THREE.Mesh(sphere_geometry, sphere_material);
sphere.position.x = -7.5;
scene.add(sphere);

// define uma figura cúbica e a posiciona
const cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cube_geometry, cube_material );
scene.add( cube );

// define uma figura cônica e a posiciona
const cone_geometry = new THREE.ConeGeometry(1.5, 2, 30);
const cone_material = new THREE.MeshBasicMaterial({color: 0xff0000});
const cone = new THREE.Mesh(cone_geometry, cone_material);
cone.position.x = 7.5;
scene.add(cone);

// estabele a posição da câmera com uma menor profundidade, afastando-as levemente das figuras para que todas sejam visíveis
camera.position.z = 12;

// define um fator de escala externo que será modificado durante o loop de animação (iniciado em 0 para fornecer um tempo extra até o início das transformações
let scale_factor = 0;

// loop de animação
function animate() {
    // rotaciona o cubo e o cone nos seus 3 eixos incessantemente
    cube.rotation.x += 0.01;
    cone.rotation.x -= 0.01;
    cube.rotation.y += 0.01;
    cone.rotation.y -= 0.01;
    cube.rotation.z += 0.01;
    cone.rotation.z -= 0.01;

    // conta até aproximadas 100 iterações até o início das transformações de escala (menos para o eixo y do cone)
    if (scale_factor <= 1) {
        scale_factor += 0.01;
        cone.scale.y += 0.01;
    // quando o fator está menor que 2x, começa a aumentar a esfera e o cubo de tamanho em todas as dimensões
    } else if (scale_factor <= 2) {
        sphere.scale.set(scale_factor, scale_factor, scale_factor);
        cube.scale.set(scale_factor, scale_factor, scale_factor);
        scale_factor += 0.01;
    // aproveita o incremento levar até 2.01 para gerar uma lógica de retrocesso (com mais uma lógica de timer)
    } else if (scale_factor >= 2 && scale_factor <= 3) {
        scale_factor += 0.01;
        // garante que o fator será maior ou igual (e não apenas igual) pois JS tem problemas com ponto flutuante
        // após o fator chegar em um valor limite, todos objetos voltam ao normal, e o fator é resetado, reiniciando o loop
        if (scale_factor >= 3) {
            sphere.scale.set(1, 1, 1);
            cube.scale.set(1, 1, 1);
            cone.scale.set(1, 1, 1);
            scale_factor = 1;
        }
    }

    // atualiza os controles orbitais
    controls.update();
    // renderiza a cena com base na câmera
    renderer.render( scene, camera );
}