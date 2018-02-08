var spaceBar = new Image;
spaceBar.src="images/spaceBar.png"
window.onload = function() {
    
    var demoCanvas = document.getElementById("demoCanvas");
    var demoCtx = demoCanvas.getContext("2d");
    var demoframes = 0;
    var demoInterval = setInterval(updateDemo, 20);

    function updateDemo(){
        demoframes++;
        demoCtx.clearRect(0, 0, 1200, 375);
        if (demoframes<200){
            demoCtx.font = "40px serif";
            demoCtx.fillStyle = "white";
            demoCtx.fillText("Defend the Mothership from the Invaders!", 275, 50);
            demoCtx.drawImage(mothershipSprite, 100, 100, 200, 200);
            demoCtx.drawImage(kamikaze, 1200-demoframes*5, 100, 25, 25);
            demoCtx.drawImage(kamikaze, 1200-demoframes*5, 150, 25, 25);
            demoCtx.drawImage(kamikaze, 1200-demoframes*5, 200, 25, 25);
            demoCtx.drawImage(kamikaze, 1200-demoframes*5, 250, 25, 25);
            demoCtx.drawImage(kamikaze, 1200-demoframes*5, 300, 25, 25);
        }
        if (demoframes>=200 && demoframes<350){
            demoCtx.font = "40px serif";
            demoCtx.fillStyle = "white";
            demoCtx.fillText("Shoot them with your ship by pressing", 275, 50);
            demoCtx.drawImage(hero, 100, 100, 100, 100);
            if (demoframes<300){
                demoCtx.drawImage(beam, 200+demoframes*5-1000, 137.5, 25, 25);
            }
            demoCtx.drawImage(kamikaze, 1200-demoframes*5+1000, 100-12.5, 25, 25);
            if (demoframes<300){
                demoCtx.drawImage(kamikaze, 1200-demoframes*5+1000, 137.5, 25, 25);
            }
            demoCtx.drawImage(kamikaze, 1200-demoframes*5+1000, 200-12.5, 25, 25);
            demoCtx.drawImage(kamikaze, 1200-demoframes*5+1000, 250-12.5, 25, 25);
            demoCtx.drawImage(kamikaze, 1200-demoframes*5+1000, 300-12.5, 25, 25);
            demoCtx.drawImage(spaceBar, 900, -15, 100, 100);

        }
        if (demoframes>=350 && demoframes < 500){
            demoCtx.font = "40px serif";
            demoCtx.fillStyle = "white";
            demoCtx.fillText("Use your resources to create shields!", 275, 50);
            demoCtx.drawImage(replicant, 150, 150, 100, 100);
            demoCtx.drawImage(energyShield, 100, 100, 200, 200);
            if (demoframes<445){
                demoCtx.drawImage(kamikaze, 1200-demoframes*10+3500, 137.5, 25, 25);
            }
        }
        if (demoframes>=500 && demoframes <650){
            demoCtx.font = "40px serif";
            demoCtx.fillStyle = "white";
            demoCtx.fillText("Or powerful offensive units!", 275, 50);
            demoCtx.drawImage(tempest, 50, 100, 200, 200);
            demoCtx.drawImage(energyBall, 250+demoframes*10-5000, 100, 200, 200);
        }
        if (demoframes>=650 && demoframes <800){
            demoCtx.font = "40px serif";
            demoCtx.fillStyle = "white";
            demoCtx.fillText("And even to paralyze your enemies!", 275, 50);
            demoCtx.drawImage(oracle, 500, 150, 100, 100);
            demoCtx.drawImage(paralyzeField, 400, 50, 300, 300);
            if (demoframes<710){
                demoCtx.drawImage(kamikaze, 1200-demoframes*10+6500, 137.5, 25, 25);
                demoCtx.drawImage(kamikaze, 1200-demoframes*10+6500, 87.5, 25, 25);
                demoCtx.drawImage(kamikaze, 1200-demoframes*10+6500, 187.5, 25, 25);
            } else {
                demoCtx.drawImage(kamikaze, 600, 137.5, 25, 25);
                demoCtx.drawImage(kamikaze, 600, 87.5, 25, 25);
                demoCtx.drawImage(kamikaze, 600, 187.5, 25, 25);
            }
        }
        if (demoframes>=800 && demoframes <950){
            demoCtx.font = "40px serif";
            demoCtx.fillStyle = "white";
            demoCtx.fillText("Destroy the more powerful enemies before they use their abilities!", 50, 50);
            if (demoframes<860){
                demoCtx.drawImage(broodlordSprite, 1200-demoframes*5+4000, 100, 100, 100);
                demoCtx.drawImage(corruptorSprite, 1200-demoframes*5+4000, 250, 100, 100);
            } else {

                demoCtx.drawImage(kamikaze, 900-demoframes*10+8600, 137.5, 25, 25);
                demoCtx.drawImage(kamikaze, 900-demoframes*10+8600, 87.5, 25, 25);
                demoCtx.drawImage(kamikaze, 900-demoframes*10+8600, 187.5, 25, 25);
                demoCtx.drawImage(corruptBallSprite, 900-demoframes*10+8600, 250, 100, 100);
                demoCtx.drawImage(broodlordSprite, 900, 100, 100, 100);
                demoCtx.drawImage(corruptorSprite, 900, 250, 100, 100);
            }
        }
        if (demoframes>950){
            demoframes=0;
        }
    }   

    document.getElementById("start-button").onclick = function() {
        if (gameStatus===0){
        gameStatus=1;
        demoCanvas.parentNode.removeChild(demoCanvas);
        startGame();
      }
    }
};

