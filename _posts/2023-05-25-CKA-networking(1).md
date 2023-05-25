---
layout: article
title: "[Kubernetes] Networking"
subtitle: "Kubernetes Networking"
date: 2023-05-24 16:05:00 +0900
lastmod: 2023-05-25 08:50:00 +0900
tags: 
  - CKA
  - K8S
  - Networking

---

<!--more-->  

이 글은 Udemy의 CKA Certified Kubernetes Administrator (CKA) 강의를 듣고 정리한 글로 오류가 있을 수 있습니다.

## Pod Networking
Pod가 생성되는 경우<br/>

1. 가상네트워크(veth)를 생성한다.<br/>
2. 한 쪽은 파드(컨테이너)에 연결하고 한 쪽은 브릿지 네트워크에 연결한다.<br/>
3. IP주소를 할당하고 게이트웨이 라우트를 추가한다.<br/>

## WeaveNet
각 노드에 Weave 에이전트 혹은 플러그인을 설치하며 서로 통신하며 각 노드의 네트워크, 파드, 서비스에 대한 정보를 교환한다.<br/>

따라서 에이전트(플러그인)은 각 노드의 모든 정보에 대해 알고 있다.

## Service Networking
Service는 Cluster 내 모든 pod에서 접근이 가능하다.<br/>

각 node의 kubelet은 kube-apiserver를 통해 각 노드의 상태변화를 감시하고 Pod가 생성되면 CNI plugin을 통해 pod에 맞는 network를 구성한다.<br/>

kube-proxy를 통해 클러스터의 상태변화를 감시한다. Pod와 달리 Service는 각 Node에 생성되거나 할당되지 않는다.<br/>

service가 IP를 할당 받으면 kube-proxy 가 각 node에 service ip에 대한 전달 규칙을 지정한다. (service ip → Pod ip) 혹은 (service ip:port → pod ip:port)<br/>

service가 생성 혹은 삭제 될 때마다 kube-proxy가 userspace, iptables, ipvs 를 통해 동작한다.<br/>

## 예제

### 1. 클러스터에서 사용되는 Network Solution 확인하기.

```
ls /etc/cni/net.d
```

<img width="327" alt="image" src="https://github.com/JeongJaeHa/Coding_Test_Algorithm/assets/99805929/d0a1dea4-510f-4504-99ad-3bb395b9019e"><br/>
<br/>


### 2. 현재 실행중인 노드의 브릿지 네트워크 인터페이스 이름 식별하기
```
ip link
```

![image](https://github.com/JeongJaeHa/Coding_Test_Algorithm/assets/99805929/7dec2ec9-1f07-43ed-960a-118d968db01f)<br/>
<br/>

### 3. weave로 구성된 POD IP 주소 범위 확인하기
```
kubectl logs -n kube-system <weave pod name> weave
```

![image](https://github.com/JeongJaeHa/Coding_Test_Algorithm/assets/99805929/58cf32aa-72d4-4fa2-a975-6b15cf5a77da)<br/>
<br/>

### 4.Pod의 기본 Gateway 확인하기

```
kubectl exec <pod name> -- route -n
kubectl exec <pod name> -- ip route
```

<img width="695" alt="image" src="https://github.com/JeongJaeHa/Coding_Test_Algorithm/assets/99805929/7d72bc95-4fbb-4900-9863-6658de635165"><br/>
<br/>

### 5. 클러스터 내 Service의 IP 범위 확인하기
```
cat /etc/kubernetes/manifests/kube-apiserver.yaml | grep -i cluster-ip-range
```
![image](https://github.com/JeongJaeHa/Coding_Test_Algorithm/assets/99805929/bf037aef-de85-456b-a6ac-476f25373720)<br/>
<br/>

### 6. kube-proxy는 어떤 유형의 프록시를 사용하도록 구성되어 있나요?
```
kubectl logs -n kube-system <kube-proxy pod name> kube-proxy
```
![image](https://github.com/JeongJaeHa/Coding_Test_Algorithm/assets/99805929/e98a4803-5601-422e-b302-8334d0c46252)<br/>
<br/>






