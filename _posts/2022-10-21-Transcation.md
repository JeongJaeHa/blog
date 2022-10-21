---
layout: article
title: "Transaction 알아보기"
subtitle: "Transaction 알아보기"
date: 2022-10-19 22:50:00 +0900
lastmod: 2022-10-21 08:50:00 +0900
tags: 
    - MYSQL
    - Transcation

---
<br><br>
Transaction 알아보기

<!--more-->  


# Transaction?
트랜잭션(Transaction)은 데이터베이스의 상태를 변환시키는 하나의 논리적 기능을 수행하기 위한 작업의 단위 또는 한꺼번에 모두 수행되어야 할 일련의 연산들을 의미합니다.<br/>
<br/>

# Transaction 성질
트랜잭션의 특징은 4가지가있습니다.<br/>
<br/>

### Atomicity(원자성)
- 트랜잭션의 수행결과는 데이터베이스에 전부 반영되거나, 전부 반영되지 않아야 합니다.(Nothing or All)<br/>
<br/>

### Consistency(일관성)
- 트랜잭션 수행 후 데이터 모델의 모든 제약조건을 만족해야 합니다.<br/>
<br/>

### Isolation(고립성)
- 트랜잭션 수행 시 다른 트랜잭션이 영향을 미치지 않아야 합니다.<br/>
<br/>

### Durability(지속성)
- 트랜잭션의 성공결과는 장애 발생 후에도 변함없이 보관되어야 합니다.<br/>
<br/>

# Transaction 사용이유
트랜잭션을 공부하며 트랜잭션은 절대 중단되면 안되는 작업들을 하나로 묶어서 실행하는 작업단위로 이해했습니다.<br/>
<br/>
대표적인 예시로는 은행의 송금작업이 있는데 A계좌에서 금액을 차감하고 B계좌에 금액을 더해야하는데 A계좌에서 금액을 차감하는 순간 어떠한 이유로 작업이 중단되게 된다면, A계좌에서 빠진 돈은 허공으로 증발해버리기 때문이죠.<br/>
<br/>
이러한 이유로 트랜잭션은 성공되거나 실패하거나 둘중에 하나의 결과를 나타내는데, 성공하는 경우에는 commit을 실패하는 경우에는 rollback을 실행하게됩니다.<br/>
<br/>

# 적용해보기
TypeORM에는 여러가지 Transaction 작성방식이 있는데 이번 글에서는 Query runner를 위에서 언급한 송금예제에 적용해 구현해보았습니다.<br/>
<br/>
<img width="246" alt="스크린샷 2022-10-21 오후 1 45 33" src="https://user-images.githubusercontent.com/99805929/197114445-639174da-9bb9-46a6-9d9d-031fa4d8193e.png">  <img width="240" alt="스크린샷 2022-10-21 오후 1 46 12" src="https://user-images.githubusercontent.com/99805929/197114492-6df3634f-f85e-4037-b1ae-d371aac9740f.png">

위 사진처럼 김개발의 account에서 나코딩의 account로 1000원을 보내는 간단한 송금로직을 작성해보았습니다. A계좌에서 금액을 빼고, B계좌에 넣는 과정에 트랜잭션을 적용하였는데, try/catch 구문을 사용해서 에러가 발생하면 rollback 구문이 실행되도록 작성하였습니다.<br/>
<br/>

```javascript
const transDao = async (send, receive, price) => {
    const queryRunner = await AppDataSource.createQueryRunner() // db 커넥션 설정
    await queryRunner.connect();
    await queryRunner.startTransaction(); //트랜잭션 시작
    try {
        await queryRunner.query( // 돈을 차감한다
            `
            UPDATE user u
            SET account = account - ${price}
            WHERE u.id = ${send}
            
            `
            )
        const checkReceive = await queryRunner.query( // 받는사람을 확인한다.
            `
            SELECT EXISTS(
                SELECT * FROM user u
                WHERE u.id = ${receive}
            )
            `
        )
        
        let checkReceiveResult = Object.values(checkReceive[0])[0];
        if(checkReceiveResult == 0) throw new Error("Receive Not Exists", 400); // 없는경우 에러발생
        
        await queryRunner.query( // 받는 사람의 계좌에 금액 추가
                `
                UPDATE user u
                SET account = account + ${price}
                WHERE u.id = ${receive}
                `
            )
            
        await queryRunner.commitTransaction() // 문제없는 경우 커밋
        return true;
    } catch(err) {
        await queryRunner.rollbackTransaction() // 문제있는 경우 롤백
        throw new Error("Fail", 400);
    } finally {
        await queryRunner.release() // dbConnection을 끊어주는 구문
    }
}
```
<br/>

# queryRunner 사용시 유의할점
1. try할때 db로직이 이루어진후 마지막에 꼭 await queryRunner.commitTransaction(); 를 해줘서 커밋처리를 해줘야합니다.
2. finally를 사용해서 try/catch가 끝나면 꼭 await queryRunner.release();를 사용해 줘서 db커넥션을 끊어줘야합니다
3. Repository를 사용할때는 queryRunner.manager를 통해서 사용해야 트렌젝션이 걸립니다.<br/>
<br/>

# Reference
[트랜잭션 성질](https://mytodays.tistory.com/38)<br/>
[queryRunner 사용시 유의사항](https://velog.io/@fj2008/NestjsTypeOrm-%ED%8A%B8%EB%9E%9C%EC%A0%9D%EC%85%98-%EC%B2%98%EB%A6%AC-queryRunner)