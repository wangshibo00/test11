(function(){
	var Maper = window.Maper = function(){
		this.map = ["PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPP000000000000PPP",
					"PPPPPPPPPPPPPPPPPP",
					"PPPPPPPPPPPPPPPPPP",
					"PPPPPPPPPPPPPPPPPP"
					];
	}
	Maper.prototype.render = function(){
		for (var row = 0; row < 23; row++) {
			var str = this.map[row];
			for (var col = 0; col < 12; col++) {
				var char = str.substr(col+3,1);
				if(char!=0){
					game.changeCol(row,col,char);
				}
			}
		}
	}
	/*将大地图切割出一个4×4的小地图*/
	Maper.prototype.cut = function(row,col){
		var array = [];
		for (var i = 0; i < 4 ; i++) {
			var str = this.map[row+i];
			var char = str.substr(col+3,4);
			array.push(char);
		}
		return array;
	}
	/*将block融入地图中*/
	Maper.prototype.fuse = function(){
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if(game.block.someone(i,j)){
					var str = this.map[game.block.row+i];
					str = str.substr(0,game.block.col+j+3)+game.block.type+str.substr(game.block.col+j+3+1);
					this.map[game.block.row+i] = str;
					if(game.block.row<4){
						alert("gameover,得分："+game.score);
						window.history.go(0);
						return;
					}
				}
			}
		}
	}
	Maper.prototype.remove = function(){
		for (var i = 0; i < 23; i++) {
			if(this.map[i].indexOf("0")==-1){
				this.map.splice(i,1);
				game.score ++;
				document.getElementsByTagName('caption')[0].innerHTML="得分："+game.score;
				this.map.unshift("PPP000000000000PPP");
			}
		}
	}
})()
