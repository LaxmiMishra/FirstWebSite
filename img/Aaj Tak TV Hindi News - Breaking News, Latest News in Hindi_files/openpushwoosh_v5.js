var mediaLogoPath = 'http://media2.intoday.in/aajtak/1.0.2/resources/images/aajtak-alert.png';
var siteName = 'AajTak';
var notificationAppID = '8B3C4-6D21E';

document.getElementById("overlay").style.display = 'none';
if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
{
openPushwooshSubscribeWindow(document.getElementById("pushwooshpopup"),document.getElementById("overlay"));
}


function setCookiePushwooshSubscribe(c_name, value, exdays) {
	
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value)
			+ ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());

	document.cookie = c_name + "=" + c_value;
}

function openPushwooshSubscribeWindow(ElementObject,ElementObjectOverlay) {

	var chromeNotificationAppID = decodeURIComponent(getCookieForPushwoosh('ATchromeNotification'));
	var pushwooshpopupcontent = '';
	if (chromeNotificationAppID != undefined && chromeNotificationAppID != '' && (chromeNotificationAppID)) {
		ElementObject.innerHTML = pushwooshpopupcontent;
		ElementObject.style.display = 'none';
		ElementObjectOverlay.style.display = 'none';
	} else {
		pushwooshpopupcontent += '<div class="notification_outer" id="pushwooshsubscribe">';
		pushwooshpopupcontent += '<div class="notification_box">';
		pushwooshpopupcontent += '<span class="notification-placeholder"></span>';
		pushwooshpopupcontent += '<h2>Desktop Notification</h2>';
		pushwooshpopupcontent += '<h3>Aaj Tak would like to send you latest news updates</h3>';		
		pushwooshpopupcontent += '<span class="allow"><a href="javascript:void(0);" id="notallow" onclick="javascript:document.getElementById(\'pushwooshpopup\').style.display = \'none\';setCookiePushwooshSubscribe(\'ATchromeNotification\',notificationAppID,1);document.getElementById(\'overlay\').style.display = \'none\';ga(\'send\', \'event\', \'ATChromeNotification\', \'click\',\'1\', 1, {\'notificationNotNow\': 1});return true;">REMIND LATER</a><a href="javascript:void(0);" id="allow" onclick="javascript:pushwoosh.showSubscriptionWindow();setCookiePushwooshSubscribe(\'ATchromeNotification\',notificationAppID,365); document.getElementById(\'pushwooshpopup\').style.display = \'none\'; document.getElementById(\'overlay\').style.display = \'none\';ga(\'send\', \'event\', \'ATChromeNotification\', \'click\',\'1\', 1, {\'notificationAllow\': 1});return true;" class="active">ALLOW</a> </span></div></div>';
		
		
		
		try {
			//setCookiePushwooshSubscribe('ATchromeNotification',notificationAppID,1);
			
			
			
			ElementObject.innerHTML = pushwooshpopupcontent;
			ElementObjectOverlay.style.display = 'block';
			//var horizontalCenter = Math.floor(window.innerWidth / 2) - 200;
			var horizontalCenter = '';
			//document.getElementById("pushwooshsubscribe").style.left = horizontalCenter+ 'px';
			ElementObject.style.display = 'block';
			

		} catch (err) {

		}

	}

}
function getCookieForPushwoosh(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();
	} else {
		return '';
	}
}