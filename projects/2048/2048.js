/**
 * Created by 朱险峰 on 2015/12/11.
 */
var game={
  data:[],//存储所有单元格数据
  RN:4,//总行数
  CN:4,//总列数
  score:0,
  state:1,//保存游戏状态：运行中，结束，动画播放中
  RUNNING:1,
  GAMEOVER:0,
  start:function(){
    this.data=[];
    this.state=this.RUNNING;//重置游戏状态为运行中
    var gameover=document.getElementById("gameOver");//找到id为gameover的div，设置display属性为none
    gameover.style.display="none";
    this.socre=0;
    //r从0开始，到<RN结束，每次+1
    //  在data中压入一个空数组
    //  c从0开始，到<CN结束，每次+1
    //        想data中r行，压入一个0

    for(var r=0;r<this.RN;r++){
      this.data.push([]);
      for(var c=0;c<this.CN;c++){
        this.data[r].push(0);
      }
    }
    //this.data=[
    //  [0,0,0,0],
    //  [0,0,0,0],
    //  [0,0,0,0],
    //  [0,0,0,0]
    //];
    this.randomNum();
    this.randomNum();
    this.updateView();
  },
  randomNum:function(){
    if(!this.isFull()) {
      //在随机不重复的位置生成一个2或者4
      for (; ;) {
        //在0-RN-1之间随机生成行下标，存在r中
        //在0-CN-1之间生成一个列下标，存在c中
        //如果data中r行c列等于0的时候
        //     生成一个0-1随机数
        //       如果随机数小于0.5就再r行c列放入4，否则放入2
        //退出循环
        var r = Math.floor(Math.random() * this.RN);
        var c = Math.floor(Math.random() * this.CN);
        if (this.data[r][c] == 0) {
          this.data[r][c] = (Math.random()) < 0.5 ? 4 : 2;
          break;
        }
      }
    }
  },
  updateView:function(){
    //专门将数组中每个元素放入页面DIV中
    /*
    * 遍历data中每个元素的值
    *
    * */
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        //找到页面上和当前位置对应的div
        var divObj=document.getElementById("c"+r+c);
        //如果当前值为0
        //    清除innerHTML
        //     还原className为cell
        //否则
        //将当前值放入innerHTML
        //修改className为"cell n"+当前值
        if(this.data[r][c]==0){
          divObj.innerHTML="";
          divObj.className="cell"
        }else{
          divObj.innerHTML=this.data[r][c];
          divObj.className="cell n"+this.data[r][c];
        }
      }
    }
    /*
    * 找到id为score的元素
    * */
    var span=document.getElementById("score");
    span.innerHTML=this.score;
    if(this.isGameOver()){
      /*
      * 设置当前游戏对象的状态
      * 找到id为gameover的div，设置display属性为block
      * 找到id为finalScore的span，设置游戏的score放入span中
      * */
      //this.isGameOver();
      this.state=this.GAMEOVER;
      var gameover=document.getElementById("gameOver");

      gameover.style.display="block";

      var finalScore=document.getElementById("finalScore");
      finalScore.innerHTML=this.score;
    }
  },
  isFull:function(){
    /*
    * 遍历data过程中
    *   如果当前元素==0
    *       返回false
    *  遍历结束，返回true
    * */
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        if(this.data[r][c]==0){
          return false;
        }
      }
    }
    return true;
  },
  moveLeft:function(){
    /*
    * 左移所有行
    * 遍历data中每一行
    *
    * */
    var before=this.data.toString();
    for(var r=0;r<this.RN;r++){
      this.moveLeftInRow(r)
    }
    var after=this.data.toString();
    if(before!=after){
      this.randomNum();
      this.updateView();
    }

  },
  moveLeftInRow:function(r){
    /*
    * 左移一行
    * c从0开始，遍历当前行中的元素，到小于CN-1结束，每次+1
    * */
    for(var c=0;c<this.CN;c++){
      var nextc=this.getNextInRow(r,c);
      if(nextc==-1){
        break;
      }else{
        if(this.data[r][c]==0){
          this.data[r][c]=this.data[r][nextc];
          this.data[r][nextc]=0;
          c--;
        }else if (this.data[r][c]==this.data[r][nextc]){
            this.data[r][c]*=2;
            this.score+=this.data[r][c];
            this.data[r][nextc]=0;
          }
        }
      }
    },
  getNextInRow : function(r,c){
    /*
    * 找r行c列位置之后，不为0的元素
    * nextc从c+1开始，遍历r行剩余元素
    *   如果nextc不等于0，
    *     返回nextc
    * 循环结束返回-1
    *
    * */
    for(var nextc=c+1;nextc<this.CN;nextc++){
      //找到下一个不为0的元素的位置
      if(this.data[r][nextc]!=0){
        return nextc
      }
      //如果一行当中后面的都为0就返回-1
    }
     return -1;
  },
  /*
  * 定义右移动的方法
  * moveright()
  * moveRightInRow()
  * getbeforeInRow()
  * */
  moveright:function(){
    var before=this.data.toString();
    for(var r=0;r<this.RN;r++){
      this.moveRightInRow(r)
    }
    var after=this.data.toString();
    if(after!=before){
      this.randomNum();
      this.updateView();
    }

  },
  moveRightInRow:function(r) {
   for(var c=this.CN-1;c>=0;c--){
     var beforec=this.getbeforeInRow(r,c);
     if(beforec==-2){
       break;
     }else{
       if(this.data[r][c]==0){
         this.data[r][c]=this.data[r][beforec];
         this.data[r][beforec]=0;
         c++;
       }else if(this.data[r][c]==this.data[r][beforec]){
         this.data[r][c]*=2;
         this.score+=this.data[r][c];
         this.data[r][beforec]=0
       }
     }
   }
  },
  getbeforeInRow:function(r,c){
    for (var beforec=c-1;beforec>=0;beforec--){
      if(this.data[r][beforec]!=0){
        return beforec
      }
    }
    return -2;
  },
  /*
     * 定义上移动的方法
     * moveUp()
     * moveUpInCol()
     * getUpInCol()
     * */
    moveUp:function(){
      var before=this.data.toString();
      for(var c=0;c<this.CN;c++){
        this.moveUpInCol(c);
      }
      var after=this.data.toString();
      if(before!=after){
        this.randomNum();
        this.updateView();
      }
  },
  moveUpInCol:function(c){
    for(var r=0;r<=this.RN-2;r++){
      var nextr=this.getUpInCol(r,c);
      if(nextr==-1){
        break;
      }else{
        if(this.data[r][c]==0){
          this.data[r][c]=this.data[nextr][c];
          this.data[nextr][c]=0;
          r--;
        }else if(this.data[r][c]==this.data[nextr][c]){
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
          this.data[nextr][c]=0;
        }
      }
    }
  },
  getUpInCol:function(r,c){
    for (var nextr=r+1;nextr<this.RN;nextr++){
      if(this.data[nextr][c]!=0){
        return nextr
      }
    }
    return -1;
  },
  /*
   * 定义下移动的方法
   * moveDown()
   * moveDownInCol()
   * getDownInCol()
   * */
  moveDown:function(){
    var before=this.data.toString();
    for(var c=0;c<this.CN;c++){
      this.moveDownInCol(c);
    }
    var after=this.data.toString();
    if(before!=after){
      this.randomNum();
      this.updateView();
    }
  },
  moveDownInCol:function(c){
    for(var r=this.RN-1;r>0;r--){
      var nextr=this.getDownInCol(r,c);
      if(nextr==-1){
        break;
      }else{
        if(this.data[r][c]==0){
          this.data[r][c]=this.data[nextr][c];
          this.data[nextr][c]=0;
          r++;
        }else if(this.data[r][c]==this.data[nextr][c]){
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
          this.data[nextr][c]=0;
        }
      }
    }
  },
  getDownInCol:function(r,c){
    for (var nextr=r-1;nextr>=0;nextr--){
      if(this.data[nextr][c]!=0){
        return nextr
      }
    }
    return -1;
  },
  isGameOver:function(){
    //判断游戏的状态
    /*
    * 外层循环遍历行
    * 内层循环遍历列
    * 如果当前元素等于0
    * 返回false
    * 否则，如果列号小于CN-1且当前元素等于右侧元素，返回false
    * 负责，如果行号<RN-1且当前元素等于下方元素，返回false
    * 遍历结束返回true
    * */
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        if(this.data[r][c]==0){
          return false;
        }else if(c<this.CN-1&&this.data[r][c]==this.data[r][c+1]){
            return false;
        }else if(r<this.RN-1&&this.data[r][c]==this.data[r+1][c]){
              return false;
        }
      }
    }
    return true;
  }
};
//当页面加载后
window.onload=function() {
 game.start();
  /*
   * 键盘事件绑定
   * */
};
  document.onkeydown=function(){
    var e=window.event||arguments[0];
    var code= e.keyCode;
    //如果按的是向左箭头，就调用左移方法
    //左37 上38 右39 下40

    if(game.state==game.RUNNING) {
      if (code == 37) {
        game.moveLeft();
      } else if (code == 39) {
        game.moveright();
      } else if (code == 38) {
        game.moveUp();
      } else if (code == 40) {
        game.moveDown();
      }
    }
  };

