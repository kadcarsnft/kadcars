import { Children } from "react"
import Image from "./Image"

const FeatureItem = ({ children, description, labelName }) => {
    return (
        <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
            <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16" style={{width:'70px', height: '70px'}}>
                        { children }
                    </div>
                </div>
                <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                        { labelName }
                    </h4>
                    <p className="m-0 text-sm">
                        { description }
                    </p>
                </div>
            </div>
        </div>
    )
}

export {
    FeatureItem
}