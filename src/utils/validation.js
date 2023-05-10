export function checkMissingParams(data, requiredKeys) {  
    const missingKeys = requiredKeys.filter(key => (data[key] == null || data[key] == ''));
    const bbb = missingKeys?.reduce((obj, key) => {
        obj[key] = 'missing';
        return obj;
    }, {});

    return bbb;
}
