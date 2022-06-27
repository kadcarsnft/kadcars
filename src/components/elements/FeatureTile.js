import React from 'react';
import classNames from 'classnames';
import Image from './Image';

const FeatureTile = ({ header, subheader, description, image, imageFill, orientation }) => {
    return (
        <div className="split-item">
            <div className={`split-item-content center-content-mobile ${orientation}`} data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                    { header }
                </div>
                <h3 className="mt-0 mb-12">
                    { subheader }
                </h3>
                <p className="m-0">
                    { description }
                </p>
            </div>
            <div className={
                classNames(
                    'split-item-image center-content-mobile reveal-from-bottom',
                    imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                    src={require('./../../assets/images/features-split-image-01.png')}
                    alt="Features split 01"
                    width={528}
                    height={396} />
            </div>
        </div>
    )
}

export {
    FeatureTile
}