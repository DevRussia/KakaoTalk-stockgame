const scriptName = "stockbot";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  //simpcode and 베타맥스
  const profile = java.lang.String(imageDB.getProfileImage()).hashCode();
  const prefix = "/"//명령어 접두사.
  var Command = function(ctx){
      return prefix+ctx;
  }

  const setting = {
      path:"/storage/emulated/0/StockBot", //사용자 정보를 저장할 
      userpath:setting.path+"/"+profile+" ("+sender+").txt",
      userfile:{
          name:sender,
          nick:sender,
          money:1000000,
          data:{
              mystock:{}, //나중에 회사명:보유주식수 로 대입할 예정
              mycompany:{} //내회사 정보
          }
      },
      stockpath:path+"/stock.txt",
      message:[
          '가입되셨습니다',
          '이미 가입하셨습니다.',
          '현재 해당 주식은 매도가 불가합니다',
          '현재 해당 주식은 매수가 불가합니다.'
      ]
  }

  function StockGame(){
      this.path=setting.path;
      this.userpath=setting.userpath;
      this.stockpath=setting.stockpath;
  }

  StockGame.prototype.CreateAccount = function(){
      if(FileStream.read(setting.userpath)==null){
          FileStream.write(setting.userpath,JSON.stringify(setting.userfile))
          return message[0];
      }else{
          return message[1];
      }
  }

  Game = new StockGame();
  let cmd = msg.split(" ");
  if(cmd[0]==Command("주식")){}
}
