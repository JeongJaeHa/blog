---
layout: article
title: "[Kubernetes] Deployment "
subtitle: "쿠버네티스 Deployment"
date: 2023-02-10 16:05:00 +0900
lastmod: 2023-02-10 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 Deployment<br/>

# Deployment

디플로이먼트(Deployment) 는 파드와 레플리카셋(ReplicaSet)에 대한 선언적 업데이트를 제공한다.<br/>

디플로이먼트에서 의도하는 상태 를 설명하고, 디플로이먼트 컨트롤러(Controller)는 현재 상태에서 의도하는 상태로 비율을 조정하며 변경한다. 새 레플리카셋을 생성하는 디플로이먼트를 정의하거나 기존 디플로이먼트를 제거하고, 모든 리소스를 새 디플로이먼트에 적용할 수 있다.<br/>

# 사용하기

다음과 같이 yaml 파일을 작성합니다.<br/>

```javascript
apiVersion: apps/v1
kind: Deployment
metadata:
  name: basic-deploy
spec:
  replicas: 5
  selector:
  template:
    metadata:
      name: webserver
      labels:
        app: webserver
    spec:
      containers:
        - name: basic-container
          image: ghcr.io/c1t1d0s7/go-myweb:aline // nginx 등 다른 이미지도 가능
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
```

![스크린샷_20230210_030247](https://user-images.githubusercontent.com/99805929/218045493-18b704d4-73a8-4f00-b171-07c46319c35e.png)

## 업데이트

yaml 파일의 image version을 수정하여 업데이트를 진행한다.<br/>
metadata annotation에 업데이트 내용을 작성하면 확인 할 수 있다.<br/>

![스크린샷_20230210_031941](https://user-images.githubusercontent.com/99805929/218046272-960d4345-6650-4ff8-ba2f-d1107eee8ca1.png)
<br/>


![스크린샷_20230210_031920](https://user-images.githubusercontent.com/99805929/218046289-1ec49a2b-4b42-462e-a952-5b49cb12addc.png)

## Rolling Update

한번에 설정한 개수 만큼의 파드 업데이트를 진행한다.<br/>

yaml 파일의 spec을 다음과 같이 작성한다.<br/>

```javascript
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1 // 최대 몇개의 파드를 rolling update 할지
      maxUnavailable: 1 // 오류 파드 허용 개수
  revisionHistoryLimit: 10 // 업데이트 기록 개수
```

![스크린샷_20230210_041247](https://user-images.githubusercontent.com/99805929/218047020-da06d226-9826-43b3-9cc9-0da63ff3b42e.png)

업데이트 기록은 <b>`rollout history`</b> 명령어를 사용하여 확인 할 수 있다<br/>

![스크린샷_20230210_031920](https://user-images.githubusercontent.com/99805929/218048264-cb1bad38-393c-4556-813f-7649376a3d0f.png)<br/>

## CLI 

CLI 명령어로 업데이트도 가능하다. 단, yaml 파일 업데이트가 아니기 때문에 pod를 재생성하면 초기화 된다.<br/>

```javascript
kubectl set image deploy [container Name]=[image Name] 
```
revisionHistory를 설정한 상태에서 업데이트를 진행하면 이전 ReplicaSet은 동작을 정지 시키고 새로운 ReplicaSet을 생성한다.<br/>

아래 명령어로 현재 동작 중인 ReplicaSet을 확인 할 수 있다.

```javascript
kubectl get rs
```

![스크린샷_20230210_033709](https://user-images.githubusercontent.com/99805929/218048945-340c0dc0-dd80-41c4-b334-c5d9d049811b.png)

## Recreate

정해진 개수 만큼 업데이트하는 Rolling Update와 달리 한번에 업데이트를 진행한다.<br/>

![스크린샷_20230210_041836](https://user-images.githubusercontent.com/99805929/218055991-7c7aad90-3359-46f1-b0c9-941544219603.png)<br/>

![스크린샷_20230210_042012](https://user-images.githubusercontent.com/99805929/218056217-f4002d49-bcf4-4f1f-a93f-80150e7a190f.png)<br/>

## 업데이트 취소하기

위 사진에서는 5번 ReplicaSet 이 실행되고 있다. 그래서 <b>`6847-`</b> ReplicaSet이 READY 가 실행되고 있음 을 알 수 있다.<br/>

undo 명령어를 이용하여 이전 업데이트로 복구 할 수 있고, `--to-revision` 옵션으로 기록을 지정하여 해당 ReplicaSet version으로 돌아 갈 수도 있다.<br/>

```bash
kubectl rollout undo deployment basic-deploy --to-revision=3
```

위 명령어로 3번 ReplicaSet을 실행 시킨 뒤 목록을 확인해보면 3번 Set이 실행되는 것을 확인할 수 있다. 순번이 일치하지는 않는다.<br/>

![스크린샷_20230210_033800](https://user-images.githubusercontent.com/99805929/218055472-73e96e13-2316-4b58-b46d-9ab1778a12f8.png)<br/>








<br/>
<br/>

# Reference

