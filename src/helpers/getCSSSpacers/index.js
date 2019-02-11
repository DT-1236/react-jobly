import { GLOBAL_REM } from '../../config/styles';

const spacerTransforms = {
  t: (arr, value) => (arr[0] = value),
  b: (arr, value) => (arr[2] = value),
  l: (arr, value) => (arr[3] = value),
  r: (arr, value) => (arr[1] = value),
  x: (arr, value) => ([arr[1], arr[3]] = [value, value]),
  y: (arr, value) => ([arr[0], arr[2]] = [value, value]),
  all: (arr, value) =>
    ([arr[0], arr[1], arr[2], arr[3]] = [value, value, value, value])
};

export const spacerValues = {
  '0': (GLOBAL_REM * 0).toFixed(2),
  '1': (GLOBAL_REM * 0.25).toFixed(2),
  '2': (GLOBAL_REM * 0.5).toFixed(2),
  '3': (GLOBAL_REM * 1).toFixed(2),
  '4': (GLOBAL_REM * 2).toFixed(2),
  '5': (GLOBAL_REM * 5).toFixed(2)
};

/**
 * Parses spacer prop flags (_e.g._ py2, m1, mr4) into actual CSS values
 * @param {Object} objProps Props passed to component
 * @param {Set} acceptedValues Set containing all valid spacer arguments
 * @param {Array} defaultValue Generally [0, 0, 0, 0] for no spacing
 * @returns {String} The actual CSS value. A string containing 4 pixel values, _e.g._ 10px 0px 0px 10px
 * */

export default function getCSSSpacers(objProps, acceptedValues, defaultValue) {
  let spacerArray = [...defaultValue];
  for (let key in objProps) {
    if (acceptedValues.has(key)) {
      const transform = pickTransform(key);
      const transformValue = getTransformValue(key);
      transform(spacerArray, transformValue);
    }
  }
  return spacerArray.map(e => e + 'px').join(' ');
}

/**
 * Chooses the correct transform function out of the mapping object.
 * This function will mutate the appropriate values to output the correct spacer CSS.
 * If a number is chosen as the transformKey, the spacerTransforms will return undefined.
 * This will trigger the binary, returning the 'all' transform
 * @param {string} key An accepted value for spacer styling, _e.g._ px2, my1, p3
 * @returns {function} transform function that mutates the spacerArray
 */
function pickTransform(key) {
  const transformKey = key[1];
  return spacerTransforms[transformKey] || spacerTransforms.all;
}

/**
 * Returns the transform value out of an accepted transform string.
 * If the string is only 2 characters, the binary operator will set the key to the 2nd character
 * @param {string} key An accepted value for spacer styling, _e.g._ px2, my1, p3
 * @returns {string} A number string fixed to two places corresponding to a standard spacer value
 */
function getTransformValue(key) {
  const transformKey = key[2] || key[1];
  return spacerValues[transformKey];
}
