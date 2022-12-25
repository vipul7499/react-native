import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Fade from "react-reveal/Fade";
const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
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
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "An Initiative of SIH 2020",
    paragraph:
      "We provide a comprehensive solution to all things period.  Join us to put an end to all your menstrual needs through our three components shown below.",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item">
              <Fade>
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                >
                  {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                  <h3 className="mt-0 mb-12">PAD SOS</h3>
                  <p className="m-0">
                    Connect to women nearby when in need of a sanitary napkin.
                    No more calls, texts and worry. A simple user interface for
                    any and every menstrual emergency. Safe. Simple. Easy
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-from-bottom",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                >
                  <Image
                    src={require("../../assets/images/nature_on_screen.svg")}
                    alt="Features split 01"
                    width={528}
                    height={396}
                  />
                </div>
              </Fade>
            </div>

            <div className="split-item">
              <Fade>
                <div
                  className="split-item-content center-content-mobile reveal-from-right"
                  data-reveal-container=".split-item"
                >
                  {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                  <h3 className="mt-0 mb-12">ML Based Period Tracking</h3>
                  <p className="m-0">
                    India's first ML based period tracking app that adapts to
                    your cycle and keeps your sensitive data safe and secure.
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-from-bottom",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                >
                  <Image
                    src={require("../../assets/images/creative-woman.svg")}
                    alt="Features split 02"
                    width={528}
                    height={396}
                  />
                </div>
              </Fade>
            </div>

            <div className="split-item">
              <Fade>
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                >
                  {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                  <h3 className="mt-0 mb-12"> Opportunity Portal</h3>
                  <p className="m-0">
                    In our conviction to reach all parts of India, the
                    opportunity Portal established a connection between women in
                    rural areas and government schemes and NGOs. We hope to
                    bring awareness, accessibility and affordability while
                    driving forward women empowerment.
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-from-bottom",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                >
                  <Image
                    src={require("../../assets/images/woman.svg")}
                    alt="Features split 03"
                    width={528}
                    height={396}
                  />
                </div>
              </Fade>
            </div>

            <div className="split-item">
              <Fade>
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                >
                  {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                  <h3 className="mt-0 mb-12">Awareness Portal Portal</h3>
                  <p className="m-1">
                    Learn more about the menstrual cycle and help eradicate the
                    preconcived notions and stigmas surrounding the issues. As
                    they say, education is the best weapon in the face of
                    ignorance!
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-from-bottom",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                >
                  <Image
                    src={require("../../assets/images/screen.svg")}
                    alt="Features split 01"
                    width={528}
                    height={396}
                  />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
