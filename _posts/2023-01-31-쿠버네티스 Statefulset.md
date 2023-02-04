---
layout: article
title: "[쿠버네티스] Statefulset"
subtitle: "쿠버네티스 Statefulset"
date: 2023-01-30 16:05:00 +0900
lastmod: 2023-01-30 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 Statefulset<br/>

# Statefulset

Pod의 상태를 유지해주는 컨트롤러 역할<br/>
`- Pod의 이름`<br/>
`- Pod의 볼륨(스토리지)`

# 생성하기

nginx image를 기반으로 생성하기<br/>

다음과 같이 kind 를 Statefulset 으로 작성해주고 

![스크린샷_20230131_064848](https://user-images.githubusercontent.com/99805929/216479629-8c0e95f7-6474-4505-9ffa-432b1092ada6.png)<br/>

```javascript
apiVersion: apps/v1
kind: Statefulset
metadata:
  name: nginx-sf
spec:
  selector:
    matchLabels:
      app: webui
  replicas: 3
  serviceName: sf-service
  podManagementPolicy: Parallel
  template:
    metadata:
      name: nginx-pod
      labels:
        app: webui
    spec:
      containers:
        - name: nginx-sf
          image: nginx:1.14
```

yaml 파일을 실행하게되면 <br/>

![스크린샷_20230131_064842](https://user-images.githubusercontent.com/99805929/216479973-15227f25-25d2-46bd-9f84-1ff3c83966f4.png)<br/>

```javascript
kubectl create -f [yaml 파일명]
```

클러스터링 된 Node 에 yaml 파일에 작성한 replicas의 숫자만큼 Nginx Pod가 생성되는 것을 알 수 있다. <br/>

![스크린샷_20230131_064839](https://user-images.githubusercontent.com/99805929/216480151-da4b01a9-07be-4252-86e9-41e8f0309338.png)<br/>

## Scale

명령어를 통해 replicas의 개수를 수정하면 자동으로 Pod를 생성하거나 삭제해줍니다.<br/>

Pod가 삭제 될 때는 가장 최근에 만들어진 n개 가 삭제됩니다.<br/>

![스크린샷_20230131_065102](https://user-images.githubusercontent.com/99805929/216480735-86e91c0e-5769-4402-a767-8faacb63f3a8.png)<br/>

![스크린샷_20230131_065106](https://user-images.githubusercontent.com/99805929/216480951-262e16cc-a5b7-4ad4-b413-63387f1df6aa.png)<br/>

```javascript
kubectl scale statefulset nginx-sf --replicas=4
```
<br/>

삭제할 때는 Statefulset 으로 실행을 관리하기 때문에 Statefulset을 삭제해 주도록합니다.<br/>

![스크린샷_20230131_065306](https://user-images.githubusercontent.com/99805929/216481223-71e4a0cb-4592-4787-8761-cd3a1877dc3a.png)

```javascript
kubectl delete statefulset.apps nginx-sf
```

<br/>
<br/>

# Reference

