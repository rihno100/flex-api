// JavaScript Document
$(document).ready(function(e) {
		   

	/**********input value chage defalut value************/ 
	function inputValueChange(idn){
		$(".flexarea").each(function(i){
			var changeClass = $(this).find(".inner");
			var iIndex = i+1;
			if(iIndex != idn){
				$(this).find(".inputarea div:nth-child(1) input").prop("checked","checked");
				if(!$(this).has('itemsselect')){
					dataClass($(this).find(".inputarea div:nth-child(1) input"),changeClass);
					}
				$(".flexarea").removeClass("unselect");
				$(this).addClass("unselect");			
				}else if(idn == '' || idn == false){
					$(this).find(".inputarea div:nth-child(1) input").prop("checked","checked");// 페이지 초기 로딩시 input checked 초기값 설정;
					}
			});
		}
		
		inputValueChange();// 페이지 초기 로딩시 input checked 초기값 설정 실행;
		
		/****************dataClass change************************/
		function dataClass(thisElem,thisInner){
						 var dataClass = thisElem.attr("data-class");
						 if(dataClass){
					 		$(thisInner).removeClass();
						 	$(thisInner).addClass("inner items "+dataClass+"");							 
							 }
			}
			
			
		/****************aalign-self dataClass change************************/
		function alignSelfdataClass(thisElem,thisInner){
						 var dataClass = thisElem.attr("data-class");
						 if(dataClass){	
							$(thisInner).find("div").removeClass();
						 	$(thisInner).find("div:nth-child(1)").addClass(dataClass);	 
							 }
			}			
		
	////////////////////flex order function start/////////////////////////*
		function orderIndexChange(num,valText,container){
			var divitem = $(container).find(".inner.items > div");
			divitem.each(function(i){
				if(num == i){
						//console.log(num+","+i)
						if($(container).hasClass("order")){
							$(this).css("order",valText);
						}else if($(container).hasClass("grow")){
							$(this).css("flex-grow",valText);
						}else if($(container).hasClass("shrink")){
							$(this).css("flex-shrink",valText);
							}
					}
				});
			}
    ////////////////////flex order function end/////////////////////////

	
		
		$(".flexarea").each(function(){
			var changeClass = $(this).find(".inner");
			var indexNum = $(this).index()+1;
				$(this).find(".inputarea input").change(function() {
					if($(this).hasClass('alignselfitem')){
							alignSelfdataClass($(this),changeClass);
						}else{
							inputValueChange(indexNum);
							dataClass($(this),changeClass);
							}
				});	
				////////////////////flex order code start/////////////////////////
				var thisFlexarea = $(this);
				if($(this).hasClass('shrink')){
					$(this).find(".inner.items > div").each(function(){
						//console.log($(this).css("flex-grow")+","+$(this).css("flex-shrink"))
						});					
				}
				
				
				
				$(this).find(".inputtextarea > div.innerinput").each(function(i){
					var thisIndex = i;
					var thisNum = $(this);
					var text  = '';
					thisNum.find('input').on({
							keyup : function(e){
								thisValue = $(this).val();
								text = thisValue;
															
															
								if($(thisFlexarea).hasClass('order') || $(thisFlexarea).hasClass('grow') || $(thisFlexarea).hasClass('shrink')){
									if(e.keyCode == 13){//키가 13이면 실행 (엔터는 13)
										if(text  ==""){
												orderIndexChange(thisIndex,0,thisFlexarea);
										}else if(isNaN(text)){
											$(this).val('');
											alert('정수만 입력 해주세요.');
										}else{
												orderIndexChange(thisIndex,text,thisFlexarea);
										}
									}
									$(this).focusout(function(e) {
										orderIndexChange(thisIndex,text,thisFlexarea);
									});
								}
								
								
								
							}
						});
					});
				////////////////////flex order code end/////////////////////////
			});
 
});