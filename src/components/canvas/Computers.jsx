import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const groupRef = useRef(); // Référence pour le groupe racine
  const { nodes, animations } = useGLTF("./free__rubiks_cube_3d/scene.gltf");
  const { actions } = useAnimations(animations, groupRef);
  //const texture = useTexture("./marching_cubes/textures/Material_baseColor.png");

  useEffect(() => {
    actions.Animation.play(); // Assurez-vous que le nom 'Animation' correspond au nom réel de votre animation
  }, [actions]);

  return (
    <group ref={groupRef} scale={isMobile ? 0.7 : 0.75}>
      <primitive 
      object={nodes.Sketchfab_Scene} 
      //material={<meshStandardMaterial map={texture} />} 
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas frameloop='demand' shadows dpr={[1, 2]} camera={{ position: [30, 0, 10], fov: 30 }} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <hemisphereLight intensity={0.15} groundColor='black' />
        <spotLight position={[-20, 50, 50]} angle={0.5} penumbra={1} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <pointLight intensity={2} />
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
