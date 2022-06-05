import { useFBX } from '@react-three/drei';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React, { useEffect } from "react";
import { useFrame, useThree } from '@react-three/fiber';


const Camera = (props) => {
    const { camera } = useThree();

    useEffect(() => {
        //Set initial positions
        initCamera();
    }, []);

    useFrame((state) => {
        //Perform updates
        state.camera.updateProjectionMatrix();
    });

    function initCamera() {
        setLookAt(props.lookAt);
        setPosition(props.x, props.y, props.z);
    }

    function setLookAt(lookAtVector) {
        camera.lookAt(lookAtVector);
    }

    function setPosition(x, y, z) {
        camera.position.setX(x);
        camera.position.setY(y);
        camera.position.setZ(z);
    }

    return null;
}

const CameraController = (props) => {
    const { camera, gl } = useThree();

    useEffect(() => {
        const controller = new OrbitControls(camera, gl.domElement);
        controller.minDistance = 100;
        controller.maxDistance = 300;
        return () => {
            controller.dispose();
        }
    }, [camera, gl]);
    return null;
}

const FBXModel = (props) => {
    const fbxModel = useFBX(props.fbxModelPath);

    return <primitive object={fbxModel} position={props.position} scale={props.scale}/>
}

export {
    Camera,
    CameraController,
    FBXModel
}