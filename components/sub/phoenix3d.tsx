"use client";

import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, useAnimations } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

function PhoenixModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/phoenix_bird.glb');
  const { actions, mixer } = useAnimations(animations, group);

  // Custom animation if the model doesn't have built-in animations
  useEffect(() => {
    if (animations.length === 0) {
      // Wing animation with proper type checking
      const wings = scene.children.filter((child): child is THREE.Mesh => {
        return child instanceof THREE.Mesh && 
               child.name.toLowerCase().includes('wing');
      });

      const animate = () => {
        const time = Date.now() * 0.001;
        wings.forEach(wing => {
          wing.rotation.z = Math.sin(time) * 0.2;
          if (wing.position) {
            wing.position.y = Math.sin(time) * 0.1;
          }
        });
        requestAnimationFrame(animate);
      };

      animate();
    } else {
      // Play all available animations
      Object.values(actions).forEach(action => {
        if (action) {
          action.play();
          action.setLoop(THREE.LoopRepeat, Infinity);
        }
      });
    }

    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, animations.length, mixer, scene.children]);

  // Add subtle floating animation to the entire model
  useEffect(() => {
    const floatAnimation = () => {
      if (group.current) {
        const time = Date.now() * 0.001;
        group.current.position.y = Math.sin(time) * 0.1;
        group.current.rotation.y += 0.002;
      }
      requestAnimationFrame(floatAnimation);
    };

    const animationFrame = requestAnimationFrame(floatAnimation);

    // Cleanup animation frame on unmount
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={2}
        position={[0, 0, 0]} 
      />
    </group>
  );
}

export const Phoenix3D = () => {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <Stage environment="sunset" intensity={1}>
          <PhoenixModel />
        </Stage>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Suspense>
    </Canvas>
  );
};

export default Phoenix3D;

// // Add type declaration for the GLTF model to avoid issues
// declare module '*.glb' {
//   const content: string;
//   export default content;
// }