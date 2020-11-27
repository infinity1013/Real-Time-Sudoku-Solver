
var grid = new Array(9); 
for(var i=0;i<9;i++){ 
    grid[i] = new Array(9); 
} 

var board= new Array(9); 
for(var i=0;i<9;i++) { 
    board[i] = new Array(9); 
} 

var cnt1=0;
for(var i=0;i<9;i++) {
    for(var j=0;j<9;j++){
        grid[i][j] = qmatrix[cnt1]; 
        board[i][j] = qmatrix[cnt1];
        cnt1+=1;
    }
}

function are_all_filled(){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(board[i][j]==0)
				return false;
		}
	}
	return true;
}

const sleep = milliseconds => { 
    return new Promise(resolve => setTimeout(resolve, milliseconds)); 
}; 

function can_be_correct(row, col,val){
    for(var i=0;i<9;i++){
        if(col!=i && board[row][i]==val)
        	return false;
    }

    for(var i=0;i<9;i++){
        if(row!=i && board[i][col]==val)
        	return false;
    }

    var r=Math.floor(row/3);
    var c=Math.floor(col/3);
    for (var i=r*3;i<r*3+3;i++){
        for (var j=c*3;j<c*3+3;j++){
            if(row!=i && col!=j && board[i][j]==val)
            	return false;    
        }
    }
    return true;
}

async function solve_sudoku(){
	for(var i=0;i<81;i++){
		var r=Math.floor(i/9);
		var c=i%9;
		if(board[r][c]!=0)
			continue;
		var str="cell-"+i;
		var getid=document.getElementById(str);
		for(var val=1;val<10;val++){
			if(can_be_correct(r,c,val)){
				board[r][c]=val;
				getid.value=val;
				getid.style.color="blue";
				getid.style.background="#80ff80";
				await sleep(700);
				if(are_all_filled())
					return true;
				else{
					if(await solve_sudoku())
						return true;
					else{
						getid.style.background="#ff5c33";
						await sleep(500);
						getid.style.background="white";
						getid.value=null;
						board[r][c]=0;
					}	 
				}
			}
		}
		getid.style.background="white";
		getid.value=null;
		board[r][c]=0;
		return false;
	}
}
var vis=document.getElementById("visualize")
vis.addEventListener("click",function(){
	solve_sudoku();
});

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};