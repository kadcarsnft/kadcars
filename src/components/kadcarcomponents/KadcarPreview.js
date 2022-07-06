import { useContext } from "react"
import { KadcarCardExpanded } from "./kadcarCard/KadcarCard";
import { KadcarGarageContext } from "./KadcarGarageContextProvider";
import { Camera, CameraController, FBXModel, GLTFModel } from "../../graphics/SceneUtils";
import MODEL from '../../assets/models/1.fbx';
// import GLTF from '../../assets/models/untitled.glb'
// import GLTF from '../../assets/models/separate.gltf'
import GLTF from '../../assets/models/embedded.gltf'
import { Loader } from "three";
import { BaseCanvas } from "../../graphics/BaseCanvas";
import { Model } from "../../graphics/Model";

const KadcarPreview = () => {
    const { selectedKadcar } = useContext(KadcarGarageContext);

    return (
        <div style={{ width: '100vw', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', position: 'absolute' }}>
            <div
                style={{
                    width: '100vw',
                    height: '100%',
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
                        <Model>
                            {/* <FBXModel fbxModelPath={MODEL} scale={1} /> */}
                            <GLTFModel gltfModelPath={GLTF} scale={100} />
                        </Model>
                    </BaseCanvas>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: '90%', width: '1px', backgroundColor: 'gray', opacity: '60%' }} />
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