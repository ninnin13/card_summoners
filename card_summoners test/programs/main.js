var blocks = [
[4,1,0,6],
[0,0,3,0],
[0,1,0,5],
[2,0,4,1]
]
var keep = 0;
var next = false;
var kx = 0;
var ky = 0;
var nx = 0;
var ny = 0;
var point = 0;
var times = 20;
var two = 3;
document.getElementById("text").style.visibility ="hidden";
function game_starter(){
    document.getElementById("starter").style.visibility ="hidden";
    document.getElementById("game").style.visibility ="visible";
    document.getElementById("point").style.visibility ="visible";
    setTimeout(fin,60000);
}
function fin(){
    document.getElementById("game").style.visibility ="hidden";
    document.getElementById("text2").style.visibility ="visible";
}
function On_clicked_block(x,y){
    if(times > 0){
    document.getElementById("text").style.visibility ="hidden";
    nx = x -1;
    ny = y -1;
    if(next){
        if(move(kx,ky,nx,ny) == false){
            blocks[kx][ky] = keep;
            //console.log(blocks[kx][ky]);
            document.getElementById(get_block_number(kx+1,ky+1)).src = "images/block" + String(keep) + ".png";
            document.getElementById("text").style.visibility ="visible";
        }else{
            times--;
            document.getElementById("times").innerText = "残り回数:" + String(times);
            if(times == 0){
                document.getElementById("game").style.visibility ="hidden";
                document.getElementById("text2").style.visibility ="visible";
            }
        };
        next = false;
    }else{
        if(blocks[nx][ny] != 0 && blocks[nx][ny] < 4){
            keep = blocks[nx][ny];
            blocks[nx][ny] = 7;
            document.getElementById(get_block_number(x,y)).src = "images/block7.png";
            kx = nx;
            ky = ny;
            next = true;
        }
    }
    }
}
function get_block_number(x,y){
    return String(x) + "-" + String(y);
}
function get_point(num){
    if(num == 1){
        return 1;
    }
    if(num == 2){
        return point;
    }
    if(num == 3){
        return 2;
    }
}
function move(x,y,px,py){
    if(blocks[px][py] == 0 && Math.abs(px-x)+Math.abs(py-y) < 2){
       blocks[px][py] = keep;
       document.getElementById(get_block_number(px+1,py+1)).src = "images/block" + String(keep) + ".png";
       blocks[x][y] = 0;
       document.getElementById(get_block_number(x+1,y+1)).src = "images/block0.png";
       checks(px,py);
       return true;
    }else{
        if(blocks[px][py] == 6 && Math.abs(px-x)+Math.abs(py-y) < 2){
            point += get_point(keep);
            blocks[x][y] = 0;
            document.getElementById(get_block_number(x+1,y+1)).src = "images/block0.png";
            document.getElementById("point").innerText = "得点:" + String(point);
        }else{
           return false;     
        }   
    }
}
function checks(x,y){
    var num = blocks[x][y];
    switch(num){
        case 0:
          break;
        case 1:
          break;
        case 2:
          change([x+1,x-1,x,x],[y,y,y+1,y-1],{0:0,1:1,2:2,3:"Ex2-3",4:"Ex0",5:"Ex1",6:6});
          break;
        case 3:
          change([x+1,x-1,x,x],[y,y,y+1,y-1],{0:5,1:5,2:"Ex2-3",3:5,4:1,5:5,6:6});
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
    }
}
function change(listX,listY,dict){
    for(var i = 0;i < listX.length;i++){
        if(listX[i] < 0 || listX[i] > 3 || listY[i] < 0 || listY[i] > 3 ){
            continue;
        }
        if(typeof dict[blocks[listX[i]][listY[i]]] == "string"){
            switch(dict[blocks[listX[i]][listY[i]]]){
                case "Ex0":
                    blocks[listX[i]][listY[i]] = 0;
                    document.getElementById(get_block_number(listX[i]+1,listY[i]+1)).src = "images/block0.png";
                    blocks[nx][ny] = 5;
                    document.getElementById(get_block_number(nx+1,ny+1)).src = "images/block" + String(blocks[nx][ny]) + ".png";
                    break;
                case "Ex2-3":
                    blocks[listX[i]][listY[i]] = 1;
                    document.getElementById(get_block_number(listX[i]+1,listY[i]+1)).src = "images/block1.png";
                    blocks[nx][ny] = 1;
                    document.getElementById(get_block_number(nx+1,ny+1)).src = "images/block1.png";
                    break;
                case "Ex1":
                    if(two > 0){
                      blocks[listX[i]][listY[i]] = 1;
                      document.getElementById(get_block_number(listX[i]+1,listY[i]+1)).src = "images/block1.png";
                      two--;
                      if(two ==0){
                        blocks[nx][ny] = 0;
                        document.getElementById(get_block_number(nx+1,ny+1)).src = "images/block0.png";
                      }
                    }
                    break;
            }
        }else{
            blocks[listX[i]][listY[i]] = dict[blocks[listX[i]][listY[i]]];
            document.getElementById(get_block_number(listX[i]+1,listY[i]+1)).src = "images/block" + String(blocks[listX[i]][listY[i]]) + ".png";
        }
    }
}