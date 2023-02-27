---
layout: article
title: "[Kubernetes] ConfigMap "
subtitle: "쿠버네티스 ConfigMap"
date: 2023-02-21 16:05:00 +0900
lastmod: 2023-02-21 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(3대) 로 진행하였습니다.<br/>


쿠버네티스 ConfigMap<br/>

# ConfigMap

컨피그맵은 키-값 쌍으로 기밀이 아닌 데이터를 저장하는 데 사용하는 API 오브젝트이다. 파드는 볼륨에서 환경 변수, 커맨드-라인 인수 또는 구성 파일로 컨피그맵을 사용할 수 있다.<br/>

컨피그맵을 사용하면 컨테이너 이미지에서 환경별 구성을 분리하여, 애플리케이션을 쉽게 이식할 수 있다.<br/>

쿠버네티스에서 컨테이너 환경변수를 관리할 때 사용한다.

## ConfigMap 생성하기

### CLI

커맨드 라인으로 configMap 생성이 가능하다.<br/>

- 값을 지정하는 경우 `--from-literal` 옵션을 사용한다.<br/>
`kubectl create configmap [configmap name] --from-literal=[key]=[value]` <br/>

- 파일로 생성하는 경우 `--from-file` 옵션을 사용한다.<br/>

```javascript
# 값을 지정하는 경우
kubectl create configmap test --from-literal=testkey=testvalue

# 파일로 생성하는 경우
# ConfitMap 생성 configmap -> cm
kubectl create cm my-config --from-file=config-file.yaml

# ConfitMap 조회
kubectl get cm
```

![스크린샷_20230221_113810](https://user-images.githubusercontent.com/99805929/220484833-ded101b5-f4f7-4681-bff4-d282be47220b.png)<br/>

![스크린샷_20230221_114408](https://user-images.githubusercontent.com/99805929/220484889-179a021a-34e4-4f2d-8c33-756a01a8a2e8.png)<br/>



### env file

yaml 파일 이외의 형식( ex - txt)으로 파일을 만들고 값을 작성하여 생성할 수도 있다.<br/>

### yaml

아래와 같은 형식으로 yaml 파일을 작성해서 생성할 수 있다. data에 value는 `" "(따옴표)` 로 감싸준다.<br/>


```yaml
# cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cm
data:
  key="value"

# 저장 후
kubectl apply -f cm.yaml
```

![스크린샷_20230221_115513](https://user-images.githubusercontent.com/99805929/220484952-9f028ceb-5d90-40d9-b970-ddb21cf9c195.png)<br/>

![스크린샷_20230221_115528](https://user-images.githubusercontent.com/99805929/220484968-c96e4e29-3849-4085-a483-d10f9823820f.png)

## configMap 사용하기

생성한 configMap을 파드에 마운트해서 사용하는 방법이다.<br/>

### 환경변수로 사용

spec.container.env 로 env를 가져올 수 있다.<br/>

![스크린샷_20230221_064610](https://user-images.githubusercontent.com/99805929/220485536-817a9ccb-b070-4ddf-a81b-62cff7fca6bb.png)<br/>

### volume mount

작성한 파일을 마운트 하는것도 가능하다.<br/>

![스크린샷_20230221_024729](https://user-images.githubusercontent.com/99805929/220492612-ec44814e-a642-42cd-aaf9-86682bc34995.png)<br/>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-dir
spec:
  containers:
    - name: dir-container
      image: busybox
      imagePullPolicy: IfNotPresent
      command: ["tail", "-f", "/dev/null"]
      volumeMounts:
        - name: cm-vol-file
          mountPath: /mnt/AGE
          subPath: AGE
  volumes:
    - name: cm-vol-file
      configMap:
        name: cm-command
```

### 환경변수 확인하기

```bash
kubectl exec [pod name] -- env
```

![스크린샷_20230221_013218](https://user-images.githubusercontent.com/99805929/220493496-3365a346-62d6-4f78-8198-1e2c7a557f92.png)<br/>

# Secret

## Secret 생성하기

ConfigMap 과 생성하는 방식은 같다. 하지만 Base64 로 인코딩 되어 값을 볼 수는 없다.<br/>

### CLI

```bash
kubectl create secret generic --from-literal password=123 passwd
```

![스크린샷_20230221_032704](https://user-images.githubusercontent.com/99805929/220492817-1ea1ce7b-e311-4c2a-903a-72ca69a7a5c6.png)<br/>

![스크린샷_20230221_032731](https://user-images.githubusercontent.com/99805929/220492830-bc5de7e9-9324-432d-95f6-50fe692a4569.png)

## Secret 마운트하기

ConfigMap과 다를게 없다.<br/>

### 환경변수 확인하기

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-secret
spec:
  containers:
    - name: secret-container
      image: busybox
      imagePullPolicy: IfNotPresent
      command: ["tail", "-f", "/dev/null"]
      env:
        - name: passwd # 알아서 쓰기
          valueFrom:
            secretKeyRef:
              name: passwd # secret의 name
              key: passwd # secret의 key name
```
### volume mount

옵션명만 다르지 ConfigMap과 같다.<br/>

```yaml
      volumeMounts:
        - name: secret-test # volume의 name과 동일하게
          mountPath: /mnt/key # 마운트 경로 설정
          subPath: key
  volumes:
    - name: secret-test # 알아서 정하기
      secret:
        secretName: secrete  # secret name
```

다음 명령어로 확인해보자
```bash
kubectl exec [pod name] -- ls [mountPath]
```

## SSL 

자체서명 인증서를 통한 HTTPS 접속해보기<br/>

### rsa key, 인증서, secret 생성하기
```javascript
openssl genrsa -out nginx.key 2048

openssl req -new -x509 -key nginx.key -out nginx.crt -days 365 -subj /CN=myapp.example.com

kubectl create secret tls nginx-tls --cert=nginx.crt --key=nginx.key
```
### conf 파일 작성하기

```javascript
# nginx-tls.conf
server {
    listen 80;
    listen 443 ssl;
    server_name myapp.example.com;
    ssl_certificate /etc/nginx/ssl/tls.crt;
    ssl_certificate_key /etc/nginx/ssl/tls.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    location / {
      root /usr/share/nginx/html;
      index index.html;
  }
}
```

### configmap 생성

```javascript
kubectl create cm tls-config --from-file=nginx-tls.conf
```

### pod 생성하기

Container 의 Volume에는  configmap 과 secret을 mount 한다.<br/>

pod에는 경로에 맞게 mount 해준다.<br/>

![스크린샷_20230221_042652](https://user-images.githubusercontent.com/99805929/220665941-9b82d7c2-1907-4b5f-baf8-fee0b1d89a90.png)<br/>

LoadBalancer를 이용하여 단일 진입점을 통해 접속할 수 있도록 해준다.<br/>

![스크린샷_20230221_043033](https://user-images.githubusercontent.com/99805929/220666071-6af2bc17-22c0-44e3-8112-46da50114b1c.png)<br/>

![스크린샷_20230221_045452](https://user-images.githubusercontent.com/99805929/220666425-13d886ba-dec2-4d6e-8a54-4a24842e6814.png)<br/>

![스크린샷_20230221_045447](https://user-images.githubusercontent.com/99805929/220666446-0b18e875-ab75-4a09-bfed-cd2ceb42f39b.png)


### 
---
secret mount의 경우 subPath를 사용하면 secret에 키와 인증서가 있어 1:1 매칭이 아니기 때문에 조회 할 수가 없다. 따라서 subPath는 사용하지 않는다.<br/>


<br/>
<br/>

# Reference

