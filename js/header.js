$(document).ready(function() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $('body').addClass('mobile');
  }

  // put in current year into the footer
  $('#ajmint-footer-year').text(new Date().getFullYear());

  $('#ajmint-hamburger').click(function() {
    if ( $('.ajmint-menuitem').hasClass('ajmint-expanded') ) {
      $('.ajmint-menuitem').removeClass('ajmint-expanded');
    } else {
      $('.ajmint-menuitem').addClass('ajmint-expanded');
    }
  });

  $('#ajmint-mainmenu-trigger').click(function() {
    if ( $(this).hasClass('ajmint-expanded') ) {
      $icon = $(this).find('span.ajmint-icon-up-dir');
      $icon.addClass('ajmint-icon-down-dir');
      $icon.removeClass('ajmint-icon-up-dir');

      $(this).removeClass('ajmint-expanded');
    } else {
      $icon = $(this).find('span.ajmint-icon-down-dir');
      $icon.addClass('ajmint-icon-up-dir');
      $icon.removeClass('ajmint-icon-down-dir');

      $(this).addClass('ajmint-expanded');
    }
  });

  function resizeDropdownWidth() {
    if ($(window).width() >= 853) {
      $('#ajmint-dropdown').width($(window).width() - 260);
    } else {
      $('#ajmint-dropdown').width('auto');
    }
  }

  $(window).on('resize', function() {
    resizeDropdownWidth();
  });

  resizeDropdownWidth();

});


(function(){

	window.AJMINT = window.AJMINT || {};

  $('.ajmint-social-btn[data-type="twitter"]').click(function(e){
    var text = "Who's in and who's out? Follow the development of a Broadway show.";
    if ($('#showName').text() != "") {
      text = "Who's in and who's out? View the development of Broadway's " + $('#showName').text();
    }
    AJMINT.sendTweet(e, text);
    e.stopPropagation()
    return false
  });

  $('.ajmint-social-btn[data-type="facebook"]').click(function(e){
  	AJMINT.sendFbShare(e);
  });

  $('.ajmint-social-btn[data-type="gplus"]').click(function(e){
    AJMINT.sendGplusShare(e);
  });

  $('.ajmint-social-btn[data-type="reddit"]').click(function(e){
    AJMINT.sendRedditShare(e);
  });


  AJMINT.percentEncode = function(string){
    return string.replace(/#/g, '%23').replace(/,/g, '%2c').replace(/ /g, '%20')
  }

	/* Usage: $el.click( function(e) { AJMINT.sendTweet(e) }) */
	// This function only needs e but if you want to pass in special text or a url hash, you can
  AJMINT.sendTweet = function(e, text, route){
    var base_url = 'https://twitter.com/intent/tweet?url=' + ((!route) ? window.location.href : ('http://' + window.location.hostname + window.location.pathname + route));
    base_url = encodeURI(base_url);
    text = (text) ? text : $('meta[name="twitter:description"]').attr('content');

    var tweet_text  = "&text=" + text,
        related     = "&related=nypl_labs",
        counter_url = "&counturl=" + window.location.hostname + window.location.pathname;

    var twitter_url = AJMINT.percentEncode(base_url + tweet_text + related + counter_url);

    var settings = 'width=500,height=300,scrollbars=no,location=0,statusbars=0,menubars=0,toolbars=0,resizable=0';
    
    window.open(twitter_url, 'Tweet', settings)
  }

  AJMINT.sendFbShare = function(e){
    var base_url = 'http://www.facebook.com/dialog/feed',
        app_id   = '?app_id=1486370414909348',
        page_url = '&link=' + window.location.href;
    
    var description = "&description="+$('meta[property="og:description"]').attr('content'),
        redirect    = '&redirect_uri=http://nypl.org',
        image       = '&image='+$('meta[property="og:image"]').attr('content');

    var facebook_url = base_url + app_id + page_url + description + redirect + image;
        facebook_url = AJMINT.percentEncode(facebook_url);
    // console.log(facebook_url)

    var settings = 'width=900,height=450,scrollbars=no,location=0,statusbars=0,menubars=0,toolbars=0,resizable=0';
    
    window.open(facebook_url, 'Share', settings);
  }

  AJMINT.sendGplusShare = function(e){
    var base_url = 'https://plus.google.com/share',
        page_url = '?url=' + window.location.href;

    var gplus_url = base_url + page_url;
        gplus_url = AJMINT.percentEncode(gplus_url);
    // console.log(gplus_url)

    var settings = 'width=600,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no';
    
    window.open(gplus_url, 'Share', settings);
  }

  AJMINT.sendRedditShare = function(e){
    var base_url = 'https://www.reddit.com/submit',
        page_url = '?url=' + window.location.href.replace(/index.html$/g, '').replace(/\/$/g, '').replace(/\?.*$/, '');

    var reddit_url = base_url + page_url;

    var composed_url = AJMINT.percentEncode(reddit_url);
    var settings = 'width=920,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no';

    window.open(composed_url, 'Share', settings);
  }


}).call(this);