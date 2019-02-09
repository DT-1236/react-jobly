/**
 * Parses prop keys for special flags for certain CSS properties. All valid keys should be found in the Component's propTypes
 * @param {Object} objProps Component.props
 * @param {Object} acceptedValues Object containing all valid keys and their respective values
 * @param {*} defaultValue CSS value for the default value if objProps does not have a valid key
 * @return {*} CSS value to include in the styledComponent
 */
export default function getCSSProperties(
  objProps,
  acceptedValues,
  defaultValue
) {
  let CSSValue = defaultValue;
  for (let key in objProps) {
    CSSValue = acceptedValues.hasOwnProperty(key)
      ? acceptedValues[key]
      : CSSValue;
  }
  return CSSValue;
}
