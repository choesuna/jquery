	/*
	*@addEvnt(evObj,evName,evH) : 이벤트 등록 메서드
	*@evObj{object}이벤트 대상
	*@evName{string} 이벤트 명
	*@evH {function} 이벤트 핸들러
	*
	*/
	function addEvnt(evObj,evName,evH){
		var arrEvnt = evName.split(" ");
		//console.log(arrEvnt);
		for(var i = 0; i < arrEvnt.length; i++){
			if(document.addEventListener){
				evObj.addEventListener(arrEvnt[i], evH);
			}else{//ie8 이하
				evObj.attachEvent("on"+arrEvnt[i],evH);
			}
		}
	}	
	
	/*
	*@nextElement(obj)  선택한 요소의 다음 요소 선택 메서드
	*@obj {Object} : 대상 요소
	*@return m : 대상요쇼에 다음에 요소를 반환, 없을 땐 null
	*/
	function nextElement(obj){
		var m = obj.nextSibling; //null, #text
		if(m){
			while(m.nodeType != 1){
				m = m.nextSibling;
				console.log(m);
				if(m == null){
					break;
				}
			}
		}
		return m;
	}

	/*
	*@Event:사이즈 감지 이벤트
	*
	*/
	/*
	$(window).on("resize",function(){
		//온 메소드, 인자값두개 

		var b = $("body");//읽어오기 전에 먼저 실행되니까 밖에다 쓸수 없다.
		var w = $(window).width(); //바디엔 마진 값
		if(w >= 1024){
			b.attr("class", "");//전부다 지울 때,
			b.addClass("pc");
			
		
		}else if(w < 1024 && w >= 480){
			b.attr("class", "");//전부다 지울 때,
			b.addClass("tablet");
		
			
		}else{
			b.attr("class", "");//전부다 지울 때,
			b.addClass("mobile");
			
		}	
	});

	$(function(){
		$(window).resize();
	});
	*/