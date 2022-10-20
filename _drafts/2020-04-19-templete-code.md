# 추가2 : xml, html 등에서 코드블럭 익스케이프

그냥 구문을 작성하다 보면 코드블럭에서 그 구문이 실행되 버리는 경우가 있는데 그럴땐 아래 방법으로 이스케이프 구문을 사용하면 된다.

<p style="color:#e83e9b">
  &emsp;&#123;&#37; raw &#37;&#125; ~ &emsp;&#123;&#37; endraw 	&#37;&#125;
</p>

<div style="background-color:#272822; color:white; padding:5px">
  &emsp;&#123;&#37; raw &#37;&#125;<br>
  &emsp;&emsp;&#60;div id="post-disqus" class="container"&#62;<br>
  &emsp;&emsp;&emsp;&#123;&#37; include disqus.html &#37;&#125;<br>
  &emsp;&emsp;&#60;/div&#62;<br>
  &emsp;&#123;&#37; endraw 	&#37;&#125;<br>
</div>

코드블럭 구문으로 코드를 덮어주면 하이라이트도 가능하다.

<br>

같은 라인에 써야 위아래 공백 안생김

---