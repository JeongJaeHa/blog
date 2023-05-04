---
layout: article
title: "[PROJECT] 팀 프로젝트"
subtitle: "Kubernetes Architecture"
date: 2023-05-03 16:05:00 +0900
lastmod: 2023-05-04 20:50:00 +0900
tags: 
  - EKS

---

<!--more-->  

# 소개

## 개요
팀 프로젝트를 통한 개발한 웹 서비스를 쿠버네티스 환경에 배포 및 운용

## 기간
2023년 04월 01일 ~ 2023년 04월 30일<br/>


# Web, Kubernetes Architecture

![image](https://user-images.githubusercontent.com/99805929/236073187-91273cf7-2196-4751-b531-2ea503584416.png)<br/>
<br/>

![스크린샷 2023-04-28 오전 9 30 16](https://user-images.githubusercontent.com/99805929/236072439-104ef70d-c9da-4a00-a0df-94b68ba90517.png)

## 웹 브라우저(Web)

Web Page는 팀원분들과 상의하여 우리가 프로젝트에서 하려고 했던 내용들과 팀원 소개 부분을 만들어 포트폴리오로 이동할 수 있도록 구성하기로 했다.<br/>

어떤 프레임워크를 쓸지 고민하다가 요즘에 `Vue.js `사용이 늘어나고 있는 것을 보고 `vue.js` 프레임워크를 이용하기로 결정하였다.<br/>



## 외부 접속(WAS)

Ingress Service를 통해 브라우저에서 Web Application Server로 접근 하도록 설정하였다.<br/>

Deployment 와 ReplicaSet 설정을 통해 안정적인 운영이 가능하도록 설정해주었다.<br/>

브라우저의 Contact Us 부분에서 정보를 입력한 뒤 서버로 요청을 보내면 서버에서 요청받은 정보를 바탕으로 데이터베이스에 입력하는 작업을 실행하도록 구현하였다.<br/>

## Database

mariadb galera를 이용한 멀티 마스터 데이터 베이스를 구현하려고 하였으나 auto-scaling 이 진행되는 경우 데이터 베이스에서 에러가 발생하였다. 그래서 쿠버네티스 [공식문서](https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/)에 있는 StatefulSet 의 Master-Slave 구조를 설정하여 `Read` 와 `Write` 작업을 분리하는 이중화 구성을 진행 하였다.<br/>

# 어려웠던 점

Web 페이지에 WAS 서버로 통신하는 경우 도메인이 달라 요청을 전송 할 수 없는 상황이 발생했다. <br/>

이러한 상황을 해결하기 위해서 `Web과 WAS를 같은 Ingress 그룹으로 설정`해 같은 도메인에서 요청을 주고 받는 것처럼 설정을 해 주었다.<br/>

# 시연 영상
[![5INQUE](https://user-images.githubusercontent.com/99805929/235467186-bad25ff1-55b4-455e-b02e-c1470d42c269.png)](https://www.youtube.com/watch?v=g0sOjydT7lE&ab_channel=JoonyoungLee) 
<br/>

**클릭하면 영상으로 이동합니다.**
