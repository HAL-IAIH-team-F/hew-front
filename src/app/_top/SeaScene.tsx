"use client";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {EffectComposer, RenderPass, UnrealBloomPass, Water} from "three-stdlib";
import gsap from "gsap";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";


function animate(composer: EffectComposer<THREE.WebGLRenderTarget<THREE.Texture>>, water: Water) {
    const animateLoop = () => {
        requestAnimationFrame(animateLoop);
        if (water && water.material && water.material.uniforms) {
            water.material.uniforms["time"].value += 1.0 / 60.0;
        }
        composer.render();
    };
    animateLoop();
}

export function SeaScene(
    {
        requestDescription,
    }: {
        requestDescription: boolean
    }
) {
    const {scene, camera, gl: renderer} = useThree();
    const waterRef = useRef<THREE.Mesh>();
    const isInitialRender = useRef(true);
    const [FilmPass, setFilmPass] = useState<{ constructor: any }>()
    const clientContext = useClientState();
    const routes = useRoutes()

    const handleComplete = () => {
        routes.timeline().transition();
    };

    useEffect(() => {
        import("three-stdlib").then(value => {
            const {FilmPass} = value
            setFilmPass({constructor: FilmPass})
        });
    }, []);

    useEffect(() => {
        if (FilmPass === undefined) return
        scene.background = new THREE.Color(0xbce2e8);
        camera.position.set(0, 20, 316);
        camera.lookAt(-500, 323, -4);

        const pointLight1 = new THREE.PointLight(0xffffff, 1, 1000);
        pointLight1.position.set(100, 100, 100);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1, 1000);
        pointLight2.position.set(-100, -100, -100);
        scene.add(pointLight2);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const waterNormals = new THREE.TextureLoader().load("/water-1.jpg", (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        });

        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        const water = new Water(waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            sunDirection: new THREE.Vector3(0, 0, 0),
            sunColor: 0xffd700,
            waterColor: 0x00b5ff,
            distortionScale: 5.5,
            fog: scene.fog !== undefined,
        });

        water.rotation.x = -Math.PI / 2;
        waterRef.current = water;
        scene.add(water);

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.4,
            0.47,
            0.71
        );

        const filmPass = new FilmPass.constructor(0, 1, 648, false);

        composer.addPass(bloomPass);
        composer.addPass(filmPass);
        animate(composer, water);

        return () => {
            scene.remove(water);
            scene.remove(pointLight1);
            scene.remove(pointLight2);
            scene.remove(ambientLight);
        };
    }, [scene, camera, renderer, FilmPass === undefined]);

    useFrame(() => {
        if (waterRef.current) {
            (waterRef.current.material as any).uniforms["time"].value += 1.0 / 60.0;
        }
    });

    useEffect(() => {

        if (clientContext.state !== "registered") return;
        const tl = gsap.timeline();
        const targetPosition = new THREE.Vector3(
            camera.position.x,
            camera.position.y - 1200,
            camera.position.z
        );

        const lookAtTarget = new THREE.Vector3(-500, 323, -4);
        tl.to(camera.position, {
            y: camera.position.y - 150,
            x: camera.position.x + 100,
            duration: 4.5,
            ease: "expo.in",
            onUpdate: () => {
                camera.lookAt(lookAtTarget);
                if (camera.position.y < 0) {
                    scene.background = new THREE.Color(0x00334d);
                    tl.progress(1).kill();

                }
            },
            onComplete: () => {
                handleComplete();
            },
        })
            .to(
                lookAtTarget,
                {
                    y: targetPosition.y - 1200,
                    duration: 2.5,
                    ease: "expo.in",
                    onUpdate: () => {
                        camera.lookAt(lookAtTarget);
                    },
                },
                "<"
            )
            .to(
                camera,
                {
                    fov: 100,
                    duration: 2.5,
                    ease: "expo.in",
                    onUpdate: () => {
                        camera.updateProjectionMatrix();
                    },
                },
                "<"
            )
            .to(
                camera,
                {
                    fov: 120,
                    duration: 1,
                    ease: "expo.out",
                    onUpdate: () => {
                        camera.updateProjectionMatrix();
                    },
                },
            );
    }, [clientContext.state]);

    useEffect(() => {

        if (isInitialRender.current) {
            setTimeout(() => {
                isInitialRender.current = false;
            }, 10);
            return;
        }

        if (requestDescription) {
            gsap.to(camera.position, {
                y: camera.position.y - 50,
                duration: 2.5,
                ease: "expo.in",
                onUpdate: () => {
                    if (camera.position.y < 0) {
                        scene.background = new THREE.Color(0x00334d);
                    }
                },
            });
        } else {
            gsap.to(camera.position, {
                y: camera.position.y + 50,
                duration: 3,
                ease: "expo.out",
                onUpdate: () => {
                    if (camera.position.y >= 0) {
                        scene.background = new THREE.Color(0xbce2e8);
                    }
                },
            });
        }
    }, [requestDescription]);

    return null;
};
