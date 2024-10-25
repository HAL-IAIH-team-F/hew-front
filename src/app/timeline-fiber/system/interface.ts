import * as THREE from 'three';
import { Canvas, useThree,useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo, useState } from 'react';
import {Effects } from "../effects/camera/Effects"

import { Manager } from "./manager";

export type ManagerRef = { value: Manager['value']; update: Manager['update'] };
export type BubbleMesh = THREE.Mesh & { sessionId?: number; bubbleId?: number };


export interface BubblesProps {
  manager: ManagerRef;
  bubblesRef: React.MutableRefObject<BubbleMesh[]>;
}

export interface GlowingGomiProps {
    manager: ManagerRef;
    glowingGomiRef: React.MutableRefObject<THREE.Mesh[]>;
}
  
export interface EffectsComposerProps {
    manager: ManagerRef;
    effectsRef: React.MutableRefObject<Effects | null>;
    bubbles: React.MutableRefObject<THREE.Mesh[]>;
}

export interface AnimationProps {
  manager: ManagerRef;
  bubbles: React.MutableRefObject<THREE.Mesh[]>;
}