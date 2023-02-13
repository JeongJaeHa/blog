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

## Node Selector

node selector를 사용하여 특정 노드에서만 pod를 생성하고 실행할 수 있습니다.

```javascript
# daemon.yaml

apiVersion: apps/v1
kind: Daemonset
metadata:
  name: my-ds
  labels:
    env: test
spec:
  selector:
    matchLabels:
      app: my-ds
    template:
      metadata:
        labels:
          app: my-ds
      spec:
        nodeSelector:
          node-status: enable
        containers:
          - name: myapp
            image: nginx:1.14
            imagePullPolicy: IfNotPresent
            ports:
              - containerPort: 8080
                protocol: TCP
```

이렇게 파일을 작성하고<br/>

```javascript
kubectl apply -f daemon.yaml
```

파일을 실행한 다음 확인하면 NODE SELECTOR 에 설정한 값이 들어간 것을 확인할 수 있다.<br/>

![스크린샷_20230213_103512](https://user-images.githubusercontent.com/99805929/218407757-6eaf7702-6250-4cfa-8611-9debf7ff4623.png)
<br/>

```javascript
kubectl get nodes --show-labels
```

위 명령어로 개별 Node의 Label을 확인하면 우리가 설정한 node-status=enable 은 설정되있지 않는 것을 확인 할 수 있다.<br/>

![스크린샷_20230213_103807](https://user-images.githubusercontent.com/99805929/218408116-e8cc4fd1-9019-4780-8047-f2da85b123ba.png)<br/>

node에 label을 추가해봤다.<br/>

```javascript
kubectl label nodes node2 node-status=enable
kubectl get nodes --show-labels
```

![스크린샷_20230213_103941](https://user-images.githubusercontent.com/99805929/218408328-8f5f602e-123e-49de-acc6-98116b94cd21.png)<br/>

node2에 label이 추가된 것을 확인 할 수 있다.<br/>

![스크린샷_20230213_104002](https://user-images.githubusercontent.com/99805929/218408480-d500611e-bd0d-4da0-a2fb-052671b1b337.png)

이렇게 볼 수도 있다.<br/>

```javascript
kubectl get nodes -L node-status
```

![스크린샷_20230213_104032](https://user-images.githubusercontent.com/99805929/218408816-abfa326f-2b6e-4316-bdaa-80dc6d497e77.png)

그래서 node-status=enable 을 설정한 node2 에서만 pod가 생성된다.<br/>

![스크린샷_20230213_103950](https://user-images.githubusercontent.com/99805929/218409389-7e2e479d-1d31-4819-90ca-e9cf41cd3b0e.png)

결론은 daemon.yaml 파일에서 설정한 nodeSelector 값이 있는 node에서만 DaemonSet이 실행된다는 것이다.


<br/>
<br/>

# Reference

