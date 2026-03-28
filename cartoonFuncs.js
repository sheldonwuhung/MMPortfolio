document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    canvas.width = 1000;
    canvas.height = 600;
    canvas.style.border = "2px solid black";

    const ctx = canvas.getContext("2d");
        console.log("canvas", canvas, "ctx", ctx);

    main();

    function main() {
        drawBackground();
        drawGround();
        drawMoon();
        drawFences();
        drawHouse();
        drawText();
    }

    //---------BACKGROUND---------//

    function drawBackground() {
        ctx.fillStyle = "#4d586e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


    //---------GROUND---------//


    function drawGround() {
        ctx.fillStyle = "#563f2b";
        ctx.fillRect(0, 3*canvas.height/4, canvas.width, canvas.height/4);
    }

    //---------MOON---------//

    function drawMoon() {
        ctx.save();
        ctx.translate(75, 75);
        drawMoonBase();
        drawMoonCrators();
        ctx.restore();
    }

    function drawMoonBase() {
        ctx.beginPath();
        ctx.fillStyle = "#d9d9d9";
        ctx.arc(0, 0, 50, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    function drawMoonCrators() {
        const max = 35;
        const min = -35;
        ctx.fillStyle = "#8a8686";
        for (let i = 1; i <= 50; i++) {
            const ranX = Math.random() * (max - min) + min;
            const ranY = Math.random() * (max - min) + min;
            const ranSize = Math.abs(Math.random() * (max - min) + min) / 10;
            ctx.beginPath();
            ctx.arc(ranX, ranY, ranSize, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }

    //---------HOUSE---------//

    function drawHouse() {
        ctx.save();
        ctx.translate(2*canvas.width/4, 2*canvas.height/4)
        drawHouseBase();
        drawWindow(canvas.width/3/2, canvas.height/4/2);
        drawWindow(canvas.width/3, canvas.height/4/2);
        drawDoor();
        ctx.restore();
    }

    function drawHouseBase() {
        ctx.fillStyle = "#bca679";
        ctx.fillRect(0, 0, canvas.width/3, canvas.height/4);

        ctx.fillStyle = "#eed194";
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(canvas.width/3/2, -canvas.height/4/3)
        ctx.lineTo(canvas.width/3, 0)
        ctx.closePath();
        ctx.fill();
    }

    function drawWindow(x, y) {
        ctx.save()
        const l = 50;
        const h = 65;
        ctx.translate(x, y)

        ctx.fillRect(-canvas.width/3/4 -l/2, -h/2, l, h);
        ctx.fillStyle = "#a49473";
        ctx.fillRect(-canvas.width/3/4, -h/2 - 1, 1, h);
        ctx.fillRect(-canvas.width/3/4 -l/2, -1, l, 1);
        ctx.restore();
    }

    function drawDoor() {
        const l = 50;
        const h = canvas.height/4/2;
        
        ctx.fillRect(canvas.width/3/2 -l/2, h, l, h);
        ctx.fillStyle = "#a49473";
        ctx.arc(canvas.width/3/2 +l/4, h*1.5-1, 2, 0, 2*Math.PI);
        ctx.fill();
    }

    //---------FENCES---------//

    function drawFences() {
        ctx.fillStyle = "#563f2b";

        const l = 105;
        
         for (let i=0; i<10; i++) {
            drawFence(l, i*l-l/2, canvas.height*5/8);
        }
    }

    function drawFence(l, x, y) {

        ctx.save()
        ctx.translate(x, y)
        
        const h = 10;
        ctx.fillStyle = "#f0a666";
        ctx.fillRect(0, canvas.height/16 - h/2, l, h);
        ctx.fillRect(0, canvas.height/16 + h*3/2, l, h);
        ctx.fillRect(0, canvas.height/16 - h*5/2, l, h);
        ctx.fillStyle = "#b87943";
        ctx.fillRect(0, 0, h, canvas.height*1/8);
        ctx.fillRect(l, 0, h, canvas.height*1/8);
        ctx.restore();
    }

    //---------TEXT---------//

    function drawText() {
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px Arial"
        ctx.fillText("A lone house upon a barren field within the empty night...", canvas.width*3/16, canvas.height*7/8);
    }

})
