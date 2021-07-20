const scriptName = "stockbot";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    //simpcode and 베타맥스
    const RealCompany = ["lg","삼성","samsung","삼성전자","samsungelectronics","samsung electronics","samsung electronics co., ltd.","samsungelectronicsco.,ltd.","얀덱스","yandex","유튜브","youtube","tesla","테슬라","구글","구글번역","구글 번역","google","한화","hanwha","쿠팡","coupang"]
    const COMPRESS = "\u200b".repeat(500);
    const profile = java.lang.String(imageDB.getProfileImage()).hashCode();
    const prefix = "/"//명령어 접두사.
    var Command = function(ctx){
        return prefix+ctx;
    }

    let StockData = {
        StockList:{
            company1:{
                current_price:3400,
                original_price:3400,
                volatility:"auto",
                change_type:"auto",
                maximum : 100,
                amount :0
            },
            betamax:{
                current_price:18400,
                original_price:18400,
                volatility:"auto",
                change_type:"auto",
                maximum : 200,
                amount : 0
            }
        },
        userdata: {}
    }
    function StockGame(){
        this.version="v0.1-alpha"
        this.developers=["DevRussia","betamax"];
        this.path="sdcard/StockBot/StockData.json";
        this.userpath="sdcard/StockBot/users/"+profile+" ("+sender+").txt"
        this.userfile=JSON.parse(FileStream.read(this.userpath))
        this.usersetting = {
            username: sender,
            usermoney: 100000,
            ownstock: {},
            owncompany:{}
        }
        this.message = [
            '가입 완료했습니다.', 
            '이미 가입했습니다.', 
            '가입 먼저 해주세요.', 
            '매매하려는 종목을 찾을 수 없습니다.', 
            '자연수만 입력해주세요.',
            '매수 가능 물량을 초과했습니다.\n주문 가능 수량: ',
            '매도 가능 물량을 초과했습니다.\n매도 가능 수량: ',
            '매수 가능 물량이 없습니다.',
            '매도 가능 물량이 없습니다.',
            '상장 폐지된 주식은 매매 할 수 없습니다.'
        ];
    }
    const Game = new StockGame();
    //세이브 함수 지우지마!!
    save = function(){
        FileStream.write(Game.userpath,JSON.stringify(Game.userfile));
    }    


    if(JSON.parse(FileStream.read(Game.path))==null){
        FileStream.write(Game.path, JSON.stringify(StockData));
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
        down = name.toLowerCase();
        if(StockData["StockList"][name]!==undefined){
            return true
        }else{
            if(RealCompany.indexOf(down)!=-1){
                return name+"은(는) 유명한 회사의 이름 혹은 진짜 있는 회사의 이름이기에, 이 주식겜 내에서 이 이름은 회사명으로 사용이 금지되어 있습니다"
            }else{
                return "없는 회사입니다."
            }
        }
    }

    StockGame.prototype.buy = function(company,num){
        let orderprice = StockData["StockList"][company]["current_price"] * num;
        if(orderprice>this.userfile["usermoney"]){
            i = orderprice-this.userfile["usermoney"]
            return "돈이 "+i+"만큼 부족하여 구매할수 없습니다";
        }else{
            this.userfile["usermoney"] -= orderprice;
            if(this.userfile["ownstock"][company]!==undefined){
                this.userfile["ownstock"][company]+=nu
                save();
                return company+"의 주식 "+num+"주를 구매하였습니다";
            }else{
                this.userfile["ownstock"][company]=num;
                save();
                return company+"의 주식 "+num+"주를 구매하였습니다";
            }
        }
    }

    StockGame.prototype.MyMoney = function(){
        return this.userfile["usermoney"];
    }

    StockGame.prototype.IsJoined = function(){
        if(FileStream.read(this.userpath)!==null){
            return true
        }else{
            return "가입을 하지 않아 주식 게임을 이용할수 없습니다. 가입을 먼저해주세요.\n"+prefix+"주식 가입 을 채팅창에 입력해보세요"
        }
    }

    StockGame.prototype.CreateAccount = function(){
        if(FileStream.read(this.userpath)==null){
            FileStream.write(this.userpath,JSON.stringify(this.usersetting))
            return this.message[0];
        }else{
            return this.message[1];
        }
    }
  
    math = new Math();
    let cmd = msg.split(" ");
    if(cmd[0]==Command("주식")){
        if(cmd[1]=="가입"){
            replier.reply(room,Game.CreateAccount(),true);
        }else if(cmd[1]=="매수"){
            if(Game.IsJoined()==true){
                if(Game.existence(cmd[2])==true){
                    if(Math.isint(cmd[3])==true){
                        buynum = Number(cmd[3]);
                        replier.reply(Game.buy(cmd[2],buynum))
                    }else{
                        replier.reply(room,ath.isint(cmd[3]),true)
                    }
                }else{
                    replier.reply(room,Game.existence(cmd[2]),true)
                }
            }else{
                replier.reply(room,Game.IsJoined(),true)
            }
        }else if(cmd[1]=="지갑"||cmd[1]=="ㅈㄱ"||cmd[1]=="돈"){
            replier.reply(room,sender+"님이 보유하고 있는 코인은 "+Game.MyMoney()+"입니다.")
            /**
             * 개발자 본인이 아닌 경우 정보, 도움말, 명령어, 명령어에 있는 소스 출처를 건드려서는 안됩니다. 
             * 건드리거나 개발자 본인을 사칭하는 경우 불이익이나 법적 처벌을 받을수 있습니다.
             */
        }else if(cmd[1]=="정보"){
            replier.reply("해당 게임에 대한 정보입니다!"+COMPRESS+"\n\n제작자: DevRussia&BetaMax\n\n해당 게임은 다음 링크에서 다운받을수 있습니다.\nhttps://github.com/DevRussia/KakaoTalk-stockgame")
        }else if(cmd[1]=="도움말"||cmd[1]=="명령어"){
            replier.reply(room,"도움말입니다"+COMPRESS+"\n\n"+prefix+"주식 가입 - 주식에 가입합니다\n"+prefix+"주식 매수 <회사명> <구매할 주 수>- 해당 회사명의 주식을 구매할 주 수만큼 구매합니다\n\n<>(꺽쇠)는 진짜 입력하는것이 아닙니다. 다음 예와 같이 입력해주세요! (예: "+prefix+"주식 매수 betamax 1)")
            replier.reply("Made BY DevRussia & betamax")
        }else{
            replier.reply(prefix+"주식 도움말 혹은 "+prefix+"주식 명령어를 입력해보세요.")
        }
    }
}
