import { useFBX, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React, { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const origin = new THREE.Vector3(0,0,0);

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
        
        controller.minDistance = props.minDistance;
        controller.maxDistance = props.maxDistance;
        controller.minPolarAngle = props.minPolarAngle;
        controller.maxPolarAngle = props.maxPolarAngle;
        controller.minAzimuthAngle = props.minAzimuthAngle;
        controller.maxAzimuthAngle = props.maxAzimuthAngle;

        return () => {
            controller.dispose();
        }
    }, [camera, gl]);
    return null;
}

const FBXModel = (props) => {
    const meshref = useRef(null);
    const fbxModel = useFBX(props.fbxModelPath);
    
    function test() {
        var temp = new THREE.Vector3();
        fbxModel.getWorldPosition(temp)

        centerObjectAtDestination(fbxModel, new THREE.Vector3(0,0,0))
    }

    return (
        <mesh ref={meshref} onClick={()=>test()}>
            <primitive object={fbxModel} position={props.position} scale={props.scale}/>
        </mesh>
    )
}

const GLTFModel = (props) => {
    const gltfModel = useGLTF(props.gltfModelPath);

    return (
        <Suspense fallback={null}>
            <primitive object={gltfModel.scene} />
        </Suspense>
    )
}

/*********************************************/
// UTILITY FUNCTIONS FOR OBJECT MANIPULATION //
/*********************************************/


function getObjectBoundingBoxSize(object) {
    var boundingBox = new THREE.Box3().setFromObject(object.getObjectById(object.id));
    var objectDimensionVector = new THREE.Vector3().subVectors(boundingBox.max, boundingBox.min);

    return objectDimensionVector;
}

function getObjectWorldPosition(object) {
    var destVector = new THREE.Vector3();
    object.getWorldPosition(destVector);
    
    return destVector;
}

function centerObjectAtDestination(object, destination) {
    var sizeVector = getObjectBoundingBoxSize(object);
    var objPosVector = getObjectWorldPosition(object);
    var deltaVector = new THREE.Vector3();

    console.log(sizeVector.x)
    if (!deltaVector.subVectors(sizeVector.divideScalar(2), destination).equals(origin)) {
        console.log(objPosVector)
        console.log(deltaVector)
    }
}

export {
    Camera,
    CameraController,
    FBXModel,
    GLTFModel
}