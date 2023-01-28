---
layout: article
title: "[쿠버네티스] NameSpace"
subtitle: "쿠버네티스 namespace"
date: 2023-01-23 16:05:00 +0900
lastmod: 2023-01-23 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 Namespace<br/>

# NameSpace?

# NameSpace 생성하기

## CLI 

`kubectl create namespace [명칭]` 을 통해 NameSpace를 생성 할 수 있습니다.<br/>



## YAML

`kubectl create -f [yaml 파일명]` 을 통해 NameSpace를 생성 할 수도 있습니다.<br/>

### yaml 파일 생성하기
`kubectl create namespace [네임스페이스명] --dry-run -o yaml > [yaml 파일명]` 으로 yaml 파일 생성이 가능합니다.<br/>

> 예시) <br/>
`kubectl create namespace red --dry-run -o yaml > ns-red.yaml`

<br/>

# NameSpace별 Pod 실행하기

- 파일 생성 시  `-n namesapce` 를 통해 직접 Namespace 를 선언해주거나<br/>

> `kubectl create -f nginx.yaml -n blue` <br/>

- yaml 파일 내부에 namespace option을 작성해서 pod를 생성하는 경우에 namespace를 설정할 수 있습니다.<br/>



<br/>
<br/>

# Reference

