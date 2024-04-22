# ExpressDemo

## 1. 기본 API 설계

## 2. 몇 개의 JS 문법

## 3. 회원 API 설계

### 3.1 로그인 : POST /login

- req : body (id, pwd)
- res : 'name' 님 환영합니다.

### 3.2 회원 가입 : POST /join

- req : body (id,pwd,name)
- res : 'name' 님 환영합니다.

### 3.3 회원 개별 "조회" : GET /user/:id

- req : URL (id)
- res : id, name

### 3.4 회원 "탈퇴" : DELETE /users/:id

- req : URL (id)
- res : 'name' 님 다음에 또 뵙겠습니다.

## 4. 채널 API 설계

### 4.1 채널 생성 : POST /channels

- req : body(channelTitle, userId) cf. userId는 body X header 숨겨서 받아야 한다.(Token)
- res : 'channelTitle'님 채널을 응원합니다.

### 4.2 채널 수정 : PUT /channels/:id

- req : URL(id), body(channelTitle)
- res : 채널명이 성공적으로 수정되었습니다. 기존 ' ' -> 수정 ' '

### 4.3 채널 개별 삭제 : DELETE /channels/:id

- req : URL(id)
- res : 삭제되었습니다.

### 4.4 회원의 채널 전체 조회 GET /channels

- req : body(userId)
- res : <채널 전체 데이터>

### 4.5 채널 개별 조회 GET /channels/:id

- req : URL (id)
- res : <채널 개별 데이터>
