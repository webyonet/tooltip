/*
 * vivekaToolTip jQuery Plugin v1.0.0.1
 * Licensed under the MIT license.
 * Copyright 2012 G.Burak Demirezen
 */ 
(function ($) {
    $.fn.toolTip = function (options) {
        var defaults = {
            header:'Genel İngilizce Kelime Seti',
			text:'Açıklama metinleri',
			top : 20,
			left : 23,
			showType : 'mouseenter',
			width : 300,
			exFrame : '.content'
        },
            settings = $.extend(defaults, options);
		var
		$dom =  this.selector,
		$top = 0,
		$left = 0,
		$tempHeader = settings.header,
		$tempText = createText(settings.text),
		$tempHeight = 0;
		
		$.jsonParse = function(data){
			if(typeof data != "undefined"){
				var json = $.parseJSON(data)
				$tempHeader = json["data"].header;
				$tempText = createText(json["data"].text);
			}
		};
		
		$.domCreate = function(element){
			$.jsonParse($(element).attr('placeholder'));
			$top = $(element).offset().top - settings.top;
			$left = $(element).offset().left - settings.left;
			var $crtDom = $('<figure class="vivekaTooltip"><figcaption>'+ $tempHeader +'</figcaption>'+ $tempText +'<span class="bullet"></span></figure>').hide(),
			$exFrameLeft = $(settings.exFrame).offset().left,
			$exFrameWidth = $(settings.exFrame).width(),
			$exFrameArea = $exFrameLeft + $exFrameWidth,
			$domTotalWidth = $(element).offset().left + settings.width;
			
			$('body').append($crtDom);
			$tempHeight = $('figure.vivekaTooltip').height();
			$top -= $tempHeight;

			if(($exFrameArea - $domTotalWidth) < 0){
				console.log('0 dan küçük' + ($exFrameArea - $domTotalWidth));
				$left = $(element).offset().left - (settings.width - settings.left); 
				$('figure.vivekaTooltip').css({width:settings.width});
				$('figure.vivekaTooltip figcaption, p.paragraph').css({width:settings.width - 20});
				$('figure.vivekaTooltip span.bullet').css({right:15});
				$('figure.vivekaTooltip').fadeIn('fast').offset({top:$top,left:$left});
			}else{
				$('figure.vivekaTooltip').css({width:settings.width});
				$('figure.vivekaTooltip figcaption, p.paragraph').css({width:settings.width - 20});
				$('figure.vivekaTooltip span.bullet').css({left:20});
				$('figure.vivekaTooltip').fadeIn('fast').offset({top:$top,left:$left});
			}
		};
	   	
	   this.bind(settings.showType,function(){
		   $('figure.vivekaTooltip').remove();
		   $.domCreate(this);
		   return false;
	   });
	   
	   this.bind('mouseleave',function(){
		   $('figure.vivekaTooltip').remove();
	   });
	   
	   function createText(text) {
		  var temp, returnText = '',first,total;
		  if(text != ''){
			temp = text.split('->');
			if(temp.length > 1)
			{
			  for(i in temp){
				returnText += '<p class="paragraph">'+ temp[i] +'</p>'; 
			  }
			}else{
				returnText += '<p class="paragraph">'+ temp[0] +'</p>';
			}
			return returnText;
		  }
	  };
	  
	 return false; 
	}
})(jQuery);