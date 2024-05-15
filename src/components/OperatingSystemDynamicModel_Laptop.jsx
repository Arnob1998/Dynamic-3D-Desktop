import React from 'react'
// import { styles } from "../styles"

import { Suspense, useRef, useState } from "react"
import { Canvas , useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei"
import * as THREE from 'three';
// import { CanvasLoaderPercentage } from './CanvasLoaderPercentage'


const DynamicOSLaptop = () => {
  const gltf = useLoader(GLTFLoader,'./office_pc/scene.gltf');
  gltf.scene.position.set(0, -2.5, -1);

  // Define an array of texture URLs
  const textureUrls = [
    // '../../public/desktop_pc/textures/Material.002_baseColor.png',
    '/os_selection/kali.png',
    '/os_selection/linux.jpg',
    // "../../public/desktop_pc/textures/Tasten_2_baseColor.jpeg"
  ];

  // Initialize state to track the current texture index
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);

  // Create a ref to access the mesh material
  const screenMaterialRef = useRef();

  // Function to change the texture
  const changeTexture = () => {
    const nextTextureIndex = (currentTextureIndex + 1) % textureUrls.length;
    const newTexture = new THREE.TextureLoader().load(textureUrls[nextTextureIndex]);
    screenMaterialRef.current.map = newTexture;
    screenMaterialRef.current.needsUpdate = true;
    setCurrentTextureIndex(nextTextureIndex);
  };

  return (
    <div>
      <div className='h-[500px]'>
        <Canvas frameloop="demand" camera={{position: [50,3,4],  fov: 10}} gl={{ preserveDrawingBuffer: false }}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            {/* <group> */}
              <mesh>
                <primitive object={gltf.scene}/>
                <Environment preset="apartment" />
              </mesh>
            {/* </group> */}
          </Suspense>
          {/*  x,y*/}
          <mesh ref={screenMaterialRef} position={[-1.3, 0.45, 2]} rotation={[0, 0, .09]}>
            {/* depth, h, w */}
            <boxGeometry args={[.3, 3.7, 6.5]} /> 
            <meshStandardMaterial map={new THREE.TextureLoader().load(textureUrls[currentTextureIndex])} />
          </mesh>
          <Preload all/>
        </Canvas>
      </div>
      <div>
        {/* Button to change the texture */}
        <button onClick={changeTexture}>Change Texture</button>
        {/* Create a mesh for the computer screen */}
      </div>
    </div>
  );
};

export default DynamicOSLaptop;