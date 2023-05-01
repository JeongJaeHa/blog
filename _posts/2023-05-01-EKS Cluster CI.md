---
layout: article
title: "[PROJECT] 팀 프로젝트"
subtitle: "CI/CD 자동화 프로세스 구축"
date: 2023-04-30 16:05:00 +0900
lastmod: 2023-05-01 20:50:00 +0900
tags: 
  - EKS
  - Jenkins
  - Argo
  - CI/CD

---

<!--more-->  

# 소개

## 개요
팀 프로젝트를 통한 EKS 클러스터 운영 환경 및 CI/CD 프로세스 구축 프로젝트<br/>

## 기간
2023년 04월 01일 ~ 2023년 04월 30일<br/>


# 담당 구현사항(CI/CD)

## 사용 툴

사용기술: Jenkins, Argo, Docker<br/>

선정이유: <br/>
1. 팀 프로젝트 컨셉이 최소한의 AWS 서비스를 사용하여 비용을 절감하는데 초점을 두었음<br/>

2. 오픈 소스이기 때문에 별도의 비용이 들지 않고 사용 사례와 문서가 많아 참고하기 용이하다 판단하였음<br/>

# CI 서버구성

## 문제점
먼저 EKS 클러스터 버전을 고려해 볼 필요가 있었다. 기본적으로 사용해 구성한 클러스터의 버전은 1.24 버전이였는데 자동화 프로세스에 사용하기 위한 Docker는 1.23버전 까지만 지원을 해주었다.<br/>

<img width="613" alt="image" src="https://user-images.githubusercontent.com/99805929/235460175-49783f2f-c87d-4e1b-8c24-b4efb35087d6.png"><br/>

## 해결방법
그래서 원래는 클러스터 안에 Jenkins 서버를 운영할 예정이였으나 EKS 클러스터 외부에 별도의 인스턴스를 생성하고 Jenkins 서버를 운영하는 방식으로 운영하였다.<br/>

![스크린샷 2023-04-29 오후 5 41 48](https://user-images.githubusercontent.com/99805929/235459866-d569830a-4eb3-49cb-913d-3b868d8d08da.png)<br/>

## CI Pipeline 구성(Web)

먼저 우리 팀은 프론트 엔드 개발에 대한 지식이 거의 없었다. 그렇기 때문에 페이지를 만드는 것은 어느정도 성공했지만, 테스트를 진행하기에는 시간이 부족해 진행하지 못했다.<br/>


Web Pipeline은 크게 2개의 과정으로 구성하였다.<br/>

1. local 에서 github에 push 한다.<br/>

2. Jenkins 서버에서 소스코드를 pull 받아 docker image를 build, push 한다.

docker image를 build 하는 경우 `버전관리를 위해 빌드번호가 붙은 이미지`와 `배포를 위한 latest 태그가 붙은` 두개의 이미지를 생성하였다.<br/>

<img width="612" alt="image" src="https://user-images.githubusercontent.com/99805929/235462515-f8095db5-94e0-4585-bc1f-4254b03d847c.png"><br/>

<img width="612" alt="image" src="https://user-images.githubusercontent.com/99805929/235463375-83583231-1033-4ff4-b3f4-3d935e4392ac.png"><br/>

## CI Pipeline 구성(WAS)

WAS는 유닛 테스트를 진행해봤던 경험이 있어서 간단한 유닛테스트를 작성한 다음 pipeline에서 테스트를 진행하도록 구성하였다.<br/>


<img width="375" alt="image" src="https://user-images.githubusercontent.com/99805929/235462360-73a940b2-89c7-4300-993c-89c266471996.png"><br/>
<br/>

# CD 서버구성

먼저 Argo 서버는 기본적으로 3분마다 깃허브와 커밋 히스토리를 비교한다.<br/>

그래서 운이 나쁘다면 최대 3분을 기다려야 한다.(물론 수동으로 싱크를 맞춰 줄 수도 있다.)<br/><br/>

CD는 K8S 전용 배포도구인 Argo를 사용하여 구성하였다.<br/>

Github 리포지토리에 argocd 배포를 진행할 때 사용할 yaml 파일을 넣어두고 Argo 서버에서 해당 디렉토리를 지정해주었다.<br/>

배포를 진행할 때는 `latest 태그`가 붙은 이미지를 사용하여 별도의 yaml 파일 수정없이 배포가 진행되도록 설정하였다.

<img width="1470" alt="image" src="https://user-images.githubusercontent.com/99805929/235464575-cb22ec1c-1f03-447e-ba67-41b9aaed6544.png"><br/>


# Reference

# 시연 영상
[![5INQUE](https://user-images.githubusercontent.com/99805929/235467186-bad25ff1-55b4-455e-b02e-c1470d42c269.png)](https://www.youtube.com/watch?v=g0sOjydT7lE&ab_channel=JoonyoungLee) 
<br/>

**클릭하면 영상으로 이동합니다.**
