---
layout: article
title: "[쿠버네티스] Pod Resource 할당하기"
subtitle: "쿠버네티스 Pod Resource 할당하기"
date: 2023-01-26 16:05:00 +0900
lastmod: 2023-01-26 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 Pod Resource 할당하기<br/>

# Pod Resource의 요청 및 제한

- Resource Request<br/>
파드를 실행하기 위한 최소 리소스의 양을 조절<br/>

- Resource Limit<br/>
파드가 사용할 수 있는 최대 리소스양을 제한<br/>
Limit를 초과하는 리소스를 사용하는 Pod는 종료 후 다시 스케줄링 된다.<br/>


# Container Resource 설정하기

cpu 1대는 1000m(milicore) 혹은 개수(1,2 ...)로 표현을 한다. 200m인 경우는 cpu 1개의 20% 만큼만 사용하겠다는 의미이다.<br/> 

```javascript
resource:
  requests:
    cpu: 200m
    memory: 250Mi
  limits:
    cpu: 1
    memory: 500Mi
```

![화면 캡처 2023-01-29 125755](https://user-images.githubusercontent.com/99805929/215304511-a0717643-702a-49ea-9eec-03b31083268f.png)

# 생성 및 확인하기

yaml 파일을 실행 시켜서 describe로 확인해보면 설정한 내용을 확인 할 수 있다.<br/>

![화면 캡처 2023-01-29 125818](https://user-images.githubusercontent.com/99805929/215304553-7c420da5-7efd-406c-9540-9a1b04f27c33.png)



<br/>
<br/>

# Reference

