import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from 'three';
import { Camera, CameraController } from "../utils/SceneUtils";

const BaseCanvas = ({ children }) => {
    return (
        <>
            <Canvas>
                <Suspense fallback={null}>
                    <Camera x={150} y={100} z={300} lookAt={new THREE.Vector3(0, 0, 0)} />
                    <CameraController
                        minDistance={300}
                        maxDistance={400}
                        minAzimuthAngle={0}
                        maxAximuthAngle={Math.PI}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 2.5}
                        enableZoom={true}
                        enablePan={false}
                    />

                    <ambientLight intensity={0.75} />
                    <pointLight position={[-10, -10, -10]} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

                    { children }
                    <primitive object={new THREE.AxesHelper(500)} />
                </Suspense>
            </Canvas>
        </>
    )
}

export {
    BaseCanvas
}