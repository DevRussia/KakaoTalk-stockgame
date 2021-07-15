const scriptName = "stockbot";

const Game = new StockGame();

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

  //simpcode and 베타맥스
  const profile = java.lang.String(imageDB.getProfileImage()).hashCode();
  const prefix = "/"//명령어 접두사.
  var Command = function(ctx){
      return prefix+ctx;
  }

  let StockData = {
  "StockList":{
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
  },
  "userdata" : {}
  }



 


  function StockGame(){
      this.path="sdcard/StockBot/StockData.json";
      this.usersetting = {
      "username" : sender,
      "usermoney" : 100000,
      "ownstock" : {},
      "owncompany" :{}
      }
      this.message = [
        '가입 완료했습니다.', 
        '이미 가입했습니다.', 
        '가입 먼저 해주세요.', 
        '매매하려는 종목을 찾을 수 없습니다.', 
        '자연수만 입력해주세요.',
        '주문 가능 물량을 초과했습니다.\n주문 가능 수량: ',
        '매도 가능 물량을 초과했습니다.\n매도 가능 수량: ',
        '매도 가능 물량이 없습니다.',
        '상장 폐지된 주식은 매매 할 수 없습니다.'
    ];
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

  StockGame.prototype.fs = function(path , data){
    if(!data) return JSON.parse(FileStream.read(path));
    return FileStream.write(path, JSON.stringify(data, null, 4));
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
