import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DisintegratingCube = () => {
  const groupRef = useRef();

  // Create grid of cubes
  const gridSize = 8;
  const cubeSize = 0.4;
  const spacing = 0.45;
  const totalSize = gridSize * spacing;
  const offset = -totalSize / 2 + spacing / 2;

  // We memoize the initial positions and properties of each small cube
  const cubes = useMemo(() => {
    const tempCubes = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // Calculate initial position in the big cube
          const initialX = x * spacing + offset;
          const initialY = y * spacing + offset;
          const initialZ = z * spacing + offset;

          // Randomize velocity and rotation for the disintegration effect
          const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          );

          // Outer cubes move faster than inner ones
          const distFromCenter = Math.sqrt(initialX*initialX + initialY*initialY + initialZ*initialZ);
          velocity.multiplyScalar(distFromCenter * 0.5 + 0.1);

          const rotationSpeed = new THREE.Vector3(
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2
          );

          // Give a small random delay before each cube starts disintegrating
          const delay = Math.random() * 3 + distFromCenter * 1.5;

          tempCubes.push({
            position: new THREE.Vector3(initialX, initialY, initialZ),
            velocity,
            rotationSpeed,
            delay,
            initialScale: 1,
            color: Math.random() > 0.8 ? '#ef4444' : (Math.random() > 0.5 ? '#333333' : '#666666')
          });
        }
      }
    }
    return tempCubes;
  }, [gridSize, spacing, offset]);

  const [matrices] = useState(() => new Float32Array(cubes.length * 16));
  const [colors] = useState(() => new Float32Array(cubes.length * 3));
  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  // Set initial colors
  useEffect(() => {
    if (meshRef.current) {
      cubes.forEach((cube, i) => {
        color.set(cube.color);
        color.toArray(colors, i * 3);
      });
      meshRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colors, 3));
    }
  }, [cubes, colors, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotate the entire group slowly before they disintegrate
    const elapsedTime = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.x = elapsedTime * 0.2;
      groupRef.current.rotation.y = elapsedTime * 0.3;
    }

    // Update each instance
    cubes.forEach((cube, i) => {
      // Disintegration starts after delay
      if (elapsedTime > cube.delay) {
        // Move outwards
        const timeActive = elapsedTime - cube.delay;

        // Speed curve - start slow, then speed up
        const speedMultiplier = Math.min(timeActive * 0.5, 3);

        cube.position.addScaledVector(cube.velocity, delta * speedMultiplier);

        // Scale down over time
        cube.initialScale = Math.max(0, 1 - timeActive * 0.15);
      }

      // Rotate individually
      dummy.position.copy(cube.position);

      if (elapsedTime > cube.delay) {
        dummy.rotation.x += cube.rotationSpeed.x * delta;
        dummy.rotation.y += cube.rotationSpeed.y * delta;
        dummy.rotation.z += cube.rotationSpeed.z * delta;
      }

      dummy.scale.setScalar(cube.initialScale);
      dummy.updateMatrix();

      dummy.matrix.toArray(matrices, i * 16);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, cubes.length]}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </boxGeometry>
        <meshStandardMaterial
          vertexColors={true}
          roughness={0.7}
          metalness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </instancedMesh>
    </group>
  );
};

const messages = [
  "Initializing neural net...",
  "Loading digital assets...",
  "Synthesizing 3D environments...",
  "Disintegrating reality...",
  "Establishing secure connection...",
  "Welcome to the matrix..."
];

const Loader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ef4444" />
          <DisintegratingCube />
        </Canvas>
      </div>

      {/* Loading Text Overlay */}
      <div className="absolute bottom-20 left-0 right-0 text-center z-10">
        <div className="h-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm tracking-widest text-white/80 font-mono uppercase"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Glitch Effect Line */}
        <div className="w-48 h-[2px] bg-red-500/20 mx-auto mt-6 overflow-hidden relative rounded-full">
          <motion.div
            className="w-1/3 h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Progress Text */}
        <div className="mt-4 text-xs font-mono text-red-500/70">
          SYSTEM_BOOT_SEQUENCE_INITIALIZED
        </div>
      </div>
    </div>
  );
};

export default Loader;
