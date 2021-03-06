var bg1 = new Image;
bg1.src = "images/background1.jpg"
var bg2 = new Image;
bg2.src = "images/background2.jpg"
var bg3 = new Image;
bg3.src = "images/background3.jpg"
var bg4 = new Image;
bg4.src = "images/background4.jpg"
var bg5 = new Image;
bg5.src = "images/background5.jpg"
var bg6 = new Image;
bg6.src = "images/background6.jpg"
var explosion = new Image;
explosion.src="images/explo.gif";
var bgs = [bg1, bg2, bg3, bg4, bg5, bg6]
var gameStatus=0;
var createUnit=0;
var oracleTrue=false;
var exploFrames="Hola";
var stopGame=0;
var winners = [{name: "AAA", score: 0, health: 0}, {name: "AAA", score: 0, health: 0},{name: "AAA", score: 0, health: 0},{name: "AAA", score: 0, health: 0},{name: "AAA", score: 0, health: 0}]
var notEnough = new Audio('sounds/notEnoughResources.mp3');
var oracleAudio = new Audio('sounds/oracleShield.mp3');
var tempestAudio = new Audio("sounds/tempest.wav");
var replicantAudio = new Audio("sounds/replicant.wav");
var theme = document.getElementById("music");
var leviathanAudio = new Audio("sounds/warning.wav");
theme.volume = 0.5;
var difficulty =1;
var boss = false;
var spriteFrames=0;
var score = 0;
if (localStorage.getItem("FirstName")===null){
    
    localStorage.setItem("FirstName", winners[0].name);
    localStorage.setItem("FirstScore", winners[0].score);
    localStorage.setItem("FirstHealth", winners[0].health);

    localStorage.setItem("SecondName", winners[1].name);
    localStorage.setItem("SecondScore", winners[1].score);
    localStorage.setItem("SecondHealth", winners[1].health);

    localStorage.setItem("ThirdName", winners[2].name);
    localStorage.setItem("ThirdScore", winners[2].score);
    localStorage.setItem("ThirdHealth", winners[2].health);

    localStorage.setItem("FourthName", winners[3].name);
    localStorage.setItem("FourthScore", winners[3].score);
    localStorage.setItem("FourthHealth", winners[3].health);

    localStorage.setItem("FifthName", winners[4].name);
    localStorage.setItem("FifthScore", winners[4].score);
    localStorage.setItem("FifthHealth", winners[4].health);

}

winners = [{name: localStorage.getItem("FirstName"), score: localStorage.getItem("FirstScore"), health: localStorage.getItem("FirstHealth")}, {name: localStorage.getItem("SecondName"), score: localStorage.getItem("SecondScore"), health: localStorage.getItem("SecondHealth")},{name: localStorage.getItem("ThirdName"), score: localStorage.getItem("ThirdScore"), health: localStorage.getItem("ThirdHealth")}, {name: localStorage.getItem("FourthName"), score: localStorage.getItem("FourthScore"), health: localStorage.getItem("FourthHealth")},{name: localStorage.getItem("FifthName"), score: localStorage.getItem("FifthScore"), health: localStorage.getItem("FifthHealth")}]

function startGame(){
    resources = 500;
    myBattleArea.start();
    myBattleArea.drawBoard();
    mothership = new Mothership(-myBattleArea.canvas.height/2+50, 0, 500);
    mothership.draw();
    player = new Player(300, 300, 100);
    player.draw();
};

