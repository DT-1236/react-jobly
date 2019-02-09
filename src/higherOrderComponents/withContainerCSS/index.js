import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function withContainerCSS(wrappedComponent) {
  const enhancedComponent = styled(wrappedComponent)`
    align-items: ${getAlignment};
    justify-content: ${getJustification};
    width: ${getWidth};
    flex-direction: ${getDirection};
    box-sizing: content-box;
  `;

  enhancedComponent.propTypes = {
    alignStart: PropTypes.bool,
    alignCenter: PropTypes.bool,
    alignEnd: PropTypes.bool,
    alignStretch: PropTypes.bool,
    justifyStart: PropTypes.bool,
    justifyCenter: PropTypes.bool,
    justifyEnd: PropTypes.bool,
    justifyAround: PropTypes.bool,
    justifyBetween: PropTypes.bool,
    justifyEven: PropTypes.bool,
    justifyStretch: PropTypes.bool,
    flexColumn: PropTypes.bool,
    flexRow: PropTypes.bool,

    // wFull and wHalf are absolute screen widths
    wFull: PropTypes.bool,
    wHalf: PropTypes.bool,
    // wXX are parent width percentages
    w100: PropTypes.bool,
    w50: PropTypes.bool,
    w33: PropTypes.bool,
    w25: PropTypes.bool,
    w10: PropTypes.bool,
    w5: PropTypes.bool
  };

  return enhancedComponent;
}
