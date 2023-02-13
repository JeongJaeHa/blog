---
layout: article
title: "[Kubernetes] Job & CronJob "
subtitle: "쿠버네티스 Job & CronJob"
date: 2023-02-13 16:05:00 +0900
lastmod: 2023-02-13 20:50:00 +0900
tags: 
  - 리눅스
  - k8s

---

<!--more-->  
윈도우(Windows11)환경의 VirtualBox에 설치한 우분투 서버이미지(20.04 LTS)에서 진행하였습니다. 마스터(1대) 워커노드(3대) 로 진행하였습니다.<br/>


쿠버네티스 Job & CronJob<br/>

# Job

잡에서 하나 이상의 파드를 생성하고 지정된 수의 파드가 성공적으로 종료될 때까지 계속해서 파드의 실행을 재시도한다. 파드가 성공적으로 완료되면, 성공적으로 완료된 잡을 추적한다. 지정된 수의 성공 완료에 도달하면, 작업(즉, 잡)이 완료된다. 잡을 삭제하면 잡이 생성한 파드가 정리된다. 작업을 일시 중지하면 작업이 다시 재개될 때까지 활성 파드가 삭제된다.

# Job 생성해보기

다음과 같이 yaml 파일을 작성해준다.

```javascript
# job.yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
spec:
  template:
  spec:
    containers:
    - name: sleep
      image: busybox
      imagePullPolicy: IfNotPresent
      command: ["sleep", "10"]
    restartPolicy: OnFailure
```

restartPolicy 에는 `OnFailure`, `Never` 옵션을 줄 수 있다.<br/>

|옵션|내용|
|:---:|:---:|
|OnFailure|실패하는 경우 재실행|
|Never|재실행하지 않음|

Job에는 option을 줄 수 있는데 `completion` , `parallelism` 이라는 옵션이 있다.<br/>

|옵션|내용|
|:---:|:---:|
|completion|순차적으로 몇개 실행 할지|
|parallelism|동시에 몇기 실행할지|

<br/>

completion 옵션은 Job이 완료되는 대로 다음 Jon을 실행하는 것이고

![스크린샷_20230213_121719](https://user-images.githubusercontent.com/99805929/218396805-b4f6460e-7311-44f6-a213-7067fa74482a.png)
<br/>

parallelism은 동시에 설정한 개수만큼의 Job을 실행하는 것이다.

![스크린샷_20230213_122009](https://user-images.githubusercontent.com/99805929/218397275-71b3860a-8b1e-4475-ade5-2c4bd6077a2d.png)
<br/>


# CronJob

- 일회성 작업을 수행하는 어플리케이션에 사용<br/>
- 특정 시각에 주기적으로 반복 작업 수행<br/>
- 동시 실행여부 결정 가능<br/>

# CronJob 생성해보기

70초 동안 sleep 하는 파드를 생성하는 yaml 파일을 생성하였다<br/>

```javascript
# cron.yaml

apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-cronjob
spec:
  template:
  spec:
    containers:
    - name: hello
      image: busybox
      imagePullPolicy: IfNotPresent
      command: ["sleep", "70"]
    restartPolicy: OnFailure
```

## Option
`concurrentPolicy`, `startingDeadlineSeconds`, `successfulJobsHistoryLimit` 을 옵션으로 줄 수 있다.<br/>

### concurrentPolicy

|옵션|내용|
|:---:|:---:|
|Allow|크론 잡은 동시에 실행되는 잡을 허용한다.|
|Forbid|크론 잡은 동시 실행을 허용하지 않는다. 새로운 잡을 실행할 시간이고 이전 잡 실행이 아직 완료되지 않은 경우, 크론 잡은 새로운 잡 실행을 건너뛴다.|
|Replace|새로운 잡을 실행할 시간이고 이전 잡 실행이 아직 완료되지 않은 경우, 크론 잡은 현재 실행 중인 잡 실행을 새로운 잡 실행으로 대체한다.|

참고로 동시성 정책은 동일한 크론 잡에 의해 생성된 잡에만 적용된다. 크론 잡이 여러 개인 경우, 각각의 잡은 항상 동시에 실행될 수 있다.

#### Allow

이미 실행되고 있지만 동시에 새로운 Job도 실행된다.

![스크린샷_20230213_051207](https://user-images.githubusercontent.com/99805929/218405545-030ef5e7-b79d-4240-a46b-48cc246219c1.png)

#### Replace

실행되고 있는 Job을 삭제하고 새로운 Job을 생성했다.

![스크린샷_20230213_051107](https://user-images.githubusercontent.com/99805929/218405626-243e743b-daf3-4443-ad0f-6cc4677584f3.png)

#### Forbid

다른 Job이 실행되고 있어 실행하지 못하고 다음 정각에 실행되었다.<br/>

![스크린샷_20230213_051506](https://user-images.githubusercontent.com/99805929/218405696-725dfe09-6871-4364-bf59-127c8cb884fc.png)

<br/>

### startingDeadlineSeconds

어떤 이유로든 스케줄된 시간을 놓친 경우 Job의 시작 기한을 초 단위로 나타낸다. 이 필드를 지정하지 않으면, Job을 실행하는 기한이 없다.<br/>

### successfulJobsHistoryLimit

기본적으로, 각각 3으로 설정된다. 한도를 0 으로 설정하는 것은 잡 완료 후에 해당 잡 유형의 기록을 보관하지 않는다는 것이다.<br/>

![스크린샷_20230213_023149](https://user-images.githubusercontent.com/99805929/218402545-94155f7e-7b69-4ce0-9a7d-f0130dfac8aa.png)

limit 가 3으로 설정된 경우에<br/>

![스크린샷_20230213_023421](https://user-images.githubusercontent.com/99805929/218403201-b08d7044-b0e1-4177-812d-d6f28bf8881c.png)

4번째 history가 생성되는 시점에 처음 생성된 history가 삭제되는 것을 확인 할 수 있다.<br/>





<br/>
<br/>

# Reference

