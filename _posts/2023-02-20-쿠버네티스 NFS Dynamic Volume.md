---
layout: article
title: "[Kubernetes] NFS Dynamic Volume "
subtitle: "쿠버네티스 NFS Dynamic Volume"
date: 2023-02-20 20:05:00 +0900
lastmod: 2023-02-20 23:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(3대) 로 진행하였습니다.<br/>

[깃허브](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner) 에서 받은 파일을 가지고 실습한 내용글 기록한 글 입니다.<br/>

# NFS 서버 구성하기

## 파일 설정하기
내가 사용할 디렉토리를 `/etc/exports` 파일에 추가해줍니다.<br/>
옵션 중에 `no_root_squash` 는 안넣으면 오류가 발생하니 꼭 넣어주자 실습할때에는 `/dynamic`을 사용했다.<br/>

```javascript
sudo vim /etc/exports

# 파일 수정 후
mkdir /dynamic
sudo exportfs -r
```

![스크린샷_20230220_063432](https://user-images.githubusercontent.com/99805929/220069947-177b2f12-abbd-4476-b998-14052db024c4.png)

## 실습해보기
`/nfs-subdir-external-provisioner/deploy` 디렉토리에 `rbac.yaml` 파일을 실행해줍니다.<br/>

```javascript
kubectl apply -f rbac.yaml
```

`deployment.yaml` 파일의 일부 내용을 수정하고 실행합니다.<br/>

```javascript
kubectl apply -f deployment.yaml
kubectl apply -f class.yaml
```

![스크린샷_20230220_063841](https://user-images.githubusercontent.com/99805929/220070587-3e0b0231-b47f-460d-ad20-a6b541ae7caa.png)

test-claim.yaml 과 test-pod.yaml 파일을 실행해봅니다.<br/>

/dynamic 디렉토리에 SUCCESS를 확인 할 수 있습니다.<br/>

![스크린샷_20230220_064017](https://user-images.githubusercontent.com/99805929/220070653-b1d62644-6696-4592-928f-a92e733a86b2.png)


<br/>
<br/>

# Reference

