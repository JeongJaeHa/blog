---
layout: article
title: "[Kubernetes] Schedule "
subtitle: "쿠버네티스 Schedule"
date: 2023-02-22 16:05:00 +0900
lastmod: 2023-02-22 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(3대) 로 진행하였습니다.<br/>


쿠버네티스 Schedule<br/>

# Schedule

## Node Selector

Node Selector는 match labels이 일치하는 node에 배치하는 스케줄링 방식이다.<br/>

nodeSelector 라는 옵션을 사용하여 Node Selector 옵션을 활성화해준다.<br/>

Pod를 생성하고 확인해보면 일치하는 Selector가 없기 때문에 Pending 상태로 대기하는 것을 확인할 수 있다.<br/>

노드에 Label 설정을 해주면 해당 노드에 Pod가 생성되는 것을 확인 할 수 있다.<br/>

![스크린샷_20230222_123040](https://user-images.githubusercontent.com/99805929/220649790-66dac9b8-ab7e-45bd-a581-c250d9eacee0.png)<br/>

![스크린샷_20230222_123453](https://user-images.githubusercontent.com/99805929/220649970-42e1d6a9-8656-41d9-8d7a-f1d97ba65fff.png)<br/>

![스크린샷_20230222_123458](https://user-images.githubusercontent.com/99805929/220650159-fa28b29e-3328-49e6-ba57-f0fc2813f1b1.png)



## Node Affinity

Node를 기준으로 하는 스케줄링 기법이다.<br/>

### required

MatchExpression 과 일치하는 node에만 배치할 것이다.<br/>

![스크린샷_20230222_050401](https://user-images.githubusercontent.com/99805929/220650846-e0c7be97-8c31-43b6-b212-8746b2829b47.png)<br/>

위 yaml 파일에서는 disk: ssd 인 node에만 배치한다고 작성하였다.<br/>

![스크린샷_20230222_050344](https://user-images.githubusercontent.com/99805929/220651696-bd85d336-008e-4b10-9fb2-1bd46687ad43.png)<br/>

node1 만 disk가 ssd 인것을 확인 할 수 있다.<br/>

![스크린샷_20230222_050349](https://user-images.githubusercontent.com/99805929/220652326-d45ad70c-ee34-41d2-b37c-2c80460fce88.png)<br/>

node1 에만 pod가 생성되는 것을 확인 할 수 있다.<br/>
### preffered

스케줄러는 조건을 만족하는 노드를 찾으려고 노력한다. 해당되는 노드가 없더라도, 스케줄러는 여전히 파드를 스케줄링한다. <br/>

![스크린샷_20230222_050502](https://user-images.githubusercontent.com/99805929/220652841-822a2f66-e172-4db6-9bd5-b1ff07ea80e1.png)<br/>

![스크린샷_20230222_050452](https://user-images.githubusercontent.com/99805929/220652862-386ad3cf-e6d8-4989-bd8e-bfc084152f8d.png)<br/>

node가 value로 hdd, ssd를 가지고 있기 때문에 여러 node에 분산되서 배치되는 것을 확인 할 수 있다.<br/>


## Pod Affinity

### Pod Affinity

파드를 한곳에 모아서 실행 시키도록 한다.<br/>
노드 선택은 랜덤으로 지정되고 노드를 지정하고 싶다면 nodeselector 옵션을 추가해준다.<br/>

<img width="757" alt="스크린샷 2023-02-22 오후 11 41 37" src="https://user-images.githubusercontent.com/99805929/220656331-e8169c8b-4937-4239-b491-7d2015ecaa21.png"><br/>

### Pod Anti-affinity

파드를 분산해서 실행시킨다.<br/>

<img width="755" alt="스크린샷 2023-02-22 오후 11 42 38" src="https://user-images.githubusercontent.com/99805929/220656306-304b05ef-fba3-4e1a-a9bd-1dcb532270f8.png"><br/>

### 동시에 사용하기

이미 각 Node에 DB Pod가 동작하고 있는 경우 각 Node에 WEB Server를 한대씩 동작 시키기 위한 방법은 다음과 같다.<br/>

![스크린샷_20230222_055344](https://user-images.githubusercontent.com/99805929/220790191-cf9154ac-73c1-4bdf-9744-3e7383ca4cb7.png)<br/>

이미 생성되어있는 DB Pod를 기준으로 Pod를 모아서 실행하되 Web server Pod는 분산시키는 것이다.<br/>

따라서 Node에 Web Pod가 생성되어 있는 경우에는 Anti-affinity이기 때문에 추가로 생성하지 않고 다른 Node에 생성하게 된다.<br/>

결론적으로는 다음과 같이 될것이다.<br/>

<img width="692" alt="스크린샷 2023-02-22 오후 11 54 21" src="https://user-images.githubusercontent.com/99805929/220659612-a087d904-cc85-49b1-873f-85e9eafe6fd9.png"><br/>


## Taints & Toleration

### Taints

파드의  배치를 제한(배제) 하고싶은 노드를 지정한다. `NoSchedule` 옵션을 사용하는 경우 해당 노드에 파드가 배치되지 않는다.

##### Taints 지정하기

```javascript
kubectl taint node node1 gpu=true:NoSchedule

kubectl taint node node2 gpu:NoSchedule
```

![스크린샷_20230222_041046](https://user-images.githubusercontent.com/99805929/220660374-f057a643-351d-403e-8061-863385dd0b50.png)<br/>

Node1과 Node2에 Taints 지정해주었다. 이제부터 생성되는 Pod는 Node3 에만 생성될것이다.<br/>

![스크린샷_20230222_040851](https://user-images.githubusercontent.com/99805929/220660955-4877f71b-c69e-443f-a5f0-ec0e6aec9bae.png)<br/>

<img width="517" alt="스크린샷 2023-02-23 오전 12 03 23" src="https://user-images.githubusercontent.com/99805929/220662033-783a70fb-45e8-42ab-bd9f-2662aa8b697b.png"><br/>

![스크린샷_20230222_060002](https://user-images.githubusercontent.com/99805929/220661267-762a35af-62e1-4ca5-b585-5f940dfe204b.png)<br/>

### Toleration

Taints로 지정된 항목에 예외를 둔다.<br/>

![스크린샷_20230223_085340](https://user-images.githubusercontent.com/99805929/220790665-f3f0bba4-8c2e-4c8e-b9af-ddba7bc7954e.png)<br/>

spec 부분에 toleration 옵션을 작성한 뒤 yaml 파일을 실행시켜 보면 Taints 설정이 적용된 Node에도 배치되는 것을 확인 할 수 있다.<br/>

![스크린샷_20230222_060023](https://user-images.githubusercontent.com/99805929/220790909-c19147d6-c860-42ad-bdc7-6c4df319bb4c.png)<br/>

<br/>
<br/>

# Reference

