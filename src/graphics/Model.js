import { useDrag } from "@use-gesture/react";
import { Children, useCallback, useRef, useState } from "react";
import { config, useSpring } from "react-spring";
import { FBXModel } from "./SceneUtils";
import MODEL from '../assets/models/1.fbx';

const Model = ({ children }) => {
    const meshref = useRef(null);
    const [{ x, y }, api] = useSpring(() => ({ x:0, y:0 }));
    const bind = useDrag(({ delta: [deltaX, deltaY] }) => {
        meshref.current.rotation.y += deltaX/100;
    });

    return (
        // <div {...bind()}>
        <mesh {...bind()} ref={meshref}>
            { children }
        </mesh>
        // {/* </div> */}
    )
}

export {
    Model
}