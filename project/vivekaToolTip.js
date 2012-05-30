/*
 * vivekaToolTip jQuery Plugin v1.3.0.1
 * Licensed under the MIT license.
 * Copyright 2012 G.Burak Demirezen
 */ 
(function ($) {
    $.fn.toolTip = function (options) {
        var defaults = {
            header: 'Genel İngilizce Kelime Seti',
            text: 'Açıklama metinleri',
            top: 20,
            left: 20,
            showType: 'mouseenter',
            width: 300,
            exFrame: '.content'
        },
            settings = $.extend(defaults, options);
        var
        $dom = this.selector,
            $top = 0,
            $left = 0,
            $tempHeight = 0,
            $timeOut = 0,
            $tempHeader = settings.header,
            $tempText = createText(settings.text),
			$control = null;
			
        $.jsonParse = function (data) {
            if (typeof data != "undefined") {
                var json = $.parseJSON(data);
                $tempHeader = json["data"].header;
                $tempText = createText(json["data"].text);
            }
        };

        $.domCreate = function (element) {
            $.jsonParse($(element).attr('placeholder'));
            var $crtDom = $('<figure class="vivekaTooltip"><figcaption>' + $tempHeader + '</figcaption>' + $tempText + '<span class="bullet"></span></figure>').stop(true, true).fadeIn('fast'),
                $exFrameLeft = $(settings.exFrame).offset().left,
                $exFrameWidth = $(settings.exFrame).width(),
                $exFrameArea = $exFrameLeft + $exFrameWidth,
                $domTotalWidth = $(element).offset().left + settings.width,
                $domPaddingL = parseInt($(element).css('padding-left')),
                $domPaddingR = parseInt($(element).css('padding-right')),
                $domPaddingT = parseInt($(element).css('padding-top')),
                $domPaddingB = parseInt($(element).css('padding-bottom')),
				$width = parseInt($(element).css('width')) / 2;
			
            $top = $(element).offset().top - settings.top + $domPaddingT;
            $left = $(element).offset().left - settings.left + $domPaddingL + $width - 6;
			
            $('body').append($crtDom);
            $tempHeight = $('figure.vivekaTooltip').height();
            $top -= $tempHeight;

            var $toolTipElement = $('figure.vivekaTooltip');

            if (($exFrameArea - $domTotalWidth) < 0) {
                if ($top < 0) {
                    $left = $(element).offset().left - (settings.width - settings.left) + $domPaddingR + $width + 1;
                    $top = $(element).offset().top + settings.top + $domPaddingT;
					
                    $toolTipElement.css({
                        width: settings.width
                    });
                    $toolTipElement.find('figcaption, p.paragraph').css({
                        width: settings.width - 20
                    });
                    $toolTipElement.find('span.bullet').addClass('top').css({
                        right: 15,
                        top: -8
                    });
                    $toolTipElement.fadeIn('fast').offset({
                        top: $top,
                        left: $left
                    });
                } else {
                    $left = $(element).offset().left - (settings.width - settings.left) + $domPaddingR + $width + 1;
                    $toolTipElement.css({
                        width: settings.width
                    });
                    $toolTipElement.find('figcaption, p.paragraph').css({
                        width: settings.width - 20
                    });
                    $toolTipElement.find('span.bullet').css({
                        right: 15,
                        bottom: -8
                    });
                    $toolTipElement.fadeIn('fast').offset({
                        top: $top,
                        left: $left
                    });
                }
            } else {				
                if ($top < 0) {
                    $top = $(element).offset().top + settings.top + $domPaddingT;
                    $toolTipElement.css({
                        width: settings.width
                    });
                    $toolTipElement.find('figcaption, p.paragraph').css({
                        width: settings.width - 20
                    });
                    $toolTipElement.find('span.bullet').addClass('top').css({
                        left: 20,
                        top: -8
                    });
                    $toolTipElement.fadeIn('fast').offset({
                        top: $top,
                        left: $left
                    });

                } else {
                    $toolTipElement.css({
                        width: settings.width
                    });
                    $toolTipElement.find('figcaption, p.paragraph').css({
                        width: settings.width - 20
                    });
                    $toolTipElement.find('span.bullet').css({
                        left: 20,
                        bottom: -8
                    });
                    $toolTipElement.fadeIn('fast').offset({
                        top: $top,
                        left: $left
                    });
                }
            }
        };

        $.close = function () {
            $timeOut = setTimeout(function () {
                $('figure.vivekaTooltip').fadeOut('fast', function () {
                    $(this).remove();
                });
            }, 300);
        };

        $('figure.vivekaTooltip').live('mouseenter', function () {
            clearTimeout($timeOut);
            $('figure.vivekaTooltip').stop(true, true).fadeIn('fast');
        });

        $('figure.vivekaTooltip').live('mouseleave', function () {
            $('figure.vivekaTooltip').fadeOut('fast', function () {
                $(this).remove();
            });
        });

        $.control = function (event) {
            if ($('figure.vivekaTooltip').length > 0) {
                $('figure.vivekaTooltip').stop(false, false).css({
                    'opacity': '1'
                });
            } else {
                $('figure.vivekaTooltip').remove();
                $.domCreate(event);
            }
        };

        this.bind(settings.showType, function () {
			if($control == null || $control != this){
				$control = this;
				clearTimeout($timeOut);
				$('figure.vivekaTooltip').remove();
				$.control(this);
			}else{
				$.control(this);
			}
        });

        this.click(settings.showType, function () {
            return false;
        });

        this.bind('mouseleave', function () {
            $.close();
        });

        function createText(text) {
            var temp, returnText = '',
                first, total;
            if (text != '') {
                temp = text.split('->');
                if (temp.length > 1) {
                    for (i in temp) {
                        returnText += '<p class="paragraph">' + temp[i] + '</p>';
                    }
                } else {
                    returnText += '<p class="paragraph">' + temp[0] + '</p>';
                }
                return returnText;
            }
        };
    };
})(jQuery);