function updateBattleArea(){
    //Update frames, clear and draw everything again
    myBattleArea.frames++;
    myBattleArea.ctx.clearRect(0, 0, myBattleArea.canvas.width,myBattleArea.canvas.height);
    myBattleArea.drawBoard();
    mothership.draw();
    player.draw();
    player.beamsDraw();
    exploFrames++;
    if (myBattleArea.frames%3===0){
        spriteFrames++;
    }
    if(spriteFrames===20){
        spriteFrames=0;
    }
    if (myBattleArea.frames%1000===0 && boss===false){
        difficulty++;
    }
    //Crear Suicidas
    if (myBattleArea.frames%50===0){
        for (var c=0; c<difficulty; c++){
            myBattleArea.enemies.push(new Suicide(myBattleArea.canvas.width, 20+(Math.random()*(myBattleArea.canvas.height-20)),10));
        }
        
    }
    //Crear Corruptores
    if (myBattleArea.frames%400===0){
        for (var c=0; c<difficulty; c++){
        myBattleArea.enemies.push(new Corruptor(myBattleArea.canvas.width, 100+(Math.random()*(myBattleArea.canvas.height-200)),100));
        }
    }
    //Crear Broodlords
    if (myBattleArea.frames%500===0){
        for (var c=0; c<difficulty; c++){
            myBattleArea.enemies.push(new Broodlord(myBattleArea.canvas.width, 100+(Math.random()*(myBattleArea.canvas.height-200)),100));
        }
    }

    if (myBattleArea.frames%2000===0){
        myBattleArea.enemies.push(new Leviathan(Math.random()*myBattleArea.canvas.width*1/6+myBattleArea.canvas.width/4, -myBattleArea.canvas.height, 100000));
        leviathanAudio.play();
    }

    //Mover los enemigos
    for (var i = 0; i<myBattleArea.enemies.length;i++){
        if (myBattleArea.enemies[i].paralyze===0 || myBattleArea.enemies[i].type===4){
            //Los Corruptors se plantan
            if (myBattleArea.enemies[i].type>1 && myBattleArea.enemies[i].type<4 && myBattleArea.enemies[i].x<(myBattleArea.canvas.width-200)){
                //Nada!
            } else if (myBattleArea.enemies[i].type===4){
                myBattleArea.enemies[i].y+=3;
            } else {
                myBattleArea.enemies[i].x-=2;
            //Cada 10 frames se mueven en el eje Y
                if (myBattleArea.frames%10===0){
                    randomWalk = Math.floor(Math.random()*2);
                    if (randomWalk===0){
                        if (myBattleArea.enemies[i].y<(myBattleArea.canvas.height-30)){
                            myBattleArea.enemies[i].y+=10;
                        }
                    } else {
                        if (myBattleArea.enemies[i].y>30){
                            myBattleArea.enemies[i].y-=10;
                        }
                    }
                }
            }
            //Disparan los corruptores si tienen energia
            if (myBattleArea.enemies[i].type===2){
                myBattleArea.enemies[i].shoot();
            } else if (myBattleArea.enemies[i].type===3){
                myBattleArea.enemies[i].create();
            }
        }
        myBattleArea.enemies[i].draw();
    };
    //Dibujar las unidades, su escudo y sus ataques
    for (var i = 0; i<myBattleArea.units.length;i++){
        myBattleArea.units[i].draw();
        if (myBattleArea.units[i].type==="R"){
            myBattleArea.units[i].drawShield();
        } else  if (myBattleArea.units[i].type==="T"){
            myBattleArea.units[i].shoot();
            myBattleArea.units[i].ballsDraw();
            myBattleArea.units[i].balls.forEach(function(ball, indexB){
                myBattleArea.enemies.forEach(function(enemy, indexE){
                    if (ball.crashWith(enemy)){
                        myBattleArea.enemies[indexE].health-=ball.damage;
                        if (myBattleArea.enemies[indexE].health<=0){
                            myBattleArea.enemies.splice(indexE,1);
                            resources+=enemy.resources;
                        }
                    }
                })
            })
        } else {
            myBattleArea.units[i].drawShield();
        }
    };
    //Dibujar los rayos del player
    player.beams.forEach(function(beam, indexB){
        myBattleArea.enemies.forEach(function(enemy, indexE){
            if (beam.crashWith(enemy)){
                myBattleArea.enemies[indexE].health-=beam.damage;
                if (myBattleArea.enemies[indexE].health<=0){
                    myBattleArea.enemies.splice(indexE,1);
                    resources+=enemy.resources;
                }
                player.beams.splice(indexB,1);
            }
        })
    })
    //Dibujar la muerte de los suicidas 
    myBattleArea.enemies.forEach(function(enemy, index){
        if (enemy.crashWith(player) && enemy.type===1){
            exploX =  enemy.x;
            exploY = enemy.y
            exploFrames = 1
            myBattleArea.ctx.drawImage(explosion, exploX, exploY, 25, 25);
            player.health-=enemy.damage;
            if (player.health<=0){
                // Game Ends
                myBattleArea.stop();
                return;
            }
            myBattleArea.enemies.splice(index,1);
        } else if (enemy.crashWith(player) && enemy.type===4){
            player.health-=enemy.damage;
            if (player.health<=0){
                // Game Ends
                myBattleArea.stop();
                return;
            }
        }
        if (enemy.crashWith(mothership) && enemy.type===1){
            exploX =  enemy.x;
            exploY = enemy.y
            exploFrames = 1
            myBattleArea.ctx.drawImage(explosion, exploX, exploY, 25, 25);
            mothership.health-=enemy.damage;
            myBattleArea.enemies.splice(index,1);
            if (mothership.health<=0){
                // Game Ends
                myBattleArea.stop();
                return;
            }
        } 
        myBattleArea.units.forEach(function(unit, indexU){
            if (unit.type==="R" && unit.energy>0){
                shield={
                    x: unit.x-unit.width/2,
                    y: unit.y-unit.height/2,
                    width: unit.width*2,
                    height: unit.height*2
                }
                if (enemy.crashWith(shield) && enemy.type===1){
                    exploX =  enemy.x;
                    exploY = enemy.y
                    exploFrames = 1
                    myBattleArea.ctx.drawImage(explosion, exploX, exploY, 25, 25);
                    myBattleArea.units[indexU].energy-=enemy.damage;
                    myBattleArea.enemies.splice(index,1);
                }
            } else if (unit.type==="O" && unit.energy>0){
                shield={
                    x: unit.x-unit.width*1.5,
                    y: unit.y-unit.height*1.5,
                    width: unit.width*4,
                    height: unit.height*4
                }
                if (enemy.crashWith(shield)){
                    enemy.paralyze=1;
                } 
            
            } else if (unit.type==="O"){
                enemy.paralyze=0;
            }
            if (enemy.crashWith(unit) && enemy.type===1){
                exploX =  enemy.x;
                exploY = enemy.y
                exploFrames = 1
                myBattleArea.ctx.drawImage(explosion, exploX, exploY, 25, 25);
                myBattleArea.units[indexU].health-=enemy.damage;
                if (myBattleArea.units[indexU].health<=0){
                    if (unit.type="O"){
                        oracleTrue=false;
                    }
                    myBattleArea.units.splice(indexU,1);
                }
                myBattleArea.enemies.splice(index,1);
            } else if (enemy.crashWith(unit) && enemy.type===4){
                myBattleArea.units[indexU].health-=enemy.damage;
                if (myBattleArea.units[indexU].health<=0){
                    if (unit.type="O"){
                        oracleTrue=false;
                    }
                    myBattleArea.units.splice(indexU,1);
                }
            }
        })
    })
    myBattleArea.balls.forEach(function(ball, indexC){
        ball.draw();
        myBattleArea.units.forEach(function(enemy, indexU){
            if (ball.crashWith(enemy)){
                myBattleArea.units[indexU].health-=ball.damage;
                myBattleArea.balls.splice(indexC,1);
                if (myBattleArea.units[indexU].health<=0){
                    myBattleArea.units.splice(indexU,1);
                }
            }
            if (enemy.type==="R" && enemy.energy>0){
                shield={
                    x: enemy.x-enemy.width/2,
                    y: enemy.y-enemy.height/2,
                    width: enemy.width*2,
                    height: enemy.height*2
                }
                if (ball.crashWith(shield)){
                    myBattleArea.units[indexU].energy-=ball.damage;
                    myBattleArea.balls.splice(indexC,1);
                }
            }
        })
        if (ball.crashWith(player)){
            player.health-=ball.damage;
            myBattleArea.balls.splice(indexC,1);
                if (player.health<=0){
                    //Game ends
                    myBattleArea.stop();
                    return;
                }
        }
        if (ball.crashWith(mothership)){
            mothership.health-=ball.damage;
            myBattleArea.balls.splice(indexC,1);
                if (mothership.health<=0){
                    //Game ends
                    myBattleArea.stop();
                    return;
                }
        }
        
    })
    if (exploFrames>0){
        if (exploFrames>11){
          exploFrames="Hola";
        }
        myBattleArea.ctx.drawImage(explosion, exploX, exploY, 25, 25);
      }

    myBattleArea.score();
    if (stopGame===1){
        myBattleArea.ctx.clearRect(0,0,myBattleArea.canvas.width, myBattleArea.canvas.height);
        myBattleArea.ctx.fillStyle="black";
        myBattleArea.ctx.fillRect(0,0, myBattleArea.canvas.width, myBattleArea.canvas.height);
        myBattleArea.ctx.font="40px serif";
        myBattleArea.ctx.fillStyle="white"
        gameStatus=0;
        counterHigh=0
        highScore=false;
        if (mothership.health<0){
            mothership.health=0;
        }
        if (Math.floor(myBattleArea.frames/100)>=winners[winners.length-1].score){
            for (var g=0; g<winners.length ;g++){
                if (Math.floor(myBattleArea.frames/100)>winners[g].score){
                    highScore=true;
                    break;
                } else if (Math.floor(myBattleArea.frames/100)==winners[g].score){
                    if (mothership.health>=winners[g].health){
                        highScore=true;
                        break;
                    }
                }
                counterHigh++;
            }
            if (highScore){
                myBattleArea.ctx.fillText("HIGH SCORE!", 460, 50);
                myBattleArea.ctx.fillText("Final Score: "+Math.floor(myBattleArea.frames/100)+" Health: "+mothership.health, 450, 150)
                myBattleArea.ctx.fillText("TYPE NAME", 460, 250);
                var letterCounter=0;
                winName="";
                document.onkeydown=function(e){
                    if (letterCounter<3 && e.keyCode>=65 && e.keyCode<=90){
                        myBattleArea.ctx.fillText(e.key.toUpperCase(), 480+letterCounter*30, 300);
                        winName+=e.key.toUpperCase();
                        letterCounter++;
                        if (letterCounter===3){
                            updateHigh();
                        }
                    }
                } 
            } else {
                myBattleArea.ctx.fillText("TOP DEFENDERS", 450, 50);
                myBattleArea.ctx.font="30px serif";
                myBattleArea.ctx.fillStyle="green"
                myBattleArea.ctx.fillText("Final Score: "+Math.floor(myBattleArea.frames/100)+" Health: "+mothership.health, 450, 150)
                myBattleArea.ctx.fillStyle="white"
                for (var w=0; w<winners.length; w++){
                    myBattleArea.ctx.fillText((w+1)+". "+winners[w].name + " Score: "+winners[w].score+" Health: "+winners[w].health, 390, 200+50*w)
                }
                myBattleArea.ctx.fillText("Press Enter to Play Again", 410, 450)
                document.onkeydown=function(e){
                    if (e.keyCode===13){
                        location.reload();
                    }
                } 
            }
        } else{
            myBattleArea.ctx.fillText("TOP DEFENDERS", 450, 50);
            myBattleArea.ctx.font="30px serif";
            myBattleArea.ctx.fillStyle="green"
            myBattleArea.ctx.fillText("Final Score: "+Math.floor(myBattleArea.frames/100)+" Health: "+mothership.health, 450, 150)
            myBattleArea.ctx.fillStyle="white"
            for (var w=0; w<winners.length; w++){
                myBattleArea.ctx.fillText((w+1)+". "+winners[w].name + " Score: "+winners[w].score+" Health: "+winners[w].health, 390, 200+50*w)
            }
            myBattleArea.ctx.fillText("Press Enter to Play Again", 410, 450)
            document.onkeydown=function(e){
                if (e.keyCode===13){
                    location.reload();
                }
            }
        }
    }
}
    
