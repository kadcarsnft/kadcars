import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useState } from "react"
import { KadcarCardExpanded } from "../components/kadcarcomponents/kadcarCard/KadcarCard";
import { KadcarGarageContext } from "../components/kadcarcomponents/KadcarGarageContextProvider";
import { Camera, CameraController, FBXModel } from "../utils/SceneUtils";
import MODEL from '../assets/models/1.fbx';
import { Loader } from "three";
import { BaseCanvas } from "../graphics/BaseCanvas";

const KadcarPreview = () => {

    return (
        <div style={{ width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center' }}>
            <div 
                style={{ 
                    width: '100vw', 
                    height: '100vh', 
                    position: 'absolute', 
                    backgroundColor: 'black', 
                    opacity: '45%', 
                    alignItems: 'center',
                    justifyContent: 'center', 
                    display: 'flex', 
                    zIndex: '998' 
                }}
            />
            <KadcarCardExpanded>
                <BaseCanvas>
                    <FBXModel fbxModelPath={MODEL} scale={1}/>
                </BaseCanvas>
            </KadcarCardExpanded>
        </div>

    )
}

export {
    KadcarPreview
}