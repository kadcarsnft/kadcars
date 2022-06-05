import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useFBX } from '@react-three/drei';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControls as OrbitControlsDrei} from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import GameMenu from "../games/GameMenu";
import CAR from '../assets/images/bugatti/bugatti/bugatti.obj'
import CAR2 from '../assets/images/mustang/Mustang.obj'
import LIBERTY from '../assets/images/liberty/LibertyStatue/LibertStatue.obj'
import LIBERTYMTL from '../assets/images/liberty/LibertyStatue/LibertStatue.mtl'
import BENZ from '../assets/images/benz/benz.fbx'
import { DEFAULT_GARAGE_CAMERA_FOV } from "./GarageConstants";
import { MaterialLoader } from 'three';

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

function Car() {
    const obj = useLoader(OBJLoader, CAR2)
    return <primitive object={obj}/>
}

function Liberty() {
    const mtl = useLoader(MaterialLoader, LIBERTYMTL)
    const obj = useLoader(OBJLoader, LIBERTY)
    obj.traverse((child) => {
        if (child.isMesh) {
            child.material.map = mtl
        }
    })
    return <primitive object={obj}/>
}

function FBX() {
    const fbx = useFBX(BENZ);
    // console.log(fbx.getWorldPosition())
    return <primitive object={fbx} position={[-100, -100, 100]} scale={1.6}/>
}

const CameraController = (props) => {
    const { camera, gl } = useThree();

    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);

            controls.minDistance = 5;
            controls.maxDistance = 20;
            
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

const Camera = (props) => {
    const ref = useRef();
    const set = useThree((state) => state.set);
    useEffect(() => void set({ camera: ref.current }), []);
    // useFrame(() => ref.current.updateMatrixWorld());
    return <perspectiveCamera ref={ref} {...props}/>;
};

const Garage = () => {

    return (
        <div style={{ flexDirection: 'column', position: 'absolute', alignContent: 'center', width: '100vw', height: '100vh', display: 'flex' }}>
            {/* <Canvas camera={{ position: [0, 5, 0], fov: 50 }}> */}
            <Canvas onCreated={({camera}) => camera.lookAt(-100,-100,100)}>
                {/* <Camera position={[150,50,250]} fov={120} aspect={1920/1080} near={0.1} far={2000}/> */}
                <CameraController position={[10,10,10]}/>
                {/* <Camera lookAt={[0,0,0]} fov={50}/> */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <Box position={[0, 0, 0]} />
                <FBX/>
                <OrbitControlsDrei
                    makeDefault
                    // minAzimuthAngle={0}
                    // maxAzimuthAngle={Math.PI}
                    // minPolarAngle={Math.PI / 3}
                    // maxPolarAngle={Math.PI / 2}
                    enableZoom={true}
                    enablePan={true}
                    zoomSpeed={0.3}
                />
            </Canvas>
        </div>
    )
}

export {
    Garage
}