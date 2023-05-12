function checkMissingParams(data, requiredKeys) {  
    const missingKeys = requiredKeys.filter(key => (data[key] == null || data[key] == ''));
    const bbb = missingKeys?.reduce((obj, key) => {
        obj[key] = 'missing';
        return obj;
    }, {});

    if (Object.keys(bbb).length == 0) {
        return null;
    }
    return bbb;
}

function checkMissingParamsBoolean(data, requiredKeys) {
  const missingKeys = requiredKeys.filter(
    (key) =>
      data[key] === undefined ||
      data[key] === null ||
      typeof data[key] !== "boolean"
  );
  const missingValues = missingKeys.reduce((obj, key) => {
    obj[key] = "missing";
    return obj;
  }, {});

  if (Object.keys(missingValues).length === 0) {
    return null;
  }

  return missingValues;
}

module.exports = { checkMissingParams, checkMissingParamsBoolean };
