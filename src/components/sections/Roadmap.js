import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import { FeatureItem } from '../elements/FeatureItem';
import { ReactComponent as Test } from './../../assets/images/feature-tile-icon-01.svg'
import { 
  IoRocketSharp, 
  IoCarSportSharp, 
  IoStorefrontSharp, 
  IoGameController 
} from 'react-icons/io5'

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const Roadmap = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: '2022 Roadmap',
    paragraph: ''
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <FeatureItem description={"Kadcars website officially released "} labelName={"Launch"}>
              <IoRocketSharp color='white' size={'4vh'}/>
            </FeatureItem>
            <FeatureItem description={"First collection of Kadcars will be released"} labelName={"Kadcars"}>
                <IoCarSportSharp color='white' size={'4vh'}/>
            </FeatureItem>
            <FeatureItem description={"Launch platform on Marmalade"} labelName={"Marmalade"}>
              <IoStorefrontSharp color='white' size={'4vh'}/>
            </FeatureItem>
            <FeatureItem description={"Launch first game"} labelName={"Game"}>
              <IoGameController color='white' size={'4vh'}/>
            </FeatureItem>
          </div>
        </div>
      </div>
    </section>
  );
}

Roadmap.propTypes = propTypes;
Roadmap.defaultProps = defaultProps;

export default Roadmap;