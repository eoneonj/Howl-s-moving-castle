var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var background_sound = new Audio('bgm.mp3');
var jump_sound = new Audio('j.mp3');
var end_sound = new Audio('you died.mp3');
var fin = new Audio('fin.mp3');
var level_up = new Audio('level up.mp3')

var img_background = new Image();
img_background.src = 'bg_1.png';
var back = {
 x:0,
 y:0,
 width:canvas.width/2,
 height:canvas.height/1.5,

 draw(){
    ctx.drawImage(img_background, this.x,this.y,this.width,this.height);}
 }

 var img_background1 = new Image();
img_background1.src = 'bg_howl.png';
var back1 = {
 x:0,
 y:0,
 width:canvas.width/2,
 height:canvas.height/1.5,

 draw(){
    ctx.drawImage(img_background1, this.x,this.y,this.width,this.height);}

    
 }

 var img_background2 = new Image();
img_background2.src = 'finish.png';
var back2 = {
 x:0,
 y:0,
 width:canvas.width/2,
 height:canvas.height/1.5,

 draw(){
    ctx.drawImage(img_background2, this.x,this.y,this.width,this.height);}
}

var img_user = [];
var img_user1 = new Image();
img_user1.src = 'howl0.png';
var img_user2 = new Image();
img_user2.src = 'howl1.png';
var img_user3 = new Image();
img_user3.src = 'howl2.png';
var img_user4 = new Image();
img_user4.src = 'howl3.png';
var img_user5 = new Image();
img_user5.src = 'howl4.png';
var img_user6 = new Image();
img_user6.src = 'howl5.png';
var img_user7 = new Image();
img_user7.src = 'howl6.png';
var img_user8 = new Image();
img_user8.src = 'howl7.png';
var img_user9 = new Image();
img_user9.src = 'howl8.png';
var img_user10 = new Image();
img_user10.src ='howl9.png';

img_user = [img_user1, img_user2, img_user3, img_user4, img_user5, img_user6, img_user7, img_user8, img_user9, img_user10]; 

var user = {
    x:10,
    y:250,
    width:50,
    height:70,
    img_index:0,

    draw(a){
        if(a%7==0){//5프레임 마다 (0,1,2,3,4 이후 1씩 img_index 증가)
            this.img_index = (this.img_index+1)%10
        }
        if(user.y<250){
            ctx.drawImage(img_user[2],this.x,this.y,this.width,this.height);
        }
        else{
            ctx.drawImage(img_user[this.img_index],this.x,this.y,this.width,this.height);
        }
    }
    

    }

user.draw(0);

var img_bomb = new Image();
img_bomb.src = 'sc.png';

class Bomb{
    constructor(){
        this.x =700;
        this.y = 260;
        this.width = 60;
        this.height = 70;
    }

    draw(){
        //ctx.fillStyle = 'white';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img_bomb, this.x,this.y,this.width,this.height);

    }
}
//var bomb = new Bomb();
//bomb.draw();
var timer = 0; //프레임 측정
var bombs = []; //장애물 리스트
var jumpingTimer = 0; //60프레임을 셈
var animation;

function frameSecond(){
    //1초마다 60번 코드 실행
    animation = requestAnimationFrame(frameSecond);
    timer++;
    
    //프레임이 돌 때마다 프레임에 있는 요소들 clear
    ctx.clearRect(0,0,canvas.width, canvas.height);

    back.draw();     // 배경

    gameScore();    // 점수

    background_sound.play();  //배경음악

    if(timer>0){
    if(timer % 150 == 0){ //1초 마다
        var bomb = new Bomb();
        bombs.push(bomb);
    }

    bombs.forEach((b, i, o)=>{
        if(b.x < 0){
            o.splice(i,1);
        }
        b.x = b.x-4;

        bomb_gameScore(b.x);
        collision(user,b);
        b.draw();

    })

    if(jumping == true){
        jump_sound.play();
        user.y= user.y-4;
        jumpingTimer++;
        
    }

    // 점프 0.5초후
    if(jumpingTimer > 30){
        jumping = false;
        jumpingTimer = 0;
    }

    //jumping이 false이고 user.y가 250 미만이면 하강
    if(jumping == false && user.y < 250){
        user.y = user.y+4;
    }

}

    if(timer>1500){
        ctx.clearRect(0,0,canvas.width, canvas.height);

        back1.draw();
        
        if(timer % 150 == 0){ //1초 마다
            var bomb = new Bomb();
            bombs.push(bomb);
        }
    
        bombs.forEach((b, i, o)=>{
            if(b.x < 0){
                o.splice(i,1);
            }
            b.x = b.x-4;
    
            bomb_gameScore(b.x);
            collision(user,b);
            b.draw();
    
        })
        if(jumping == true){
            jump_sound.play();
            user.y= user.y-5;
            jumpingTimer++;
            
        }
    
        // 점프 0.5초후
        if(jumpingTimer > 50){
            jumping = false;
            jumpingTimer = 0;
        }
    
        //jumping이 false이고 user.y가 250 미만이면 하강
        if(jumping == false && user.y < 250){
            user.y = user.y+5;
        }
        gameScore();
    }

    if(timer>3000){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        fin.play();
        background_sound.pause();
        back2.draw();
        ctx.fillStyle = 'skyblue';
        ctx.font = '60px 맑은 고딕';
        ctx.fillText('CLEAR!!',canvas.width/3.5, canvas.height/3);
    }

    ctx.fillStyle = 'white';
    ctx.font = '30px 맑은 고딕';
    ctx.fillText("Howl's moving castle",canvas.width/6, canvas.height/7);
   
user.draw(timer);
    
}

frameSecond();

//충돌 확인 코드
function collision(user,bomb){
    var x_diff = bomb.x - (user.x+user.width);
    var y_diff = bomb.y - (user.y+user.height);
    if(x_diff < 0 && y_diff<0){

        //프레임 돌때마다 프레임에 있는 요소들 clear
        //ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);

        background_sound.pause();
        end_sound.play();
        ctx.fillStyle = 'red';
        ctx.font = '50px 맑은 고딕';
        ctx.fillText('YOU DIED',canvas.width/6, canvas.height/3);
        

    }
}

var jumping = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
}) 

function gameScore(score){
    ctx.font = '20px 맑은 고딕';
    ctx.fillStyle = 'white';
    ctx.fillText('Score : '+ Math.round(timer/100), 10,30);
}

var score = 0;
function bomb_gameScore(x){
    ctx.font = '0px 맑은 고딕';
    ctx.fillStyle = 'gray';

    if(x==0){
        score ++;
    }
    ctx.fillText('Score : '+ score, 10,60);
}
