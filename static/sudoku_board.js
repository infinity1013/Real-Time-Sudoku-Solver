var ques_matrix = new Array(9); 
for(var i=0;i<9;i++){ 
    ques_matrix[i] = new Array(9); 
} 

var soln_matrix = new Array(9);
for(var i=0;i<9;i++) { 
    soln_matrix[i] = new Array(9); 
} 

var board= new Array(9); 
for(var i=0;i<9;i++) { 
    board[i] = new Array(9); 
} 

var matrix_with_hint = new Array(9);
for(var i=0;i<9;i++) { 
    matrix_with_hint[i] = new Array(9); 
} 

var cnt1=0;
for(var i=0;i<9;i++) {
    for(var j=0;j<9;j++){
        ques_matrix[i][j] = qmatrix[cnt1]; 
        board[i][j] = qmatrix[cnt1];
        matrix_with_hint[i][j]= qmatrix[cnt1];
        cnt1+=1;
    }
}

var cnt2=0;
for(var i=0;i<9;i++) { 
    for(var j=0;j<9;j++) { 
        soln_matrix[i][j] = smatrix[cnt2];
        cnt2+=1;
    } 
}

for(var i=0;i<81;i++){
	var str="cell-"+i;
	var inp=document.getElementById(str);
	inp.addEventListener("change",function(){
		var cellName=this.id;
		var index = parseInt(cellName.substring(5, 7));
		var row=Math.floor(index/9);
		var column=index%9;
		var num=this.value;
		if(board[row][column]!=0)
			make_changes(row,column,1);
		board[row][column]=num;
		this.style.color="black"

		if(can_be_correct(row,column)==0)
			this.style.color="red";

		if(are_all_filled()==1){
			document.getElementById("hint").disabled = true;
			if(are_all_correct()==1){
				change_color();
				alert("Success");
			}
			else{
				alert("Oops!!! Incorrect");
			}
		}
	});
}


var reset_button=document.getElementById("reset")
reset_button.addEventListener("click",function(){
	document.getElementById("hint").disabled = false;
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(ques_matrix[i][j]==0){
				var num=i*9+j;
				var str="cell-"+num;
				var getid=document.getElementById(str);
				if(matrix_with_hint[i][j]!=0){
					getid.disabled = false;
				}
				getid.style.color="black";
				getid.value=null;
				board[i][j]=0;
			}
		}
	}
});

var soln_button=document.getElementById("solution")
soln_button.addEventListener("click",function(){
	document.getElementById("hint").disabled = true;
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(ques_matrix[i][j]==0){
				var num=i*9+j;
				var str="cell-"+num;
				var getid=document.getElementById(str);
				if(matrix_with_hint[i][j]!=0){
					getid.disabled=false;
				}
				getid.value= soln_matrix[i][j];
				board[i][j]=soln_matrix[i][j];
				getid.style.color="black";
			}
		}
	}
});

var hint_button=document.getElementById("hint")
hint_button.addEventListener("click",function(){
	while(1){
		var i=Math.floor(Math.random() * 9);
		var j=Math.floor(Math.random() * 9);
		if(board[i][j]==0){
			var num=i*9+j;
			var str="cell-"+num;
			var getid=document.getElementById(str);
			getid.value= soln_matrix[i][j];
			getid.style.color="orange";
			board[i][j]=soln_matrix[i][j];
			matrix_with_hint[i][j]=soln_matrix[i][j];
			getid.disabled = true;
			check_wrong(i,j);
			break;
		}
	}
	if(are_all_filled()==1){
		document.getElementById("hint").disabled = true;
		if(are_all_correct()==1){
			change_color();
			alert("Success");
		}
		else{
			alert("Oops!!! Incorrect");
		}
	}	
});

