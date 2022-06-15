import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useState } from "react"
import { KadcarCardExpanded } from "../components/kadcarcomponents/kadcarCard/KadcarCard";
import { KadcarGarageContext } from "../components/kadcarcomponents/KadcarGarageContextProvider";
import { Camera, CameraController, FBXModel } from "../graphics/SceneUtils";
import MODEL from '../assets/models/1.fbx';
import { Loader } from "three";
import { BaseCanvas } from "../graphics/BaseCanvas";
import { Model } from "../graphics/Model";

const KadcarPreview = () => {
    const { selectedKadcar } = useContext(KadcarGarageContext);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
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

            <KadcarCardExpanded kadcarNft={selectedKadcar}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginLeft: '20px',
                        marginRight: '20px'
                    }}>
                    <BaseCanvas cameraController={true}>
                        <FBXModel fbxModelPath={MODEL} scale={1} />
                    </BaseCanvas>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        height: '90%',
                        width: '1px',
                        backgroundColor: 'gray',
                        opacity: '60%'
                    }} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '20%',
                        marginTop: '10px',
                        marginBottom: '10px',
                        marginLeft: '10px',
                        marginRight: '10px',
                    }}>
                    <span style={{ textAlign:'left', marginLeft:'10px', marginTop:'20px' }}>Kadcar Information:</span>
                </div>
            </KadcarCardExpanded>
        </div>

    )
}

export {
    KadcarPreview
}