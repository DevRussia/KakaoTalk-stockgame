> 이 소스는 아직 미완성된 소스입니다. 정식 버전이 나오기 전까지는 이용하지 말아 주십시오.<br>

> 또한 이 소스는 메신저봇에서는 작동합니다만, 채팅자동응답봇에서는 작동하지 않을수 있습니다. 채자봇 버전으로는 개발되지 않으니 사용을 원하시는 경우 메신저봇을 깔아서 그 앱에서 이용 바랍니다.<br>

> 사용전 주의하실 점이 있습니다 <a href="#주의사항">이곳을 클릭하여</a> 자세히 알아보세요

# KakaoTalk-stockgame
![GitHub Repo stars](https://img.shields.io/github/stars/DevRussia/KakaoTalk-stockgame?style=flat-square) 잘 이용하고 계신다면 star 한번 해주세요!

메신저봇에서 동작하는 카카오톡 주식게임봇입니다. 누구나 <a href="#추신">추신 부분</a> 그리고, MIT 라이선스를 준수하신다면, 누구나 사용이 가능한 소스입니다. 이 둘을 지킬 용기가 없으시다면, 사용하지 말아주시기 바라겠습니다.

이슈보고는 이슈 페이지에서 해주세요, 또한 문의나 궁금한점이 있으시다면 이슈 페이지로 알려주신다면 최대한 빠르게 연락드리겠습니다.
이메일 문의 및 이슈보고: <a href="mailto:admin@simpcode.co.kr">이 링크를 클릭하세요</a>

# 개발자
깃허브 아이디 DevRussia, maxking2007가 만들어나갑니다.

# 라이선스
라이선스 준수: MIT
또한 사용시 출처를 명시해주셔야합니다. 본인이 만든것처럼 자랑질하고 다니면 쫒아갑니다.

# 주의사항
이용시 다음과 같은 주의사항이 있습니다.

* 접두사는 소스 위쪽에 
```JavaScript 
const prefix="/" 
``` 
라고 되어 있습니다. 그것을 원하는 접두사로 변경 시 해당 접두사로 이용이 가능합니다 (기본: /[슬래시]). 다만 >> 같이 2개로 이루어진 접두사는 이용할수 없음을 알려드립니다.

`채자봇`은 지원되지 않습니다. 양해부탁드립니당 🙏
# 기능 (개발예정)
<!--개발이 된 기능은 앞에 예정을 완료로 변경해주세요-->
초기화시 회사의 목록은 기본 목록으로 초기화처리됩니다.

[예정] 매수제한
한 턴당 각 주식의 매수제한이 걸릴 예정입니다. 예를들어 베타멕스 주식회사의 주식 매수제한이 100인데, A가 한 턴에 배타멕스 주식회사의 주식을 100주를 사버리면, 다른 유저는 해당 주식회사의 주식을 구매할수 없게하는 기능입니다.

[예정] 주식 가격 제한
주식이 오르는 경우에는 모든 플레이어의 자본이 해당 주식으로 몰립니다. 따라서, 주식이 오를때는 최소 원래 가격의 최소 50% 초과의 가격이 오르지 않게 될 예정이고, 또한, 주식을 여러명이 급매도하는 경우에는 주식의 가격도 따라서 하락하게 하는 그런 시스템입니다.

# 추신
> 이 게임 소스는 개발진을 제외하고는 상업적 용도로 사용할수 없습니다.<br>
> /주식 정보, /주식 도움말, /주식 명령어 명령어를 치면 정보가 나오는데, 그 정보를 개발자가 아닌 경우, 출처를 수정하거나 개발자 이름을 변경하여도 안됩니다. 변경하여 생긴 불이익이나 법적 처벌은 본인이 집니다

이에 동의하지 않는 경우, 봇을 이용하지 말아주십시오
