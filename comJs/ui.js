(function() {// 010609
	/*
		1. 객체 생성함수를 정의
		2. 객체 생성
		3. 속성, 메서드 등록
	*/
	/*
	* @탭버튼 on off
	*
	*/
	function TabFnc(tabs, idx){//
		this.tabName = tabs;
		this.thisIdx = idx;
		this.thisTab = this.tabName + ":eq(" + this.thisIdx + ")";
		this.actImg =  $(this.thisTab).find(" h3:first img, h4:first img");
		this.bindEvent();
	}
	TabFnc.prototype.bindEvent = function(){
		$(document).on("click", this.thisTab + " h3 a," + this.thisTab + " h4 a", $.proxy(this.tabEventHandler, this));
	}
	TabFnc.prototype.tabEventHandler = function(e){
		e.preventDefault();
		var $myImg = $(e.target);
		console.log($myImg)
		var $myThis = $myImg.closest("a");
		var $myDiv = $myThis.parent().next();
		var $visibleDiv = $(this.thisTab + " div:visible");

		//보이는 div숨기기
		//클릭한 탭에 해당하는 div는 보여라
		if($myDiv.is(":hidden")){
			$visibleDiv.hide();
			$myDiv.show();
			var src_1 = this.actImg.attr("src").replace("_ov.gif",".gif");
			this.actImg.attr("src", src_1)

			var src_2 = $myImg.attr("src").replace(".gif","_ov.gif");
			$myImg.attr("src", src_2);
			this.actImg = $myImg;
		}
	}
	$(function(){
		var arrTab = [];
		var wrapTab = "div[data-type=tabmenu]"; //div>h3>a>img
		var wTab = $(wrapTab); // 참조 저장아님
		$.each(wTab, function(i,o){ //.each(function 익명함수(index 포문에서의 아이, element))
			arrTab[i] = new TabFnc(wrapTab, i);
		});
	});

	/*
	* @$.fn.playSlide: 반응형 bxSlide메서드
	* @opt {Opject} : bxSlider 옵션 값
	* ex) mobile:{
	*				mimSlides:2, 
	*				maxSlides:2,
	*				slideWidth:150
	*			},
	*			tablet:{
	*				mimSlides:3, 
	*				maxSlides:3,
	*				slideWidth:150
	*			},
	*			pc:{
	*				mimSlides:5, 
	*				maxSlides:5,
	*				slideWidth:150
	*			}
	* @설정 예시:
	*	$(function(){
			$("적용대상").playSlide({
				mobile:{	//변수에 대입하는 것 처럼 쓰면 된다.
					mimSlides:2, 
					maxSlides:2,
					slideWidth:150,
					easing:'ease-in',
					oneToOneTouch:true,
					pause:5000
	*			}//, 쓰고 또 쓰면 된다. 화이팅! 최선화! 재밌잖아 힘들지만 또 재밌잖아 ㅎㅎ
	*	});
	*
	*/
	$.fn.playSlide = function(opt){
		/***공통으로 들어갈 옵션***/
		var baseOption = {
			auto:true, //슬라이드 자동재생
			autoControls:true, //start stop
			controls:true, //이전보기 다음 보기
			pager:true,//슬라이드 페이지 번호
			speed:100, //in ms
			//pause:4000,
			autoHover:false,//마우스호버시 멈출지 말지
			mode:'horizontal',// 'vertical', 'fade'
			//easing:'ease-out',
			mimSlides:4, 
			maxSlides:5,
			slideWidth:100,
			slideMargin:0
		}
		var mobileOption = opt.mobile; //매개변수 속성 사용
		var tabletOption = opt.tablet;
		var pcOption = opt.pc;
		
		var k ;
		$(window).on("resize",function(){
			if($(window).width() > 780){
				k = $.extend(baseOption, opt.pc); 	
			}else if($(window).width() > 480){
				k = $.extend(baseOption, opt.tablet); //2개 이상 객체 합치기/ 동일한 내용은 첫번째 객체로 덮어써진다
			}else{
				k = $.extend(baseOption, opt.mobile);
			}
			//console.log(k);
		});
		$(window).resize();

		var slider = $(this).bxSlider(k);
		$(window).on("resize", function(){
			slider.reloadSlider(k);
			//slider.reloadSlider({ pause:1000});
		});
	}


	$.fn.gnb = function(opt){ //$fn이라고 써야 함.
		var th = $(this); //#gnb
		var activeA = null; //lnb가 보여진 th, 즉 #gnb
		var mouseOver = function(){ //마우스 오버의 대상은 a태그
			if(activeA){
				activeA.next().hide(); //lnb
				var repImg = $("img", activeA).attr("src").replace(opt.name2, opt.name1);//리플레이스 된 이미지가 저장됨
				
				$("img", activeA).attr("src", repImg);
			}
			var aOfGnb = $(this); //gnb>ul>li>a 
			// console.log(aOfGnb.next()); // lnb 즉 ul
			//console.log(aOfGnb);
			aOfGnb.next().show(); //lnb를 보여라
			var ovImg = $("img", aOfGnb).attr("src").replace(opt.name1, opt.name2);
			console.log(ovImg);
			$("img", aOfGnb).attr("src", ovImg)
			activeA = aOfGnb;//한번 더 옮겨 줘야 한다. 오류남
		}

		//$("ul ul", th).hide();//CSS에서 원래 먼저 숨겨줘야함

		$(">ul>li>a", th).on({ 
			//"mouseover focus":function(){// 아래와 같은 의미
			"mouseover focus": mouseOver //함수를 따로빼줌
		});

		//th.css({height:"47px"}); GNB의 하이트 값이 작으면 호버가 잘 안된다. 체크 할것.

		th.on({
			"mouseleave" : function(){
				if(activeA){
					activeA.next().hide();
					var repImg = $("img", activeA).attr("src").replace(opt.name2, opt.name1);
					 $("img", activeA).attr("src", repImg);
				}
			}	
		});
	}
	/**스크롤바 따라가는 퀵메뉴**/

	//2. 스크롤 높이 값 구하기 : 이벤트 등록 ->
	$.fn.quickMenu = function(opt){//$(this)=퀵메뉴모스드를 적용한 퀵메뉴
		//.fn:jquery에 등록된것. 퀵메뉴의 옵젝트를쓸 수 있게 해준다.
		//플러그인을 만든 것이다.
		var ts = $(this);
		var i = 0; //작동하는지 보려고
		$(window).on("scroll", function(){
			//console.log(screen.height());
			var myThis = $(this);
			var scT = myThis.scrollTop() + opt.top;//스크롤 높이 값 구하기
			ts.stop().animate({top:scT + "px"}, opt.speed);//앞에 쌓인거 버리고 마지막 것만 실행하기 위해 앞에다가 .stop()
			
		});
		//온메소드, 펑션 호출
	}
	/***선택영역으로 이동***/
	$.fn.autoScrollGnb= function(opt){
		var th = $(this);//gnb의 a
		var showH1 = $("section>h1");//이동할 선택자

		var autoScrollGnbHandler = function(e){
			e.preventDefault();//클릭했을 때 닷링크#가상링크 안걸리게 하려고
			var idx = th.index($(this));//클릭한 인덱스
			showH1 = $("section>h1").eq(idx);
			var showH1_top = showH1.offset().top - opt.top;
			//자연스럽게 내려오려면 스크롤바에 에니메이션 적용, 스크롤바가 html 또는 body에 들어 있다. 브라우저 마다 다르다.생성위치가 다름
			$("html, body").animate({scrollTop:showH1_top + "px"},opt.speed);//scrollTop:제이쿼리에만 있는 속성 css에는 없다.
		}

		var arr = []; //[31, 2031, 4031, 6031, 8031]
		$.each(showH1, function(){
			var showH1_top = $(this).offset().top - opt.top;
			arr.push(showH1_top);//arr에 .push로 각각의 탑값을 넣음
		});
		var m = 0;
		var activGnbHandler = function(){
			var scT = $(window).scrollTop();
			$.grep(arr, function(d, idx){//h1의 탑값, 인덱스 번호
				if(d <= scT){//h1의 탑값이 스크롤탑값보다 작아지면 
					m = idx; //인덱스 값 저장 
				}
			});
			th.filter(".on").removeClass("on");
			th.eq(m).addClass("on");
		}

		th.on({//gnb의a 에 클릭했을 때 실행할 함수 등록
			//"click":function(){}
			"click": autoScrollGnbHandler	
		});

		$(window).on({
			"scroll":activGnbHandler
		});

	}

	$(function(){
		$("#gnb").gnb({name1:".gif", name2:"_ov.gif"}); //이미지 파일명 참조
		$(".quick_menu").quickMenu({top:300, speed:1500});//이 객체를 opt가 참조하고 있다. 
		//$(".quick_menu").메소드();
		$("#gnbWrap").quickMenu({top:0, speed:10});//gnbbar 따라오게 하기 
		$("#gnbWrap>ul>li>a").autoScrollGnb({top:50,speed:100});//선택한 아티클 영역으로 이동하기
	});


}());
/*****/
/*
*메소드 설명
*
*
*
*
*
*/