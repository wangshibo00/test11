//用IIFE包裹，暴露一个全局变量供全局使用
(function(){
	var Game = window.Game = function(){
		this.dom = null;
		this.block = new Block();
		this.nextBlock = new Block();
		this.maper = new Maper();
		this.score = 0;
		this.init();
		this.bindEvent();//绑定监听事件
		this.start();
	}
	Game.prototype.init = function(){
		var table = document.createElement("table");
		table.id = "main"
		var caption = document.createElement("caption");
		caption.innerHTML = "得分："+this.score;
		caption.style.color = "#eee";
		table.appendChild(caption);
		for (var row = 0; row < 23; row++) {
			var tr = document.createElement("tr");
			if(row<3){
				tr.style.display = "none";
			}
			for (var col = 0; col < 12; col++) {
				var td = document.createElement("td");
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		document.body.appendChild(table);
		var table2 = document.createElement("table");
		table2.id = "box";
		for (var row = 0; row < 4; row++) {
			var tr = document.createElement("tr");
			for (var col = 0; col < 4; col++) {
				var td = document.createElement("td");
				tr.appendChild(td);
			}
			table2.appendChild(tr);
		}
		document.body.appendChild(table2);
	}
	Game.prototype.changeCol = function(row,col,className,id){
		if(id==undefined){
			document.getElementById('main').getElementsByTagName('tr')[row].getElementsByTagName("td")[col].className = className;
		}else{
			document.getElementById(id).getElementsByTagName('tr')[row].getElementsByTagName("td")[col].className = className;
		}
	}
	Game.prototype.clear = function(){
		for (var row = 0; row < 23; row++) {
			for (var col = 0; col < 12; col++) {
				this.changeCol(row,col,"");
			}
		}
		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 4; col++) {
				this.changeCol(row,col,"","box");
			}
		}

	}
	Game.prototype.bindEvent = function(){
		var self = this;
		document.onkeydown = function(event){
			switch(event.keyCode){
				case 37:
				if(self.block.compare(self.maper.cut(self.block.row+1,self.block.col-1))){
					self.block.left();
				}
				break;
				case 38:
				if(self.block.compare(self.maper.cut(self.block.row,self.block.col),self.block.nextNum())){
					self.block.change();
				}
				break;
				case 39:
				if(self.block.compare(self.maper.cut(self.block.row,self.block.col+1))){
					self.block.right();
				}
				break;
				case 40:
				if(self.block.compare(self.maper.cut(self.block.row+1,self.block.col))){
					self.block.down();
				}
				break;
				case 32:
				while(self.block.compare(self.maper.cut(self.block.row+1,self.block.col))){
					self.block.down();
				}
				break;

			}
		}
	}
	Game.prototype.start = function(){
		var self = this;
		var frame=0;
		console.log(this.block)
		var timer = setInterval(function(){
			frame++
			self.clear();
			self.block.render();
			self.maper.render();
			self.nextBlock.render("box");
			if(frame%10==0){
				if(self.block.compare(self.maper.cut(self.block.row+1,self.block.col))){
					self.block.down();
				}else{
					self.maper.fuse();
					self.maper.remove();
					self.block = self.nextBlock;
					self.nextBlock = new Block();
				}
			}

		},50)
	}
})()