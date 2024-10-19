"use client";
import * as THREE from "three";
import { Manager } from "../manager/manager"
import { gsap } from "gsap";

export const showProduct = (clickedBubble: THREE.Mesh, scene: THREE.Scene, camera: THREE.PerspectiveCamera , manager: Manager) => {
    gsap.to(clickedBubble.position, {
      x: camera.position.x - 80,
      y: camera.position.y,
      z: camera.position.z - 200,
      duration: 1.5,
      ease: "power2.inOut",
    });
    const boxGeometry = new THREE.PlaneGeometry(400, 200);
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: 0x95CCFF,
      transparent: true,
      opacity: 0,
    });
  
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    const group = new THREE.Group();
    group.add(box);
  
    box.position.x = 150;
  
    group.position.set(camera.position.x - 150, camera.position.y, camera.position.z - 250);
  
    const closeButtonTexture = new THREE.TextureLoader().load('/close.png');
    const closeButtonMaterial = new THREE.SpriteMaterial({ map: closeButtonTexture });
    const closeButton = new THREE.Sprite(closeButtonMaterial);
  
    closeButton.scale.set(15, 15, 1);
    closeButton.position.set(330, 80, 0.1);
  
    group.add(closeButton);
  
    group.scale.set(0, 1, 1);
    scene.add(group);
    gsap.timeline({
      onComplete: function() {
      gsap.to(htmlBox.style, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });
      }
    })
    .to(group.scale, { x: 1, duration: 1, ease: "power2.out" })
    .to(box.material, { opacity: 1, duration: 1.5, ease: "power2.out" }, "<");
    const htmlBox = document.createElement('div');
    htmlBox.style.position = 'absolute';
    htmlBox.style.width = '400px';
    htmlBox.style.height = '200px';
    htmlBox.style.backgroundColor = 'rgba(255, 8, 255, 0)';
    htmlBox.style.borderRadius = '10px';
    htmlBox.style.padding = '20px';
    htmlBox.style.display = 'flex';
    htmlBox.style.justifyContent = 'center';
    htmlBox.style.alignItems = 'center';
    htmlBox.style.opacity = '0'; 
    htmlBox.innerHTML = '<p>5000円</p>';
    document.body.appendChild(htmlBox);
    
    const updateHtmlPosition = () => {
      const vector = new THREE.Vector3();
      box.getWorldPosition(vector);
      vector.project(camera);
  
      const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
      const y = (1 - (vector.y * 0.5 + 0.5)) * window.innerHeight;
  
      htmlBox.style.left = `${x - 50}px`; 
      htmlBox.style.top = `${y - 100}px`; 
    };
    
  
    const animate = () => {
      requestAnimationFrame(animate);
      updateHtmlPosition();
    };
    animate();
  
    const onClick = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
  
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(closeButton);
  
      if (intersects.length > 0) {
        gsap.to(clickedBubble.position, {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z - 200,
          duration: 2,
          ease: "power4.inOut",
        });
        gsap.timeline()
          .to(box.material, { opacity: 0, duration: 1, ease: "power2.in" })
          .to(group.scale, {
            x: 0,
            duration: 0.7,
            ease: "power2.in",
            onComplete: () => {
              scene.remove(group);
              if (document.body.contains(htmlBox)) {
                document.body.removeChild(htmlBox); // Remove HTML element
              }
            },
          }, "<");
  
        // Fade out HTML box
        gsap.to(htmlBox.style, {
          opacity: 0, // Fade out
          duration: 0.5, // Same duration as the 3D box fade out
          ease: "power2.in",
          onComplete: () => {
            // Check if htmlBox is still a child of document.body before attempting to remove it
            if (document.body.contains(htmlBox)) {
              document.body.removeChild(htmlBox); // Remove HTML element after fade out
            }
            manager.update.animstate("idle");
          },
        });
      }
    };
  
    window.addEventListener('click', onClick);
  
    return () => {
      window.removeEventListener('click', onClick);
      document.body.removeChild(htmlBox);
    };
  };