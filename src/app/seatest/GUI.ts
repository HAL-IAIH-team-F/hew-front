import { Sky, Water } from "three-stdlib";
import { GUI } from "lil-gui";
import * as THREE from "three";
import { EffectComposer } from "three-stdlib";
import { FilmPass, UnrealBloomPass } from "three-stdlib";

interface SeaParams {
  distortionScale: number;
  waterColor: string;
  reflectionIntensity: number;
}

interface SkyParams {
  skeyColor: string;
}

interface PostProcessingParams {
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  filmNoiseIntensity: number;
  filmScanlineIntensity: number;
}

interface CameraParams {
    cameraX: number;
    cameraY: number;
    cameraZ: number;
    lookAtX: number;
    lookAtY: number;
    lookAtZ: number;
}
  

export const createCombinedGUI = (
  water: Water,
  composer: EffectComposer,
  bloomPass: UnrealBloomPass,
  filmPass: FilmPass,
  camera: THREE.PerspectiveCamera
) => {
  const gui = new GUI();
  const SkyParams: SkyParams = {
    skeyColor: "#000000",
  }
  // Sea parameters
  const seaParams: SeaParams = {
    distortionScale: 1.5,
    waterColor: "#00aaff",
    reflectionIntensity: 1.0,
  };

  // Post-processing parameters
  const postProcessingParams: PostProcessingParams = {
    bloomStrength: bloomPass.strength,
    bloomRadius: bloomPass.radius,
    bloomThreshold: bloomPass.threshold,
    filmNoiseIntensity: 0.5,
    filmScanlineIntensity: 0.05,
  };
  // Camera parameters
  const cameraParams: CameraParams = {
    cameraX: camera.position.x,
    cameraY: camera.position.y,
    cameraZ: camera.position.z,
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0, 
  };

  const skyFolder = gui.addFolder("Sky Setting")

  // Create folders to organize the GUI
  const seaFolder = gui.addFolder('Sea Settings');
  const postProcessingFolder = gui.addFolder('Post-Processing Settings');
  const cameraFolder = gui.addFolder('Camera Settings');

  // Sea settings
  seaFolder.add(seaParams, "distortionScale", 0, 10, 0.1).onChange((value: number) => {
    water.material.uniforms["distortionScale"].value = value;
  });

  seaFolder.addColor(seaParams, "waterColor").onChange((value: string) => {
    water.material.uniforms["waterColor"].value.set(value);
  });

  seaFolder.add(seaParams, "reflectionIntensity", 0, 2, 0.1).onChange((value: number) => {
    water.material.uniforms["reflectionIntensity"].value = value;
  });

  // Post-processing settings
  postProcessingFolder.add(postProcessingParams, "bloomStrength", 0, 3, 0.1).onChange((value: number) => {
    bloomPass.strength = value;
  });

  postProcessingFolder.add(postProcessingParams, "bloomRadius", 0, 1, 0.01).onChange((value: number) => {
    bloomPass.radius = value;
  });

  postProcessingFolder.add(postProcessingParams, "bloomThreshold", 0, 1, 0.01).onChange((value: number) => {
    bloomPass.threshold = value;
  });

  postProcessingFolder.add(postProcessingParams, "filmNoiseIntensity", 0, 1, 0.01).onChange((value: number) => {
    filmPass.uniforms["nIntensity"].value = value;
  });

  postProcessingFolder.add(postProcessingParams, "filmScanlineIntensity", 0, 1, 0.01).onChange((value: number) => {
    filmPass.uniforms["sIntensity"].value = value;
  });

// Camera settings
  cameraFolder.add(cameraParams, "cameraX", -500, 500, 1).onChange((value: number) => {
    camera.position.x = value;
  });
  cameraFolder.add(cameraParams, "cameraY", -500, 500, 1).onChange((value: number) => {
    camera.position.y = value;
  });
  cameraFolder.add(cameraParams, "cameraZ", -500, 500, 1).onChange((value: number) => {
    camera.position.z = value;
  });
  cameraFolder.add(cameraParams, "lookAtX", -500, 500, 1).onChange((value: number) => {
    camera.lookAt(new THREE.Vector3(value, cameraParams.lookAtY, cameraParams.lookAtZ));
  });
  cameraFolder.add(cameraParams, "lookAtY", -500, 500, 1).onChange((value: number) => {
    camera.lookAt(new THREE.Vector3(cameraParams.lookAtX, value, cameraParams.lookAtZ));
  });
  cameraFolder.add(cameraParams, "lookAtZ", -500, 500, 1).onChange((value: number) => {
    camera.lookAt(new THREE.Vector3(cameraParams.lookAtX, cameraParams.lookAtY, value));
  });

  // Open both folders by default
  seaFolder.open();
  postProcessingFolder.open();
  cameraFolder.open();

  return gui;
};
