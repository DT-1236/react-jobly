/**
 * Parses prop keys for special flags for certain CSS properties. All valid keys should be found in the Component's propTypes
 * @param {Object} objProps Component.props
 * @param {Object} acceptedValues Object containing all valid keys and their respective values
 * @param {*} defaultValue CSS value for the default value if objProps does not have a valid key
 * @return {*} CSS value to include in the styledComponent
 */
function getCSSProperties(objProps, acceptedValues, defaultValue) {
  let key = lastValidKey(objProps, acceptedValues);
  return acceptedValues[key] || defaultValue;
}

/**
 * Returns the last valid key of an object for a given attribute. Ignores previous flags, returning only the most recent value
 * @param {Object} objProps Component.props
 * @param {Object} acceptedValues Object containing all valid keys and their respective values
 * @return {*} Last valid key in the object for a given attribute else null
 */
function lastValidKey(objProps, acceptedValues) {
  let validKey = null;
  for (let key in objProps) {
    if (acceptedValues.hasOwnProperty(key)) validKey = key;
  }
  return validKey;
}

export default getCSSProperties;
