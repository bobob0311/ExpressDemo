var jwt = require('jsonwebtoken'); // jwt 모듈 소환

// 서명 = 토큰 발생
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//token 생성 = jwt 서명을 했다 ! (페이로드, 나만의 암호키) + SHA256

console.log(token);

// 검즘
// 만약 검증에 성공하면, 페이로드 값을 확인할 수 있음

var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded);