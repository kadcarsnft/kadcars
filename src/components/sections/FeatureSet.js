import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import { FeatureTile } from './FeatureTile';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeatureSet = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Workflow that just works',
    paragraph: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <FeatureTile header={"Feature 1"} subheader={"Subheader 1"} description={"generic description"} imageFill={imageFill} orientation={"reveal-from-left"}/>
            <FeatureTile header={"Feature 2"} subheader={"Subheader 2"} description={"generic description"} imageFill={imageFill} orientation={"reveal-from-right"}/>
            <FeatureTile header={"Feature 3"} subheader={"Subheader 3"} description={"generic description"} imageFill={imageFill} orientation={"reveal-from-left"}/>
            <FeatureTile header={"Feature 4"} subheader={"Subheader 4"} description={"generic description"} imageFill={imageFill} orientation={"reveal-from-right"}/>
          </div>
        </div>
      </div>
    </section>
  );
}

FeatureSet.propTypes = propTypes;
FeatureSet.defaultProps = defaultProps;

export default FeatureSet;