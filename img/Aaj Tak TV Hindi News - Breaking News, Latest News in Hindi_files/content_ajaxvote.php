/*
// "AJAX Vote" Plugin for Joomla! 1.0.x - Version 1.0
// License: http://www.gnu.org/copyleft/gpl.html
// Authors: George Chouliaras - Fotis Evangelou - Luca Scarpa
// Copyright (c) 2006 - 2007 JoomlaWorks.gr - http://www.joomlaworks.gr
// Project page at http://www.joomlaworks.gr - Demos at http://demo.joomlaworks.gr
// ***Last update: May 14th, 2007***
*/

function content_jwAjaxVote(id,idcount,requested_pageurl){
	var lsXmlHttp;
	var div = document.getElementById('jwajaxvote'+id);
	var countdiv = document.getElementById(idcount);
	
	var spnaMsgClass = document.getElementsByClassName("msg_jwajaxvote");
	var i;
	for (i = 0; i < spnaMsgClass.length; i++) {
    	spnaMsgClass[i].innerHTML = "";
	}
	
	div.innerHTML='<img src="'+live_site+'/mambots/content/plugin_jw_ajaxvote/images/loading.gif" border="0" align="absmiddle" /> '+jwajaxvote_lang['UPDATING'];
	try	{
		lsXmlHttp=new XMLHttpRequest();
	} catch (e) {
		try	{ lsXmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try { lsXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		} 
	}
	lsXmlHttp.onreadystatechange=function() {
		var response;
		if(lsXmlHttp.readyState==4){
			setTimeout(function(){ 
				response = lsXmlHttp.responseText;
				if(response=='1') div.innerHTML=jwajaxvote_lang['THANKS'];
				else div.innerHTML=jwajaxvote_lang['ALREADY_VOTE'];
			},500);
			setTimeout(function(){
				if(response=='1'){
					var oldcount = countdiv.innerHTML || 0;
					var newtotal = parseInt(oldcount)+parseInt(1);
					countdiv.innerHTML= newtotal;
				} 
			},2000);
		}
	}
	lsXmlHttp.open("GET",live_site+"/mambots/content/plugin_jw_ajaxvote/ajax.php?task=vote&user_rating="+idcount+"&cid="+id+"&content_type=text",true);
	//pageTracker._trackPageview(requested_pageurl); 
	
	//added by atul kainth on 04-10-2013
	/*if(typeof(pageTracker)!=undefined && pageTracker!=undefined) {
		pageTracker._trackPageview(requested_pageurl);
	}*/

	/*if(typeof(_gaq)!=undefined && _gaq!=undefined) {
		_gaq.push(['_trackPageview',requested_pageurl]);
	}*/
	
	//New code added by Randhir on 06-01-2015
	requested_pageurl=requested_pageurl.replace(live_site,"");
	
	try {
		
		if(idcount=='downcount')
		var liketype='DISLIKE';
		else
		var liketype='LIKE';
		
    	ga('send', 'event', liketype, 'click',requested_pageurl, 1, {'nonInteraction': 1});
	}
	catch(err) {
		
	}
	//End of new code
	
	lsXmlHttp.send(null);			
}

function content_jwAjaxVote_photo(id,idcount,requested_pageurl){
	
	var lsXmlHttp;
	var div = document.getElementById('jwajaxvote'+id);
	var countdiv = document.getElementById(idcount);
	div.style.color = '#FFF';
	
	var spnaMsgClass = document.getElementsByClassName("msg_jwajaxvote");
	var i;
	for (i = 0; i < spnaMsgClass.length; i++) {
    	spnaMsgClass[i].innerHTML = "";
	}
	
	div.innerHTML='<img src="'+live_site+'/mambots/content/plugin_jw_ajaxvote/images/loading.gif" border="0" align="absmiddle" /> '+jwajaxvote_lang['UPDATING'];
	try	{
		lsXmlHttp=new XMLHttpRequest();
	} catch (e) {
		try	{ lsXmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try { lsXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	lsXmlHttp.onreadystatechange=function() {
		var response;
		if(lsXmlHttp.readyState==4){
			setTimeout(function(){ 
				response = lsXmlHttp.responseText; 
				if(response=='1') div.innerHTML="<br/>"+jwajaxvote_lang['THANKS'];
				else div.innerHTML="<br/>"+jwajaxvote_lang['ALREADY_VOTE'];
			},500);
			setTimeout(function(){ 
				if(response=='1'){
					var oldcount = countdiv.innerHTML || 0;
					var newtotal = parseInt(oldcount)+parseInt(1);
					countdiv.innerHTML= newtotal;
				}
			},2000);
		} 
	} 
	lsXmlHttp.open("GET",live_site+"/mambots/content/plugin_jw_ajaxvote/ajax.php?task=vote_gallery&user_rating="+idcount+"&cid="+id+"&content_type=photo",true);
	//pageTracker._trackPageview(requested_pageurl); 
	
	//added by atul kainth on 04-10-2013
	/*if(typeof(pageTracker)!=undefined && pageTracker!=undefined) {
		pageTracker._trackPageview(requested_pageurl);
	}*/

	/*if(typeof(_gaq)!=undefined && _gaq!=undefined) {
		_gaq.push(['_trackPageview',requested_pageurl]);
	}*/
	
	//New code added by Randhir on 06-01-2015
	requested_pageurl=requested_pageurl.replace(live_site,"");
	
	try {
		
		if(idcount=='downcount')
		var liketype='DISLIKE';
		else
		var liketype='LIKE';
		
    	ga('send', 'event', liketype, 'click',requested_pageurl, 1, {'nonInteraction': 1});
	}
	catch(err) {
		
	}
	//End of new code
	
	lsXmlHttp.send(null);			
} 


function content_jwAjaxVote_video(id,idcount,requested_pageurl){
	var lsXmlHttp;
	var div = document.getElementById('jwajaxvote'+id);
	var countdiv = document.getElementById(idcount);
	
	var spnaMsgClass = document.getElementsByClassName("msg_jwajaxvote");
	var i;
	for (i = 0; i < spnaMsgClass.length; i++) {
    	spnaMsgClass[i].innerHTML = "";
	}
	
	div.innerHTML='<img src="'+live_site+'/mambots/content/plugin_jw_ajaxvote/images/loading.gif" border="0" align="absmiddle" /> '+jwajaxvote_lang['UPDATING'];
	try	{
		lsXmlHttp=new XMLHttpRequest();
	} catch (e) {
		try	{ lsXmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try { lsXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		} 
	}
	lsXmlHttp.onreadystatechange=function() {
		var response;
		if(lsXmlHttp.readyState==4){
			setTimeout(function(){ 
				response = lsXmlHttp.responseText; 
				if(response=='1') div.innerHTML=jwajaxvote_lang['THANKS'];
				else div.innerHTML=jwajaxvote_lang['ALREADY_VOTE'];
			},500);
			setTimeout(function(){
				if(response=='1'){
					var oldcount = countdiv.innerHTML || 0;
					var newtotal = parseInt(oldcount)+parseInt(1);
					countdiv.innerHTML= newtotal;
				}
			},2000);
		}
	}
	lsXmlHttp.open("GET",live_site+"/mambots/content/plugin_jw_ajaxvote/ajax.php?task=vote&user_rating="+idcount+"&cid="+id+"&content_type=video",true);
	//pageTracker._trackPageview(requested_pageurl); 
	//added by atul kainth on 04-10-2013
	/*if(typeof(pageTracker)!=undefined && pageTracker!=undefined) {
		pageTracker._trackPageview(requested_pageurl);
	}*/
	/*if(typeof(_gaq)!=undefined && _gaq!=undefined) {
		_gaq.push(['_trackPageview',requested_pageurl]);
	}*/
	
	//New code added by Randhir on 06-01-2015
	requested_pageurl=requested_pageurl.replace(live_site,"");
	
	try {
		
		if(idcount=='downcount')
		var liketype='DISLIKE';
		else
		var liketype='LIKE';
		
    	ga('send', 'event', liketype, 'click',requested_pageurl, 1, {'nonInteraction': 1});
	}
	catch(err) {
		
	}
	//End of new code
	
	lsXmlHttp.send(null);			
}


function content_jwAjaxVote_comment(id,idcount,requested_pageurl){
	var lsXmlHttp;
	var div = document.getElementById('jwajaxvote'+id);
	var countdiv = document.getElementById(idcount+id);
	
	var spnaMsgClass = document.getElementsByClassName("msg_jwajaxvote");
	var i;
	for (i = 0; i < spnaMsgClass.length; i++) {
    	spnaMsgClass[i].innerHTML = "";
	}
	
	div.innerHTML='<img src="'+live_site+'/mambots/content/plugin_jw_ajaxvote/images/loading.gif" border="0" align="absmiddle" /> '+jwajaxvote_lang['UPDATING'];
	try	{
		lsXmlHttp=new XMLHttpRequest();
	} catch (e) {
		try	{ lsXmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try { lsXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		} 
	}
	lsXmlHttp.onreadystatechange=function() {
		var response;
		if(lsXmlHttp.readyState==4){
			setTimeout(function(){ 
				response = lsXmlHttp.responseText;
				if(response=='1') div.innerHTML=jwajaxvote_lang['THANKS'];
				else div.innerHTML=jwajaxvote_lang['ALREADY_VOTE'];
			},500);
			setTimeout(function(){
				if(response=='1'){
					var oldcount = countdiv.innerHTML || 0;
					var newtotal = parseInt(oldcount)+parseInt(1);
					countdiv.innerHTML= newtotal;
				} 
			},2000);
		}
	}
	lsXmlHttp.open("GET",live_site+"/mambots/content/plugin_jw_ajaxvote/ajax.php?task=vote&user_rating="+idcount+"&cid="+id+"&content_type=comment",true);
	//pageTracker._trackPageview(requested_pageurl); 
	
	//added by atul kainth on 04-10-2013
	/*if(typeof(pageTracker)!=undefined && pageTracker!=undefined) {
		pageTracker._trackPageview(requested_pageurl);
	}*/
	/*if(typeof(_gaq)!=undefined && _gaq!=undefined) {
		_gaq.push(['_trackPageview',requested_pageurl]);
	}*/
	
	//New code added by Randhir on 06-01-2015
	requested_pageurl=requested_pageurl.replace(live_site,"");
	
	try {
		
		if(idcount=='downcount')
		var liketype='DISLIKE';
		else
		var liketype='LIKE';
		
    	ga('send', 'event', liketype, 'click',requested_pageurl, 1, {'nonInteraction': 1});
	}
	catch(err) {
		
	}
	//End of new code
	
	lsXmlHttp.send(null);			
}


function content_jwAjaxVote_general(id,idcount,requested_pageurl,content_type){
	var lsXmlHttp;
	var div = document.getElementById('jwajaxvote'+id);
	var countdiv = document.getElementById(idcount+id);
	
	var spnaMsgClass = document.getElementsByClassName("msg_jwajaxvote");
	var i;
	for (i = 0; i < spnaMsgClass.length; i++) {
    	spnaMsgClass[i].innerHTML = "";
	}
	
	div.innerHTML='<img src="'+live_site+'/mambots/content/plugin_jw_ajaxvote/images/loading.gif" border="0" align="absmiddle" /> '+jwajaxvote_lang['UPDATING'];
	try	{
		lsXmlHttp=new XMLHttpRequest();
	} catch (e) {
		try	{ lsXmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try { lsXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		} 
	}
	lsXmlHttp.onreadystatechange=function() {
		var response;
		if(lsXmlHttp.readyState==4){
			setTimeout(function(){ 
				response = lsXmlHttp.responseText;
				if(response=='1') div.innerHTML=jwajaxvote_lang['THANKS'];
				else div.innerHTML=jwajaxvote_lang['ALREADY_VOTE'];
			},500);
			setTimeout(function(){
				if(response=='1'){
					var oldcount = countdiv.innerHTML || 0;
					var newtotal = parseInt(oldcount)+parseInt(1);
					countdiv.innerHTML= newtotal;
				} 
			},2000);
		}
	}
	lsXmlHttp.open("GET",live_site+"/mambots/content/plugin_jw_ajaxvote/ajax.php?task=vote&user_rating="+idcount+"&cid="+id+"&content_type="+content_type,true);
	//pageTracker._trackPageview(requested_pageurl); 
	
	//added by atul kainth on 04-10-2013
	/*if(typeof(pageTracker)!=undefined && pageTracker!=undefined) {
		pageTracker._trackPageview(requested_pageurl);
	}*/
	/*if(typeof(_gaq)!=undefined && _gaq!=undefined) {
		_gaq.push(['_trackPageview',requested_pageurl]);
	}*/
	
	//New code added by Randhir on 06-01-2015
	requested_pageurl=requested_pageurl.replace(live_site,"");
	
	try {
		
		if(idcount=='downcount')
		var liketype='DISLIKE';
		else
		var liketype='LIKE';
		
    	ga('send', 'event', liketype, 'click',requested_pageurl, 1, {'nonInteraction': 1});
	}
	catch(err) {
		//alert(err);
	}
	//End of new code
	
	lsXmlHttp.send(null);			
}

