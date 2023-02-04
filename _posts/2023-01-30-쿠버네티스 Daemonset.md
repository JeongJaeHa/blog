---
layout: article
title: "[쿠버네티스] DaemonSet"
subtitle: "쿠버네티스 DaemonSet"
date: 2023-01-30 16:05:00 +0900
lastmod: 2023-01-30 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 DaemonSet<br/>

# DaemonSet

전체 노드에서 Pod가 한개 씩 실행되도록 보장되며<br/>
로그 수집기, 모니터링 에이전트 같은 프로그램 실행 시 적용한다.

# 생성하기

nginx image를 기반으로 생성하기<br/>

다음과 같이 kind 를 DaemonSet 으로 작성해주고 

![스크린샷_20230131_061652](https://user-images.githubusercontent.com/99805929/216472570-ad333c8f-2273-468e-bc5d-e5278fa5b9ea.png)<br/>

```javascript
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nginx-demon
spec:
  revisionHistoryLimit: 10 // update 이력을 몇개까지 저장할 것인지
  selector:
    matchLabels:
      app: webui
    template:
      metadata:
        name: nginx-pod
        labels:
          app: webui
      spec:
        containers:
          - name: nginx-container
            image: nginx:1.14
```

yaml 파일을 실행하게되면 <br/>

![스크린샷_20230131_061639](https://user-images.githubusercontent.com/99805929/216472653-5222800b-5232-4444-9a70-76c69e3341b8.png)<br/>

```javascript
kubectl create -f nginx-demon.yaml
```

클러스터링 된 Node 에 각각 한개 씩 Nginx Pod가 생성되는 것을 알 수 있다. <br/>

![스크린샷_20230131_061645](https://user-images.githubusercontent.com/99805929/216472733-b4d63220-b248-4e88-9b77-0409e1321325.png)<br/>

## Rolling Update

yaml 파일의 image version을 수정한 뒤 저장해주면 Rolling Update가 진행됩니다.<br/>

반대로 아래 명령어를 이용하여 이전 업데이트로 되돌릴 수 있습니다.<br/>

![스크린샷_20230131_062452](https://user-images.githubusercontent.com/99805929/216478139-aecee37e-e3dc-4b65-a0c5-7dfb3523aed1.png)<br/>

```javascript
kubectl rollout undo daemonset nginx-demon
```
<br/>

삭제할 때는 daemonset 으로 실행을 관리하기 때문에 daemonset을 삭제해 주도록합니다.<br/>

![스크린샷_20230131_062520](https://user-images.githubusercontent.com/99805929/216473772-0f0549d9-12f9-46cf-8dd4-7347371a275b.png)

```javascript
kubectl delete ds.apps nginx-demon
```

<br/>
<br/>

# Reference

