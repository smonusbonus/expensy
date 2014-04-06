$(function() {

	// this works on most iOS 6.x and smaller and Android devices
    function orientationChange(e) {
        $("body").scrollTop(1);
    }
    $("body").css({ height: "+=300" }).scrollTop(1);
    $(window).bind("orientationchange", orientationChange);

	// this works on iOS 7.x
	document.addEventListener('deviceready', function() {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByName('green');
    }, false);

});
