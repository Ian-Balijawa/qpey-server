export const assertString = (
  input: {
    constructor: { hasOwnProperty: (arg0: string) => any; name: any };
  } | null
) => {
  const isString = typeof input === "string" || input instanceof String;

  if (!isString) {
    let invalidType;
    if (input === null) {
      invalidType = "null";
    } else {
      invalidType = typeof input;
      if (
        invalidType === "object" &&
        input.constructor &&
        input.constructor.hasOwnProperty("name")
      ) {
        invalidType = input.constructor.name;
      } else {
        invalidType = `a ${invalidType}`;
      }
    }
    throw new TypeError(`Expected string but received ${invalidType}.`);
  }
};
