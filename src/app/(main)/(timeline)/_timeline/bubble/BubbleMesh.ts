import * as THREE from "three";
import {ProductRes} from "@/(main)/search/sample/ProductRes";

export interface BubbleMesh extends THREE.Mesh {
    stopAnimation: () => void;
    startAnimation: () => void;
    texturePath: string;
    sessionId: number;
    bubbleId: number;
    productRes: ProductRes;
}