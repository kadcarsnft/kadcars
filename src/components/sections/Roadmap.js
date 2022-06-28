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
  IoGameController,
  IoSettingsSharp
} from 'react-icons/io5';
import {
  FaFlagCheckered
} from 'react-icons/fa';

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
    title: 'Kadcars\' 2022 Roadmap',
    paragraph: ''
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container" style={{ marginTop: '80px' }}>
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <FeatureItem labelName={"Q3"}
              list={[
                "Launch initial Kadcars site",
                "Launch contract mainnet",
                "Initial K:2 Kadcar reveal",
                "Upgrade website aesthetics",

              ]}
            >
              <IoRocketSharp color='white' size={'4vh'} />
            </FeatureItem>
            <FeatureItem labelName={"Q4"}
              list={[
                "Customize NFT view on chain",
                "Interactive Garage feature",
                "Initial K:1 Kadcar reveal"
              ]}
            >
              <IoCarSportSharp color='white' size={'4vh'} />
            </FeatureItem>
            <FeatureItem labelName={"Q1"}
              list={[
                "Launch initial game demo",
                "Race against other players",
                "Level up your Kadcar NFT",
                "Update your Kadcar parts",
                "Draft KIP:1337 & KIP:31337"
              ]}
            >
              <IoGameController color='white' size={'4vh'} />
            </FeatureItem>
            {/* <FeatureItem labelName={"Q2"}  list={[]}>
              <IoGameController color='white' size={'4vh'}/>
            </FeatureItem> */}
            {/* <FeatureItem labelName={"November"} list={["Combine NFTs with kadcars", "Other exciting things coming!"]}>
              <FaFlagCheckered color='white' size={'4vh'}/>
            </FeatureItem> */}
          </div>
        </div>
      </div>
    </section>
  );
}

Roadmap.propTypes = propTypes;
Roadmap.defaultProps = defaultProps;

export default Roadmap;