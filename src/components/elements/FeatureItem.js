import { Children } from "react"
import Image from "./Image"

const FeatureItem = ({ children, description, labelName, list }) => {
    return (
        <div className="tiles-item reveal-from-bottom" data-reveal-delay="400" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16" style={{width:'70px', height: '70px', alignItems: 'center'}}>
                        { children }
                    </div>
                </div>
                <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                        { labelName }
                    </h4>
                    {/* <p className="m-0 text-sm">
                        { description }
                    </p> */}
                    <ul style={{ listStyleType: 'disc', textAlign: 'left', width: '100%' }}>
                        {
                            list &&
                            list.map((el) => {
                                return (
                                    <li style={{ textAlign: 'justify' }}>
                                        {el}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export {
    FeatureItem
}