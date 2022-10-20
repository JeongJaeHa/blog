---
layout: article
title: "Github Theme CSS icon이 안보이는 경우 해결(Feat. TeXt Theme)"
subtitle: "아이콘 엑박 해결하기"
date: 2022-09-15 18:50:00 +1800
lastmod: 2022-09-15 18:50:00 +1800
tags: 
    - TeXt_Theme
    - CSS
    - FontAwesome
    - Icon
    - 안보여요
---

포크 떠온 Jekyll Theme 엑박 해결하기
<!--more-->  
---  
![error](https://user-images.githubusercontent.com/99805929/190371124-abb224a7-564f-4344-b755-ad0c1fbe1175.png)  

깃허브 블로그를 개설하는 과정에서 마음에 드는 테마를 발견하였다.  
그래서 포크를 떠서 개인 Repository에 올리고 들어가 보았는데 FontAwesome 아이콘이 안 보이는 문제가 발생했다.  
더욱이 CSS와 공부를 하지 않았던 백엔드 주니어로서 굉장히 난감한 상황이었다. 다른 동기분들께 물어보았지만 리액트에서 사용하던 구조가 아니라
다들 잘 모르겠다는 답변을 해주셨다. 테마가 굉장히 마음에 들어서 이걸 사용하겠다는 일념 하에 모든 파일들을 뒤적거렸고 마침내 해결을 했다.  
<br>
혹시 해결은 하고 싶지만 원인을 몰라 방황하시는 분들이 계실지 몰라 블로그에 글을 작성해서 남겨놓는다.  
<br>

# 무엇이 문제인가?  
고민한 시간은 굉장히 길었지만, 해결 방법은 굉장히 단순했다. 바로 FontAwesome의 **버전 문제** 였다. 포크를 떠와서 설치하는 과정에서 FontAwesome의 cdn 버전이 5.15.0 버전으로 되어버려서 아이콘이 나오지 않았던 것이었다.  
<br>

# 해결 방법!  
일단 고쳐줘야 할 항목은 FontAwesome의 cdn 버전이다. 보통은 `_data/variables.yml`에 들어가 있는데 `variables.yml` 파일이 여러 개 있으니 서치 기능을 통해 모두 검색하는 것을 추천드립니다.

```javascript
font_awesome: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'  

혹은  

font_awesome: 'https://use.fontawesome.com/releases/v5.14.0/css/all.css'
```  

5.15보다 낮은 버전으로 바꿔주시면 엑박이 출력되는 것을 해결 할 수 있습니다.  
<br>

# 그래도 잘 모르겠다면?  
내가 사용하고 싶은 테마를 잘 적용하신 분의 세팅을 참고해 보는 것도 문제를 해결하는 데 도움이 될 것 같다. 저도 잘 세팅 해놓으신 분의 코드를 참고했던 것이 문제를 해결하는 데 도움이 많이 되었습니다.  
<br>

감사합니다 :)