---
layout: article
title: "[Docker] Docker File 작성하기"
subtitle: "Docker File"
date: 2023-02-07 16:05:00 +0900
lastmod: 2023-02-07 17:45:00 +0900
tags: 
  - 리눅스
  - Docker
  - Compose

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 이미지(20.04 LTS)에서 진행하였습니다.<br/>

Docker <br/>

워드 프레스와 Database를 Docker File로 작성해보았다.

# 조건

## MYSQL
|항목|항목 이름|값|
|:-----:|:----:|:---:|
|MYSQL 이미지 이름|image:|mysql:5.7|
|사용할 네트워크|networks:|internal|
|사용할 볼륨|volumes:|compose-db|
|마운트 위치|  |/var/lib/mysql|
|재시작 설정|restart:|always|
|MySQL 설정|environment:|환경변수 설정|
|MySQL 루트 패스워드|MYSQL_ROOT_PASSWORD|123|
|MySQL 데이터베이스 이름|MYSQL_DATABASE|wp-db|
|MYSQL 사용자 이름|MYSQL_USER|wp-user|
|MYSQL 패스워드|MYSQL_PASSWORD|1234|

## DATABASE
|항목|항목 이름|값|
|:-----:|:----:|:---:|
|의존관계|depends_on|database|
|워드프레스 이미지 이름|image:|mysql:5.7|
|사용할 네트워크|networks:|internal, external|
|사용할 볼륨|volumes:|compose-db|
|마운트 위치|  |/var/www/html|
|포트 번호|port:|8085:80|
|재시작 설정|restart:|always|
|MySQL 설정|environment:|환경변수 설정|
|데이터베이스 컨테이너 이름|WORDPRESS_DB_HOST|database|
|데이터베이스 이름|WORDPRESS_DB_NAME|wp-db|
|데이터베이스 사용자 이름|WORDPRESS_DB_USER|wp-user|
|데이터베이스 패스워드|WORDPRESS_DB_PASSWORD|1234|

# Doker File 작성하기
```javascript
version: "3"

services:
  database:
    image: mysql:5.7
    volumes:
      - compose-db:/var/lib/mysql
    networks:
      - internal
    environment:
      MYSQL_ROOT_PASSWORD: 123
      MYSQL_DATABASE: wp-db
      MYSQL_USER: wp-user
      MYSQL_PASSWORD: 1234
    restart: always
  wordpress:
    depends_on:
      - database
    image: wordpress
    networks:
      - internal
      - external
    volumes:
      - compose-wp:/var/www/html
    ports:
      - 8085:80
    restart: always
    environment:
      WORDPRESS_DB_HOST: database
      WORDPRESS_DB_USER: wp-user
      WORDPRESS_DB_PASSWORD: 1234
      WORDPRESS_DB_NAME: wp-db
networks:
  internal:
  external:
volumes:
  compose-db:
  compose-wp:
```

# 실행하기

Dockerfile이 있는 디렉토리에서 다음 명령어로 docker compose file을 실행했다.<br/>
-f 옵션으로 경로설정이 가능하다.

```javascript
docker compose up -d // 현재 디렉토리에 도커파일이 있는 경우
docker compose -f [디렉토리경로] up -d // 디렉토리 경로를 지정하는 경우
```
![스크린샷_20230207_052452](https://user-images.githubusercontent.com/99805929/217193791-c8992881-5e3c-4639-9b28-c0015fc43357.png)<br/>

![스크린샷_20230207_054916](https://user-images.githubusercontent.com/99805929/217196801-0aa991db-c901-4ee5-bb03-fe024e21078b.png)

# 접속하기
![스크린샷_20230207_052514](https://user-images.githubusercontent.com/99805929/217194825-757b2a72-a4f5-48c2-a6d7-7fa3af9bef9a.png)<br/>

# 에러해결하기

![스크린샷_20230207_053252](https://user-images.githubusercontent.com/99805929/217193912-2276fb0d-aaff-466a-9655-c6709dafb14c.png)<br/>

yaml 파일의 enviro `n` ment n이 없는 오타이다.

잘 작성했는데 안되는 대부분이 경우의 대부분이 오타, 들여쓰기, 콜론 등이 빠진 경우이니 잘 확인해보자.

<br/>
<br/>

# Reference

그림과 실습으로 배우는 도커 & 쿠버네티스 / 위키북스(2022)