function make_changes(row, col,flag){
	var cnt=0;
    for(var i=0;i<9;i++){
        if(board[row][col]!=0 && col!=i && board[row][col]==board[row][i]){
        	if(matrix_with_hint[row][i]!=0){
        		if(flag==1)
        			continue;
        		else
        			return 0;
        	}
        	if(flag==1){
        		if(make_changes(row,i,0)==1){
        			var num=row*9+i;
					var str="cell-"+num;
					var getid=document.getElementById(str);
            		getid.style.color="black";
            	}
        	}
        	else{
        		cnt+=1;
        	}
        }
    }

    for(var i=0;i<9;i++){
        if( board[row][col]!=0 && row!=i && board[row][col]==board[i][col]){
        	if(matrix_with_hint[i][col]!=0){
        		if(flag==1)
        			continue;
        		else
        			return 0;
        	}
        	if(flag==1){
        		if(make_changes(i,col,0)==1){
		            var num=i*9+col;
					var str="cell-"+num;
					var getid=document.getElementById(str);
		            getid.style.color="black";
		        }
		    }
		    else{
		    	cnt+=1;
		    }
        }
    }

    var r=Math.floor(row/3);
    var c=Math.floor(col/3);
    for (var i=r*3;i<r*3+3;i++){
        for (var j=c*3;j<c*3+3;j++){
            if(row!=i && col!=j && board[i][j]!=0 && board[i][j]==board[row][col]){
            	if(matrix_with_hint[i][j]!=0){
            		if(flag==1)
        				continue;
        			else
        				return 0;
      			}
        		if(flag==1){
        			if(make_changes(i,j,0)==1){
		            	var num=i*9+col;
		            	var num=i*9+j;
						var str="cell-"+num;
						var getid=document.getElementById(str);
		            	getid.style.color="black";
		            }
		        }
		        else{
		        	cnt+=1;
		        }
            }
        }
    }

    return cnt;
}


function can_be_correct(row, col){
	var flag=1;
    for(var i=0;i<9;i++){
        if(board[row][col]!=0 && col!=i && board[row][col]==board[row][i]){
        	flag=0;
        	if(matrix_with_hint[row][i]==0){
	        	var num=row*9+i;
				var str="cell-"+num;
				var getid=document.getElementById(str);
	            getid.style.color="red";
            }
        }
    }

    for(var i=0;i<9;i++){
        if( board[row][col]!=0 && row!=i && board[row][col]==board[i][col]){
        	flag=0;
        	if(matrix_with_hint[i][col]==0){
	            var num=i*9+col;
				var str="cell-"+num;
				var getid=document.getElementById(str);
	            getid.style.color="red";
            } 
        }
    }

    var r=Math.floor(row/3);
    var c=Math.floor(col/3);
    for (var i=r*3;i<r*3+3;i++){
        for (var j=c*3;j<c*3+3;j++){
            if(row!=i && col!=j && board[i][j]!=0 && board[i][j]==board[row][col]){
            	flag=0;
            	if(matrix_with_hint[i][j]==0){
	            	var num=i*9+j;
					var str="cell-"+num;
					var getid=document.getElementById(str);
	            	getid.style.color="red";
            	}
            }
        }
    }

    return flag;
}

function check_wrong(row,col){
	for(var i=0;i<9;i++){
        if(board[row][col]!=0 && col!=i && board[row][col]==board[row][i]){
	        var num=row*9+i;
			var str="cell-"+num;
			var getid=document.getElementById(str);
            getid.style.color="red";
        }
    }

    for(var i=0;i<9;i++){
        if( board[row][col]!=0 && row!=i && board[row][col]==board[i][col]){
            var num=i*9+col;
			var str="cell-"+num;
			var getid=document.getElementById(str);
	        getid.style.color="red"; 
        }
    }

    var r=Math.floor(row/3);
    var c=Math.floor(col/3);
    for (var i=r*3;i<r*3+3;i++){
        for (var j=c*3;j<c*3+3;j++){
            if(row!=i && col!=j && board[i][j]!=0 && board[i][j]==board[row][col]){
	           	var num=i*9+j;
				var str="cell-"+num;
				var getid=document.getElementById(str);
	           	getid.style.color="red";
            }
        }
    }
}

function are_all_filled(){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(board[i][j]==0)
				return 0;
		}
	}
	return 1;
}

function are_all_correct(){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(soln_matrix[i][j]!=board[i][j])
				return 0;
		}
	}
	return 1;
}

function change_color(){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(matrix_with_hint[i][j]==0){
				var num=i*9+j;
				var str="cell-"+num;
				var getid=document.getElementById(str);
	            getid.style.color="green";
			}
		}
	}
}



var clear_button=document.getElementById("clear")
clear_button.addEventListener("click",function(){
	for(var i=0;i<81;i++){
		var str="cell-"+i;
		var inp=document.getElementById(str);
		inp.addEventListener("click",function(){
			var cellName=this.id;
			var index = parseInt(cellName.substring(5, 7));
			var row=Math.floor(index/9);
			var column=index%9;
			this.style.color="black";
			this.value=null;
			document.getElementById("hint").disabled = false;
			board[row][column]=0;
		});
	}
});
