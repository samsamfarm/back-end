const requiredKeys = ['email', 'password', 'phone', 'mbti', 'nickname', 'name'];
const data = {
  email: '',
  password: undefined,
  phone: null,
  mbti: '',
  nickname: '',
  name: ''
};


function checkMissingParams(data, requiredKeys) {  
    const missingKeys = requiredKeys.filter(key => (data[key] == null || data[key] == ''));
    const bbb = missingKeys.reduce((obj, key) => {
        obj[key] = 'missing';
        return obj;
    }, {});
}
