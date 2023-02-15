---
layout: article
title: "[Kubernetes] Headless & kube proxy"
subtitle: "쿠버네티스 Headless & kube proxy"
date: 2023-02-11 16:05:00 +0900
lastmod: 2023-02-11 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 Headless & kube proxy<br/>

# Headless

- ClusterIP가 없는 서비스 단일 진입점이 필요 없을 때 사용<br/>
- Serviced와 연결된 Pod의 endpoint로 DNS 레코드가 생성됨<br/>
- Pod의 DNS 주소: pod-ip-addr.namespace.pod.cluster.local<br/>

Pod들의 endpoint에 dns resolving service 지원<br/>

statefulset 과 같은 Pod 이름이 유지되는 상황에 적합하다

```javascript
# headless.yaml

apiVersion: v1
kind: Service
metadata:
  name: headless-service
spec:
  type: ClusterIP
  clusterIP: None  // ★중요★ 반드시 입력
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

```javascript
kubectl create -f deploy-nginx.yaml //nginx pod 생성
kubectl create -f headless.yaml
kubectl get svc
```

생성한 headless 서비스를 확인해보면 ClusterIP는 없지만 endpoints 설정은 되있는 것을 확인 할 수 있다.<br/>

```javascript
kubectl describe svc headless-service
```

테스트 파드를 생성해서 확인해보았다.<br/>

```javascript
kubectl run testpod --image=centos:7 -it /bin/bash

# testpod 내부
cat /etc/resolv.conf
exit

# master node
curl [PodIP].default.pod.cluster.local
```

<b>주의 사항은 PodIP 작성 시 `.` 이 아니라 `-` 를 사용해야한다.</b><br/>


# kube proxy

- Kubernetes Service의 backend 구현<br/>
- endpoint 연결을 위한 iptables 구성<br/>
- nodePort로의 접근과 Pod 연결을 구현(iptables 구성)<br/>

iptable 확인하기

```javascript
kubectl exec [container name] -it /bin/bash
iptables -t nat -S | grep 80
```

확인해보면 ip table 설정이 되어있는 것을 확인할 수 있다.

<br/>
<br/>

# Reference