function updateHigh(){
    myBattleArea.ctx.fillStyle="black";
    myBattleArea.ctx.fillRect(0,0, myBattleArea.canvas.width, myBattleArea.canvas.height);
    myBattleArea.ctx.fillStyle="white";
    myBattleArea.ctx.fillText("TOP DEFENDERS", 450, 50);
    winners.pop();
    winners.splice(counterHigh, 0, {name: winName, score: Math.floor(myBattleArea.frames/100), health: mothership.health});
    for (var w=0; w<winners.length; w++){  
        console.log(w, counterHigh)
        if (w==counterHigh){
            myBattleArea.ctx.fillStyle="red";
            myBattleArea.ctx.fillText((w+1)+". "+winners[w].name + " Score: "+winners[w].score+" Health: "+winners[w].health, 390, 200+50*w)
        }   else {
            myBattleArea.ctx.fillStyle="white";
            myBattleArea.ctx.fillText((w+1)+". "+winners[w].name + " Score: "+winners[w].score+" Health: "+winners[w].health, 390, 200+50*w)
        }   
    }

    localStorage.setItem("FirstName", winners[0].name);
    localStorage.setItem("FirstScore", winners[0].score);
    localStorage.setItem("FirstHealth", winners[0].health);

    localStorage.setItem("SecondName", winners[1].name);
    localStorage.setItem("SecondScore", winners[1].score);
    localStorage.setItem("SecondHealth", winners[1].health);

    localStorage.setItem("ThirdName", winners[2].name);
    localStorage.setItem("ThirdScore", winners[2].score);
    localStorage.setItem("ThirdHealth", winners[2].health);

    localStorage.setItem("FourthName", winners[3].name);
    localStorage.setItem("FourthScore", winners[3].score);
    localStorage.setItem("FourthHealth", winners[3].health);

    localStorage.setItem("FifthName", winners[4].name);
    localStorage.setItem("FifthScore", winners[4].score);
    localStorage.setItem("FifthHealth", winners[4].health);
    myBattleArea.ctx.fillStyle="white";
    myBattleArea.ctx.fillText("Press Enter to Play Again", 410, 450)
    document.onkeydown=function(e){
        if (e.keyCode===13){

            location.reload();
        }
    } 
}
document.onkeydown=function(e){
    switch (e.keyCode){
        case 37:
        case 65:
        player.moveLeft();
        break;
        case 38:
        case 87:
        player.moveUp();
        break;
        case 39:
        case 68:
        player.moveRight();
        break;
        case 40:
        case 83:
        player.moveDown();
        break;
        case 32:
        player.shoot();
        break;
    }
} 

