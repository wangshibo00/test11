(function(){
	var Block = window.Block = function(){
		this.allType = ["T","L","J","S","Z","I","O"];
		this.type = this.allType[parseInt(Math.random()*this.allType.length)];
		this.blockType = {
			"T":[0x0720,0x2320,0x2700,0x2620],
			"L":[0x4460,0x0170,0x3110,0x7400],
			"J":[0x1130,0x7100,0x6440,0x0470],
			"S":[0x0360,0x4620],
			"Z":[0x0630,0x1320],
			"I":[0x2222,0x00f0],
			"O":[0x0660]				
		};
		this.num = parseInt(Math.random()*this.blockType[this.type].length);
		this.row = 0;
		this.col = 4;
	}
	/*返回某一个方块的值,传入的是4×4矩阵中的位置*/
	Block.prototype.someone = function(row,col,type,num){
		if(num==undefined)num = this.num;
		if(type==undefined)type = this.type;
		var value = this.blockType[type][num];
		var hang = value>>(3-row)*4&0xf;
		return hang>>(3-col)&1;
	}
	/*渲染方法*/
	Block.prototype.render = function(id){
		if(id==undefined){
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					if (this.someone(i,j,this.type,this.num)) {
						game.changeCol(this.row+i,this.col+j,this.type);
					}
				}
			}
		}else{
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					if (this.someone(i,j,this.type,this.num)) {
						game.changeCol(i,j,this.type,id);
					}
				}
			}
		}

	}
	/*向下走的方法*/
	Block.prototype.down = function(){
		this.row++;
	}
	Block.prototype.left = function(){
		this.col--;
	}
	Block.prototype.right = function(){
		this.col++;
	}
	Block.prototype.change = function(){
		this.num++;
		if(this.num>=this.blockType[this.type].length){
			this.num=0;
		}
	}
	/*给方块添加和地图比较的方法,true代表没有重合的地方，即可执行后续操作*/
	Block.prototype.compare = function(array,num){
		//有个坑，不能用!num，应为num有可能是0；/(ㄒoㄒ)/~~
		if(num==undefined){
			num = this.num;
		}
		for (var i = 0; i < 4; i++) {
			var str = array[i];
			for (var j = 0; j < 4; j++) {
				var char = str.charAt(j);
				var thisOne = this.someone(i,j,this.type,num);
				if(char!="0"&&thisOne==1){
					return false;
				}
			}
		}
		return true;
	}
	Block.prototype.nextNum = function(){
		var num = this.num+1;
		if(num>=this.blockType[this.type].length){
			num=0;
		}
		return num;
	}
})()