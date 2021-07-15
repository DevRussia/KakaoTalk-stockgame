const scriptName = "stockbot";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

  //simpcode and 베타맥스
  const profile = java.lang.String(imageDB.getProfileImage()).hashCode();
  const prefix = "/"//명령어 접두사.
  var Command = function(ctx){
      return prefix+ctx;
  }

  const stockList = {
      company1:{
          current_price:3400,
          original_price:3400,
          volatility:"auto",
          change_type:"auto"
      },
      betamax:{
          current_price:18400,
          original_price:18400,
          volatility:"auto",
          change_type:"auto"
      }
  }

  path="/sdcard/StockBot";
  const setting = {
      userpath:path+"/"+profile+" ("+sender+").txt",
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
          '현재 해당 주식은 전체 매수 한도선을 초과하여 매도가 불가합니다',
          '돈이 부족하여 주식 상장을 할수 없습니다',
          '돈이 부족하여 해당 주식을 매도할수 없습니다.',
          '해당 주식 매도 한도선을 초과하여 매도할수 없습니다',
          '해당 주식명은 존재하지 않습니다',
          '상장폐지된 주식의 이름으로 상장할수 없습니다',
          '해당 주식은 상장 폐지되어 구매할수 없습니다',
          '오류가 발생하였습니다. 잠시 이용을 멈춰주세요.'
      ]
  }

  const user = {};
  user[profile] = JSON.parse(FileStream.read(setting.userpath));
  if(user[profile]==null){
      FileStream.write(setting.userpath,JSON.stringify(setting.userfile))
  }
  save = function(){
    FileStream.write(setting.userpath,JSON.stringify(user[profile]));
  }

  java.io.File(path).mkdirs() //최상위 경로 폴더 만듬

  const stockfile = JSON.parse(FileStream.read(setting.stockpath))
  if(stockfile==null){ //stock 파일이 미존재한다면
      FileStream.write(setting.stockpath,JSON.stringify(stockList)) //stockList를 해당 파일에 넣어버린다.
  }

  function StockGame(){
      this.path=path;
      this.userpath=setting.userpath;
      this.stockpath=setting.stockpath;
  }

  function Math(){
  }

  Math.prototype.isint = function(check){
      this.check=check;
      if(isNaN(this.check)==false){
          if(Number.isInteger(Number(this.check))==true){
              return true;
          }else{
              return '정수를 입력해주세요. 소수를 입력하신것 같습니다';
          }
      }else{
          return '숫자를 입력해주세요. 문자열을 입력하셨습니다.';
      }
  }

  StockGame.prototype.existence = function(name){
      if(stockList[name]!==undefined){
          return true
      }else return false;
  }

  StockGame.prototype.buy = function(company,num){
    let orderprice = stockList[company]["current_price"] * num;
    if(orderprice>user[profile]["money"]){
        return setting.message[4];
    }else{
        user[profile]["money"] -= orderprice;
        if(user[profile]["data"]["mystock"][company]!==undefined){
            user[profile]["data"]["mystock"][company]+=num;
            save();
            return company+"의 주식 "+num+"주를 구매하였습니다";
        }
    }
  }

  StockGame.prototype.CreateAccount = function(){
      if(FileStream.read(setting.userpath)==null){
          FileStream.write(setting.userpath,JSON.stringify(setting.userfile))
          return setting.message[0];
      }else{
          return setting.message[1];
      }
  }

  Game = new StockGame();
  let cmd = msg.split(" ");
  if(cmd[0]==Command("주식")){
      if(cmd[1]=="가입"){
          replier.reply(room,StockGame.CreateAccount(),true);
      }else{
          replier.reply("없는 명령어입니다.")
      }
  }else if(cmd[1]=="매수"){
      if(StockGame.existence(cmd[2])==true){
          if(Math.isint(cmd[3])==true){
              buynum = Number(cmd[3]);
              StockGame.buy(cmd[2],buynum);
          }else{
              replier.reply(room,Math.isint(cmd[3]),true)
          }
      }else{
          replier.reply(room,"존재하지 않는 회사입니다!",true)
      }
  }
}
