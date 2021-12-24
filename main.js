$(document).ready(function(){ 
	function match(left,right){
		if(left==right){
			return true;
		}else{
			return false;
		}
	}
	function bound(val,min,max){
	   if(val>max){
		  val=max;
	   }
	   if(val<min){
		  val=min;
	   }
	   return val;
    };
	function randomIntFromInterval(min,max)
	{
    return Math.floor(Math.random()*(max-min+1)+min);
	}
	function clear_output_solution(){
		document.getElementById('output_solutions').innerHTML = "";
	}
	function append_output_solution(new_html){
		html_equation = document.getElementById('output_solutions').innerHTML;
		document.getElementById('output_solutions').innerHTML = html_equation + new_html;
	}
	function prepend_output_solution(new_html){
		html_equation = document.getElementById('output_solutions').innerHTML;
		document.getElementById('output_solutions').innerHTML = new_html + html_equation;
	}
	function generate(){
		operators = ["+","-","*","/"];
		numbers = [0,0,0,0,0];
		number = bound(parseFloat(document.getElementById('Option_Num').value),3,5);
		number_min = bound(parseFloat(document.getElementById('Option_Min').value),0,100);
		number_max = bound(parseFloat(document.getElementById('Option_Max').value),1,100);
		number_skip = bound(parseFloat(document.getElementById('Option_Skip').value),0,100);
		function create_equation(){
		html_equation = "";
		for(var i=0; i<number; i++){
			html_equation = html_equation +	numbers[i];
			if(i<number-1){
				html_equation = html_equation + "&#x25a1;";
			}
		}
		document.getElementById('output').innerHTML = html_equation;
		}	
		final_operators_all=[];
		total=0;
				function permutation(perm, pos, str) {
				if (pos == perm.length) {
					final_operators_all[total] = perm.join('').split('');  
					total=total+1; 
				} else {
					for (var increment = 0 ; increment < str.length ; increment++) {
					perm[pos] = str.charAt(increment);
					permutation(perm, pos+1, str);
					}
				}
				}
		if(number_min>number_max){
			alert("Invalid Option Input!");
		}else{
			for(var number_count=0; number_count<number; number_count++){
			numbers[number_count] = randomIntFromInterval(number_min,number_max);
			}
			clear_output_solution();
			create_equation();
			numbers_left = [-1,-1,-1,-1];
			numbers_right = [-1,-1,-1,-1];
			numbers_left_digit=0;
			numbers_right_digit=0;
			any_correct=0;
			//generate permutation array
			perm = new Array(number_count-2); 
			permutation(perm, 0, "+-*/");
			for(var i=0; i<number-1; i++){
				numbers_left_digit=i+1;
				numbers_right_digit=number_count-(i+1);
				for(var i2=0; i2<i+1; i2++){
				numbers_left[i2]=numbers[i2];
				}
				for(var i2=0; i2<number_count-(i+1); i2++){
				numbers_right[i2]=numbers[i2+i+1];
				}
				//form equation equal only
				equals_equation = "";
				for(var i3=0; i3<numbers_left_digit; i3++){
				equals_equation = equals_equation + numbers[i3];
				if(i3<numbers_left_digit-1){
				equals_equation = equals_equation + "&#x25a1;";
				}
				}
				equals_equation = equals_equation + "=";
				for(var i3=0; i3<numbers_right_digit; i3++){
				equals_equation = equals_equation + numbers[i3+i+1]
				if(i3<numbers_right_digit-1){
				equals_equation = equals_equation + "&#x25a1;";
				}
				}
				append_output_solution("<div class=\"\" id=\"equals"+i+"\">"+equals_equation+"</div>");
				//create all permutations
				final_left_numbers=[-1,-1,-1,-1];
				final_right_numbers=[-1,-1,-1,-1];
				final_left_operators=[-1,-1,-1,-1];
				final_right_operators=[-1,-1,-1,-1];
				
				
				function generate_equation(operators_val){//eg. 1234 . -+
					operators_increment=0;
					final_equation=["","",""]; //original,left,right
					for(var i3=0; i3<numbers_left_digit; i3++){
					final_equation[0] = final_equation[0] + numbers[i3];
					if(i3<numbers_left_digit-1){
					final_equation[0] = final_equation[0] + operators_val[operators_increment];
					operators_increment=operators_increment+1;
					}
					}
					final_equation[1] = final_equation[0];
					
					for(var i3=0; i3<numbers_right_digit; i3++){
					final_equation[2] = final_equation[2] + numbers[i3+i+1]
					if(i3<numbers_right_digit-1){
					final_equation[2] = final_equation[2] + operators_val[operators_increment];
					operators_increment=operators_increment+1;
					}
					}
					final_equation[0] = final_equation[0] + "=" + final_equation[2];
					return final_equation;
				}

				
				////
				for(var i3=0; i3<numbers_left_digit; i3++){
				final_left_numbers[i3] = numbers[i3];
				}
 
				for(var i3=0; i3<numbers_right_digit; i3++){
				final_right_numbers[i3] =  numbers[i3+i+1]
				}
				for(list1=0; list1<final_operators_all.length; list1++){
				outcome=generate_equation(final_operators_all[list1]);	
				correct=0;
				eval("correct = match("+final_equation[1]+","+final_equation[2]+");");
				var para = document.createElement("div");
				var node = document.createTextNode(outcome[0]);
				if(correct==0){
					para.className="output_sub";
				}else{
					any_correct = 1; 
					para.className="output_sub correct";
				}
				para.appendChild(node);
				document.getElementById("equals"+i+"").appendChild(para);

				}
 
				numbers_left = [-1,-1,-1,-1];
				numbers_right = [-1,-1,-1,-1];
			}
				if(any_correct==0){
					prepend_output_solution("<div style=\"color:#FF0000\">Warning! No possible solution found</div>");
					skip=skip+1;
					if(skip<number_skip){
						generate();	
					}
				}
		}
	}
	
	document.getElementById("generate").addEventListener('click',function(){skip=0;generate();},false);
});
/*final_left_operators_all=[];
				final_right_operators_all=[];
				//
				function permutation_l(perm, pos, str) {
				if (pos == perm.length) {
					final_left_operators_all[total] = perm.join('').split('');  
					total=total+1; 
				} else {
					for (var increment = 0 ; increment < str.length ; increment++) {
					perm[pos] = str.charAt(increment);
					permutation_l(perm, pos+1, str);
					}
				}
				}
				function permutation_r(perm, pos, str) {
				if (pos == perm.length) {
					final_right_operators_all[total] = perm.join('').split('');
					total=total+1;
				} else {
					for (var increment = 0 ; increment < str.length ; increment++) {
					perm[pos] = str.charAt(increment);
					permutation_r(perm, pos+1, str);
					}
				}
				}
				*/
					//perm_l = new Array(numbers_left_digit-1);
				//perm_r = new Array(numbers_right_digit-1);
				//total=0;
				//permutation_l(perm_l, 0, "+-*/");
				//total=0;
				//permutation_r(perm_r, 0, "+-*/");