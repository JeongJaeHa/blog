---
layout: article
title: "[쿠버네티스] LivenessProbe"
subtitle: "쿠버네티스 LivenessProbe"
date: 2023-01-24 16:05:00 +0900
lastmod: 2023-01-24 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(2대) 총 3대로 진행하였습니다.<br/>


쿠버네티스 LivenessProbe<br/>

# LivenessProbe 란?

Pod의 Spec에 정의하여 Pod 가 계속 실행될 수 있음을 보장해줌<br/>

# LivenessProbe 문법

- `httpGet Probe` : 지정한 IP주소, port, path에 HTTP GET 요청을 보내 해당컨테이너가 응답하는지를 확인한다.<br/>

```javascript
livenessProbe:
  httpGet
    path: /
    port: 80
```

반환코드가 200이 아닌 값이나오면 오류, 컨테이너를 다시 시작한다.<br/>

- `tcpSocket probe` : 지정된 포트에 TCP 연결을 시도하여 연결되지 않으면 컨테이너를 다시 시작한다.<br/>

```javascript
livenessProbe:
  tcpSocket:
    port: 22
```

- `exec probe` : exec 명령을 전달하고 명령의 종료코드가 0이 아니면 컨테이너를 다시 시작한다.<br/>
```javascript
livenessProbe:
  exec:
    command:
      -ls
      - /data/file
```
<br/>

# LivenessProbe 문법


```javascript
livenessProbe:
  httpGet
    path: /
    port: 80
  successThreshold: 1 // 몇번 성공해야 성공으로 처리할지
  failureThreshold: 3 // 몇번 실패하면 실패로 처리할지
  timeoutSeconds: 1 // 응답 제한시간
  periodSeconds: 30 // 몇초에 한번 검사할지
```



# Liveness Probe Example

liveness Probe를 확인할 수 있는 smlinux/unhealthy pod를 생성해서 동작을 확인해보겠습니디.<br/>

해당 pod는 생성 후 60초 까지는 정상적으로 동작하지만 이후에는 제대로 동작하지않는 이미지 입니다.<br/>

yaml 파일의 cintainers image를 smlinux/unhealthy 으로 작성하고 port 번호를 바꿔줍니다.<br/>

![화면 캡처 2023-01-28 131838](https://user-images.githubusercontent.com/99805929/215241740-bcf9b7fa-1986-45d4-a760-53d97b09de9d.png)

아래 사진에서 확인 할 수 있듯 HTTP probe fail 이 3회가 된 시점에 killing 후 restart 하는 것을 확인 할 수 있습니다.<br/>

![화면 캡처 2023-01-28 131731](https://user-images.githubusercontent.com/99805929/215241798-8e3fe6e9-17da-4cf8-80d2-07ed451fd10d.png)







<br/>
<br/>

# Reference

