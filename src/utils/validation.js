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

function checkByPhone(phone) {
  const reg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return reg.test(phone);
}

function checkByEmail(email) {
  const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return reg.test(email);
}

function checkByPasswordCompare(password, passwordConfirm) {
  return password === passwordConfirm;
}

function checkByMbti(mbti) {
  const reg = /^[EI]{1}[SN]{1}[TF]{1}[JP]{1}$/;

  return reg.test(mbti);
}

module.exports = {
  checkMissingParams,
  checkMissingParamsBoolean,
  checkByPhone,
  checkByEmail,
  checkByMbti,
  checkByPasswordCompare,
};