document.getElementById("replicant").onclick = function(){
    if (createUnit===0){
        createUnit=1;
        unitCreate="replicant";
        myBattleArea.canvas.classList.add("replicant");
    }
};

document.getElementById("tempest").onclick = function(){
    if (createUnit===0){
        createUnit=1;
        unitCreate="tempest";
        myBattleArea.canvas.classList.add("tempest");
    }
};

document.getElementById("oracle").onclick = function(){
    if (createUnit===0){
        createUnit=1;
        unitCreate="oracle";
        myBattleArea.canvas.classList.add("oracle");
    }
};

myBattleArea.canvas.addEventListener('click', function(e) {
    if (createUnit===1){
        switch(unitCreate){
            case "replicant":
            if (resources>=100){
                replicantAudio.play();
                resources-=100;
                myBattleArea.units.push(new Replicant(e.pageX-myBattleArea.canvas.offsetLeft-37.5, e.pageY-myBattleArea.canvas.offsetTop-37.5,100))
            } else{
                notEnough.play();
            }
            createUnit=0;
            myBattleArea.canvas.classList.remove("replicant");
            break;
            case "tempest":
            if (resources>=200){
                tempestAudio.play();
                resources-=200;
                myBattleArea.units.push(new Tempest(e.pageX-myBattleArea.canvas.offsetLeft-50, e.pageY-myBattleArea.canvas.offsetTop-50,100))
            }else{
                notEnough.play();
            };
            myBattleArea.canvas.classList.remove("tempest");
            createUnit=0;
            break;
            case "oracle":
            if (resources>=500 && oracleTrue===false){
                oracleAudio.play();
                oracleTrue=true;
                resources-=500;
                myBattleArea.units.push(new Oracle(e.pageX-myBattleArea.canvas.offsetLeft-37.5, e.pageY-myBattleArea.canvas.offsetTop-37.5,100))
            }else{
                notEnough.play();
            };
            createUnit=0;
            myBattleArea.canvas.classList.remove("oracle");
            break;
        }
    }
})

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);