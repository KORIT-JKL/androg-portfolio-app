# ANDROG
**해당 웹 사이트는 남성 의류 쇼핑몰으로 상품 열람과 주문, 구매, 리뷰달기, 문의하기 등 쇼핑몰의 필수적인 요소들을 사용자에게 지원하고**  
**리뷰관리, 문의관리, 상품관리(추가,수정,삭제), 매출관리 등 관리자 지원 요소들을 지원합니다.**

# 팀 구성
- (팀장) 강의진 : 로그인, 회원가입, 결제기능, 문의 기능(관리자)
- 정성현 : 마이페이지, 주소기능, 리뷰기능, oauth2 로그인, 공지(관리자)
- 이상현 : 상품페이지, 장바구니, 검색, 리뷰 관리(관리자), 상품관리자 페이지, 매출관리(관리자)

# 기능
- 회원가입, 로그인, 비밀번호 변경, oauth2 로그인(구글,네이버, 카카오톡)
- 상품 주문, 상품 구매, 옵션선택
- 사용자 주소(추가, 수정, 삭제), 기본배송지 설정
- 장바구니(추가, 삭제, 수량선택, 주문시 자동삭제)
- 결제, 주소 불러오기, 새주소 추가, 카트에 담긴 상품 가져오기, 선택구매
- 마이페이지 회원정보 불러오기, 주문정보, 리뷰작성, 프로필 변경
- 문의(등록, 답변확인)
- 상품검색(색상, 이름)
- 공지관리(추가, 수정, 삭제)
- 문의관리(문의접수, 답변)
- 상품관리(추가, 수정, 삭제, 품절설정)
- 리뷰관리(답변, 수정, 삭제)
- 매출관리(일자별 매출액, 판매랑 상품 순위, 상품 매출순위, 사용자 결재액 순위)


# 주요 로직
## AuthRoute 로직
![AuthRoute 로직](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/c69c2d8f-09d7-4ef4-9c37-931fcb3f9145)

## JWT
![JWT 설계 구조](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/ac8795fd-07fa-4a5a-9258-fe9358e84d4d)

## Oauth2 + JWT
![Oauth2+JWT 프로세스](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/18a7879c-ff60-42d8-9e54-0b1305037e10)

## MyBatis + MySQL
![MyBatis+MySQL(Spring Boot)](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/f51bcc91-85d0-4c2d-bb9c-aeec991eab96)

# 메뉴 구조도

## 사용자(User)
![image](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/a0f9676f-18b6-4333-93fe-4f77bd28cc3e)

## 관리자(Admin)
![image](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/6763932e-d5e4-44bf-a889-e50b92fcb6f0)


# 화면 구현

### 로그인 및 Oauth2 로그인
![로그인](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/178b3487-c0b6-4413-9a95-cd32d65695b1)

### 주소록
![주소록](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/1f728355-1b59-4197-9442-c96f16a80284)

### 장바구니 및 상품 구매
![상품구매 및 장바구니](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/71c0c6d4-d2bb-45a0-9891-ce579bc02398)

### 리뷰작성
![리뷰작성](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/214bbc05-231b-41d4-8aa6-dde0d53cc7d2)

### 문의하기
![문의하기](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/66a65a94-510a-4f7b-a493-4430389932a5)
### 검색
![검색](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/ed8b0255-f2c3-4afd-82b2-dea7b958dcd6)

## 관리자 페이지

### 관리자 상품
![관리자 상품](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/7f0f05f4-7827-4d45-94b0-0334cad511e8)

### 관리자 리뷰(공지 포함)
![관리자 리뷰 및 공지](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/34acf8e4-b028-4028-af32-a26589d2f8fa)
### 관리자 매출(공지 포함)
![관리자 매출 및 공지](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/7dd066fc-ab40-4b7c-919f-3b70c818d2a9)
### 관리자 문의
![관리자 문의](https://github.com/KORIT-JKL/androg-portfolio-app/assets/51119920/47feb85f-adca-46e2-8678-c2200f349603)


