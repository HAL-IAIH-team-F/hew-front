"use client";
import * as THREE from "three";
import {Manager} from "../manager/manager";
import {gsap} from "gsap";
import Effects from "../effects/camera/Effects";

export const showProduct = (
    clickedBubble: THREE.Mesh,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    manager: Manager,
    effects: Effects
) => {
    const group = new THREE.Group();

    const closeButtonTexture = new THREE.TextureLoader().load("/close.png");
    const closeButtonMaterial = new THREE.SpriteMaterial({ map: closeButtonTexture });
    const closeButton = new THREE.Sprite(closeButtonMaterial);

    const htmlBox = document.createElement("div");
    const imagePath = (clickedBubble as any).texturePath;

    htmlBox.style.position = "absolute";
    htmlBox.style.width = "800px";
    htmlBox.style.height = "100%";
    htmlBox.style.right = "-800px";
    htmlBox.style.top = "0px";
    htmlBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    htmlBox.style.color = "#FFF";
    htmlBox.style.borderLeft = "1px solid #FFF";
    htmlBox.style.padding = "20px";
    htmlBox.style.display = "flex";
    htmlBox.style.flexDirection = "column";
    htmlBox.style.opacity = "0";
    htmlBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    htmlBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>タイトル</h2>
            <button id="closeButton" style="background: none; border: none; color: #FFF; font-size: 24px; cursor: pointer;">&times;</button>
        </div>
        <p>商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明</br>商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明</p>
        <img src="${imagePath}" style="width: 100%; border-radius: 5px; margin-top: 10px;" />
    `;
    document.body.appendChild(htmlBox);

    effects.productAnimesionOpen(camera,clickedBubble,htmlBox)

    const onClick = (event: MouseEvent) => {
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(closeButton);

        if (intersects.length > 0) {
            closePanel();
        }
    };

    const closePanel = () => {
        const tl = gsap.timeline();
        tl.to(camera.position,
        {
          x: 0,
          duration: 1.5,
          ease: 'power2.out',
        });
        gsap.timeline()
            .to(group.scale, {
                x: 0,
                duration: 0.7,
                ease: "power2.in",
                onComplete: () => {
                    scene.remove(group);
                    if (document.body.contains(htmlBox)) {
                        document.body.removeChild(htmlBox);
                    }
                },
            });

        gsap.to(htmlBox, {
            right: "-400px",
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                if (document.body.contains(htmlBox)) {
                    document.body.removeChild(htmlBox);
                }
                manager.update.animstate("idle");
            },
        });
    };

    window.addEventListener("click", onClick);

    const closeButtonHtml = document.getElementById("closeButton");
    if (closeButtonHtml) {
        closeButtonHtml.addEventListener("click", closePanel);
    }

    return () => {
        window.removeEventListener("click", onClick);
        if (document.body.contains(htmlBox)) {
            document.body.removeChild(htmlBox);
        }
    };
};
