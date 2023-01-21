---
layout: article
title: "[리눅스] RoadBalancer 설정하기"
subtitle: "LoadBalancer 설정하기"
date: 2023-01-19 16:05:00 +0900
lastmod: 2023-01-19 17:50:00 +0900
tags: 
  - 리눅스
  - LoadBalancer

---
<br><br>
리눅스 서버 Load-Balancer 설정하기

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다.<br/>


윈도우에서 가상머신 리눅스서버 RoadBalancer 설정하기<br/>



#  설정하기

준비한 것은 네임서버, 웹서버1, 웹서버2, 프록시 서버 이렇게 4대를 준비하였고, haproxy는 프록시 서버에 설치하여 진행하였다.


## 프록시 서버 설정하기

haproxy 패키지를 사용합니다.<br/>

`sudo apt install haproxy` 로 패키지를 설치합니다.<br/>


`sudo vim /etc/haproxy/haproxy.cfg` 명령어를 이용하여 해당 파일을 다음과 같이 수정합니다.<br/>

```
frontend haproxy-main
        bind *:80 # 포트번호
        option forwardfor
        default_backend apache_webserver #backend 이름

backend apache_webserver
        balance roundrobin
        server webserver1 10.0.2.10 # 본인 가상머신 IP주소 
        server webserver2 10.0.2.30 # 본인 가상머신 IP주소

```
<br/>

![스크린샷_20230120_052049](https://user-images.githubusercontent.com/99805929/213650597-c1abf245-c992-45d0-8fd8-213730abcd4f.png)<br/>

문법체크하기

```
$ haproxy -c -f /etc/haproxy/haproxy.cfg	-> 문법 체크
$ tail /var/log/haproxy.log			-> 로그 확인- 에러 체크
$ sudo systemctl restart haproxy.service
```

## 네임서버 설정하기

네임서버에서 CNAME 설정을 통해 www 도메인으로 들어오는 것들은 proxy 서버로 가도록 설정한다.

![스크린샷_20230120_052710](https://user-images.githubusercontent.com/99805929/213650942-40389d2a-a659-4e9b-873a-6ef9b9a07364.png)<br/>


## 확인하기

`nslookup 웹서버 도메인` 으로 ip가 번갈아가며 나오는지 확인해본다.<br/>

![스크린샷_20230120_030747](https://user-images.githubusercontent.com/99805929/213651297-ab9da07a-c60c-45f3-ae5d-f7042970e5ed.png)<br/>



# HTTPS 로 Redirect 시키기

## 설정하기

개별 HTTPS로 Redirect 시키기 위해서는 pem 키가 필요한데 별도로 생성하지 않았다.<br/>

그래서 proxy 서버에서 설정을 해서 HTTPS로 Redirect하도록 설정해보았습니다.<br/>

`sudo vim /etc/haproxy/haproxy.cfg` 명령어로 아까 전에 작성한 내용에 다음을 추가해줍니다.<br/>

```
mode http
redirect scheme https code 301 if { hdr(Host) -i www.mydomain.com } !{ ssl_fc }
```
<br/>

![스크린샷_20230120_053415](https://user-images.githubusercontent.com/99805929/213652033-d6a70218-8eba-4ae3-83a7-963cbc36fb6a.png)<br/>

## 확인하기
원래 `curl -k domain` 이 https 이고 `curl` 이 http 를 확인하는데 `curl` 로 확인했을때 전자와 동일한 결과가 나오면 된다고 생각했다.<br/>

`curl domain` 으로 확인해본다. HTTPS 적용이라 html 페이지가 나오지는 않는다.(잘 된다고 믿어야지..)<br/>

![스크린샷_20230120_054149](https://user-images.githubusercontent.com/99805929/213652869-f2d610f4-f46a-4f07-bcb6-bb51086632e0.png)










<br/>
<br/>

# Reference
그림으로 배우는 인프라구조

[HAProxy redirecting http to https (ssl)](https://stackoverflow.com/questions/13227544/haproxy-redirecting-http-to-https-ssl)