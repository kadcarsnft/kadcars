import { useFBX, useGLTF, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useDrag } from '@use-gesture/react';

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
    return (
        <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={props.autoRotateSpeed ? props.autoRotateSpeed : 0.0}
            minAzimuthAngle={props.minAzimuthAngle}
            maxAzimuthAngle={props.maxAzimuthAngle}
            minPolarAngle={props.minPolarAngle}
            maxPolarAngle={props.maxPolarAngle}
            enableRotate={props.enableRotate}
            minDistance={props.minDistance}
            maxDistance={props.maxDistance}
            enableZoom={props.enableZoom}
            enablePan={props.enablePan}
      />
    )
}

const FBXModel = (props) => {
    const primRef = useRef(null);
    const fbxModel = useFBX(props.fbxModelPath);
    const { gl, raycaster, mouse } = useThree();
    
    // const drag = useDrag(({ pressed, dragging, movement: [deltaX, deltaY]}) => {
    //     meshref.current.rotation.y += deltaY;

    // });

    function test(event) {
        console.log(event)
        var temp = new THREE.Vector3();
        fbxModel.getWorldPosition(temp)

        centerObjectAtDestination(fbxModel, new THREE.Vector3(0,0,0))
    }

    return (
        // <mesh {...drag()} ref={meshref} onClick={(event)=>test(event)}>
            <primitive ref={primRef} object={fbxModel} position={props.position} scale={props.scale} rotation={props.rotation}/>
        //</mesh>
    )
}

const OBJModel = (props) => {
    const objModel = useLoader(OBJLoader, props.objFilePath)
    return (
        <primitive object={objModel} position={props.position} scale={props.scale}/>
    )
}

const GLTFModel = (props) => {
    const gltfModel = useGLTF(props.gltfModelPath);

    // useFrame(() => {
    //     const lid = gltfModel.scene.getObjectByName('Object096');
    //     lid.rotation.y += 0.002
    // })

    useEffect(() => {
        console.log(dumpObject(gltfModel.scene).join('\n'))
        console.log(gltfModel.scene.getObjectByName('Object096'))
    }, [])

    return (
        <Suspense fallback={null}>
            <primitive object={gltfModel.scene} scale={props.scale}/>
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

    if (!deltaVector.subVectors(sizeVector.divideScalar(2), destination).equals(origin)) {
    }
}

/*************************************/
// UTILITY FUNCTIONS FOR INFORMATION //
/*************************************/

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '??????' : '??????';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '??? ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
        const isLast = ndx === lastNdx;
        dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
}

export {
    Camera,
    CameraController,
    FBXModel,
    GLTFModel,
    OBJModel
}