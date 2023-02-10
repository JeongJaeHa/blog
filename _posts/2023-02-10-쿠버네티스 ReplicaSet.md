---
layout: article
title: "[Kubernetes] ReplicaSet "
subtitle: "쿠버네티스 ReplicaSet"
date: 2023-02-10 16:05:00 +0900
lastmod: 2023-02-10 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 ReplicaSet<br/>

# ReplicaSet

레플리카셋의 목적은 레플리카 파드 집합의 실행을 항상 안정적으로 유지하는 것이다. 이처럼 레플리카셋은 보통 명시된 동일 파드 개수에 대한 가용성을 보증하는데 사용한다.

## 사용하기

다음과 같이 yaml 파일을 작성하고 저장한 다음 실행해준다.<br/>

![스크린샷_20230210_104748](https://user-images.githubusercontent.com/99805929/218032193-d2173833-cc5c-468d-a4c6-83d15c60c723.png)

```javascript
# rs-basic.yaml

apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: basic-rc
spec:
  replicas: 3
  selector:
  template:
    metadata:
      name: basic-rc
      labels:
        app: webserver
    spec:
      containers:
        - name: basic-rc
          image: ghcr.io/c1t1d0s7/go-myweb:aline // nginx 등 다른 이미지도 가능
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
```
<br/>

![스크린샷_20230210_110323](https://user-images.githubusercontent.com/99805929/218032226-775acbb6-69cf-4a29-8463-4558542e8c9b.png)

```javascript
kubectl apply -f rs-basic.yaml
```
<br/>
replicas  개수에 맞춰 pod가 생성됨을 알 수 있다.<br/>
<br/>

![스크린샷_20230210_110326](https://user-images.githubusercontent.com/99805929/218032281-f6e9c0f7-b486-48a7-96b3-0b019ad207e1.png)

## 수정하기

### YAML 파일 수정

위에 작성한 `rs-basic.yaml` 파일의 `replicas` 를 수정해준다.<br/>

![스크린샷_20230210_111826](https://user-images.githubusercontent.com/99805929/218032799-076f281c-223c-487d-8fdc-42dc0b7660bf.png)
<br/>

apply 명령어를 이용하여 변경사항을 적용해준다.<br/>

```javascript
kubectl apply -f rs-basic.yaml
```

추가로 파드가 생성되는 것을 확인 할 수 있다.<br/>

![스크린샷_20230210_111840](https://user-images.githubusercontent.com/99805929/218032869-33dc6696-fdd4-4681-8250-e7d57a7da87a.png)<br/>

### CLI 수정

위에서 증가시킨 replicas를 `scale` 명령어를 이용하여 줄여보았다.<br/>

```javascript
kubectl scale rs basic-rs
```

![스크린샷_20230210_112238](https://user-images.githubusercontent.com/99805929/218033490-db4ed1e0-86f3-479b-b54e-c39489bfb442.png)

가장 최근에 만들어진 n개의 pod가 삭제된다.<br/>

![스크린샷_20230210_112231](https://user-images.githubusercontent.com/99805929/218035493-9f425342-9b3d-4bc4-82b2-803d6bffc379.png)<br/>

<br/>
<br/>

# Reference

