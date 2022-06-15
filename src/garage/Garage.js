import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Loader, useFBX } from '@react-three/drei';
import React, { Suspense, useContext, useEffect, useRef, useState } from "react";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import GameMenu from "../games/GameMenu";
// import BENZ from '../assets/images/benz/benz.fbx';
// import BENZ2 from '../../public/scene.gltf';
import MODEL from '../assets/models/1.fbx';
import { DEFAULT_GARAGE_CAMERA_FOV } from "./GarageConstants";
import { MaterialLoader } from 'three';
import { Camera, CameraController, FBXModel, GLTFModel, OBJModel } from '../utils/SceneUtils';
import { KadcarGameContext } from '../components/kadcarcomponents/KadcarGameContextProvider';

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const Garage = () => {
    const { myKadcars } = useContext(KadcarGameContext);
    const [kadcarFbxModels, setKadcarFbxModels] = useState([]);

    useEffect(() => {
        function preloadUserKadcarModels() {
            // myKadcars.foreach((kadcarNft) => {

            // });
        }
        myKadcars && preloadUserKadcarModels();
    }, [myKadcars])

    function preloadUserKadcarModels() {
        myKadcars.foreach((kadcarNft) => {

        });
    }

    return (
        <div style={{ flexDirection: 'column', position: 'absolute', alignContent: 'center', width: '100vw', height: '100vh', display: 'flex' }}>
            <Canvas>
                <Suspense fallback={null}>
                    <Camera x={150} y={100} z={300} lookAt={new THREE.Vector3(0, 0, 0)} />
                    <CameraController 
                        minDistance={300} 
                        maxDistance={400} 
                        minAzimuthAngle={0} 
                        maxAximuthAngle={Math.PI}
                        minPolarAngle={Math.PI/3} 
                        maxPolarAngle={Math.PI/2.5}
                        enableZoom={true}
                        enablePan={false}
                    />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[-10, -10, -10]} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

                    <FBXModel fbxModelPath={MODEL} position={[0,0,0]} scale={1.6} />
                    {/* <OBJModel objFilePath={MODEL} position={[-700,0,500]}/> */}
                    {/* <GLTFModel gltfModelPath={'/benz.gltf'} scale={75}/> */}
                    <primitive object={new THREE.AxesHelper(500)} />
                </Suspense>
            </Canvas>
            <Loader/>
        </div>
    )
}

export {
    Garage
}