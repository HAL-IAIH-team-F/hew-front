import * as THREE from "three";
import {ProductRes} from "~/res/ProductRes";

export interface BubbleMesh extends THREE.Mesh {
    stopAnimation: () => void;
    startAnimation: () => void;
    texturePath: string;
    sessionId: number;
    bubbleId: number;
    productRes: ProductRes;
}