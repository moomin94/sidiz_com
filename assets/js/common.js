'use strict'

$(function(){
  // script 영역 gallery script 만들기 예
  // thumbnail 이미지로 작동하는 스크립트
  let pwElem = $('#navi .page-wrap');
  let pageElem = $('#navi .page-wrap .page');
  let pageLeng = pageElem.length;
  pwElem.css('width', parseInt(pageElem.css('width'))*pageLeng);
  $('#navi a').click(function(){
    // e.preventDefault();
    let imgSrc = $(this).attr('href');
    let checkAni = $('#main img:last').is(':animated');
    if(checkAni){ // animated : 애니메이션이 작동 중일 때 빠른 전환
      $('#main img:last').stop().css('opacity', 0);
      $('#main img:last').remove();
      $('#main img').attr('src', imgSrc);
    };
    $('#main img:last').animate({opacity:0}, {
      duration: 1000,
      easing: 'swing',
      start: function(){
        $(this).before('<img src="'+imgSrc+'">');
      },
      // step: function(){},
      complete: function(){
        $(this).remove();
      }
    });
    return false;
  });

  // let pwMargin = $('#navi .page-wrap').css('margin-left');
  const marginNumber = parseInt(pageElem.css('width'));
  function pageBtnFunc(el){
    el.click(function(){
      let marginLeftPw = parseInt(pwElem.css('margin-left'));
      let isAni = pwElem.is(':animated'); // animation 진행 여부 확인
      if(!isAni){
        if($(el).hasClass('next') && marginLeftPw > -(marginNumber*(pageLeng-1))){
          pwElem.animate({marginLeft: `${marginLeftPw - marginNumber}`}, 'fast');
        }else if($(el).hasClass('prev') && marginLeftPw < 0){
          pwElem.animate({marginLeft: `${marginLeftPw + marginNumber}`}, 'fast');
        }else if (marginLeftPw == -(marginNumber*(pageLeng-1)) || marginLeftPw == 0){
          alert('더 이상 이미지가 없습니다.');
        }
      };
    });
  };

  $('img.btn').each(function(){
    pageBtnFunc($(this));
  });

  // accordian
  // $('dd:not(:first)').css('display', 'none');
  // $('dl dt').click(function(){
  //   // $('+dd', this) : find는 자식요소 찾을 때 사용, 인접한 선택자 선택할 때는 <이런식으로 사용.
  //   if($('+dd', this).css('display') == 'none'){
  //     // $('dd').css('display', 'none');
  //     // $('+dd',this).css('display', 'block');
  //     $('dd').slideUp({duration: '1500', easing: 'easeInOutExpo'});
  //     $('+dd', this).slideDown({duration: '1500', easing: 'easeInOutExpo'});
  //   }else{
  //     $('dd').slideUp('slow');
  //   };
  // });
  /*
  실습 :
  animate method를 사용하여 위와 같은 로직을 구현하시오.
  */
  let initialDdHeight = parseInt($('.faq dd').css('height'));
  $('dd:not(:first)').css({'display': 'none', 'height': 0});
  $('dl dt').click(function(){
    if($('+dd', this).css('display') == 'none'){
      let isAni = $('dd').is(':animated');
      if(!isAni){
        $('dd').each(function(){
          if(parseInt($(this).css('height')) == initialDdHeight){
            $(this).animate({height: 0}, 400, function(){
              $(this).css('display', 'none');
            });
          }
        });
        $('+dd', this).css('display', 'block').animate({height: initialDdHeight}, 400);
      }
    }else{
      $('dd').animate({height: 0}, 400, function(){$(this).css('display', 'none')});
    };
  });

  // notice table 세로줄 효과 주기
  $('.common-table td').mouseover(function(){
    let thisIndex = $(this).index()+1;
    $('td:nth-child('+thisIndex+')').addClass('hover');
  }).mouseout(function(){
    $('td').removeClass('hover');
  });

});
