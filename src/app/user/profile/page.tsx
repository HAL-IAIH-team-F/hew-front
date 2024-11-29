"use client";

import React, { useEffect } from 'react';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DirectionalLight } from 'three';

const ProfilePage: React.FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            init();
        }
    }, []);

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let orbitControls: OrbitControls;
    let water: Water;
    let sky: Sky;
    let sunSphere: THREE.Vector3;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
        camera.position.set(0, 5, 15);
        scene.add(camera);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color(0x87CEEB));

        const canvasContainer = document.querySelector('#canvas_vr');
        if (canvasContainer) {
            canvasContainer.appendChild(renderer.domElement);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        setupScene();
        rendering();
    }

    function setupScene() {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        water = new Water(waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('/img/water/water_texture.jpg', (texture) => {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            alpha: 0.9,
            waterColor: 0x1ca3ec,
            distortionScale: 3.7,
            fog: scene.fog !== undefined,
        });
        if (!water || !water.material || !water.material.uniforms) {
            console.error('Water object or its uniforms are not initialized properly');
            return;
        }
        water.rotation.x = -Math.PI / 2;
        water.position.y = -5;
        scene.add(water);

        sky = new Sky();
        if (!sky || !sky.material || !sky.material.uniforms) {
            console.error('Sky object or its uniforms are not initialized properly');
            return;
        }
        const skyUniforms = sky.material.uniforms;
        sky.scale.setScalar(450000);
        scene.add(sky);

        sunSphere = new THREE.Vector3();
        setSunPosition(10, 0.005, 0.8);

        const directionalLight = new DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 2);
        scene.add(directionalLight);

        orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.5;
        orbitControls.maxPolarAngle = Math.PI * 0.495;
        orbitControls.minDistance = 5.0;
        orbitControls.maxDistance = 50.0;
    }

    function setSunPosition(turbidity: number, mieCoefficient: number, mieDirectionalG: number) {
        if (!sky || !sky.material || !sky.material.uniforms) {
            console.error('Sky object or uniforms are not properly initialized');
            return;
        }

        const uniforms = sky.material.uniforms;
        if (uniforms) {
            uniforms['turbidity'].value = turbidity;
            uniforms['rayleigh'].value = 2;
            uniforms['mieCoefficient'].value = mieCoefficient;
            uniforms['mieDirectionalG'].value = mieDirectionalG;

            const theta = Math.PI * -0.5;
            const phi = 2 * Math.PI * 0.5;
            sunSphere.x = 4000 * Math.cos(phi);
            sunSphere.y = 4000 * Math.sin(phi) * Math.sin(theta);
            sunSphere.z = 4000 * Math.sin(phi) * Math.cos(theta);

            uniforms['sunPosition'].value.copy(sunSphere);
        } else {
            console.error('Sky material uniforms are not available');
        }
    }

    function rendering() {
        requestAnimationFrame(rendering);
        orbitControls.update();
        if (water && water.material && water.material.uniforms) {
            water.material.uniforms['time'].value += 1.0 / 120.0;
        }
        renderer.render(scene, camera);
    }

    return <div id="canvas_vr" style={{ width: '100%', height: '100vh' }} />;
};

export default ProfilePage;
