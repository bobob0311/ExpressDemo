# ExpressDemo

## 1. 기본 API 설계

## 2. 몇 개의 JS 문법

## 3. 회원 API 설계

### 1.1 로그인 : POST /login

- req : body (id, pwd)
- res : 'name' 님 환영합니다.

### 1.2 회원 가입 : POST /join

- req : body (id,pwd,name)
- res : 'name' 님 환영합니다.

### 1.3 회원 개별 "조회" : GET /user/:id

- req : URL (id)
- res : id, name

### 1.4 회원 "탈퇴" : DELETE /users/:id

- req : URL (id)
- res : 'name' 님 다음에 또 뵙겠습니다.
