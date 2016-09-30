function AkamaiJWPlugin(playerInstance)
{
	var VERSION = "1.0.1";
	var akaPlugin;
	var isPlayStarted = false;
	var pluginObj = this;
	var isSessionInitiated = false;
	var isFQ = false;var isMP = false;var isTQ = false;
    this.loadMediaAnalytics = function()
    {
        try
        {
			createLibraryInstance();
			
			playerInstance.onBeforePlay(function(e){
				if(!isSessionInitiated){
					setCustomData();
					akaPlugin.handleSessionInit();//Must be called only when initiating a new play.
					isSessionInitiated = true;
					isPlayStarted = false;
				}
            });
			
            playerInstance.onPlay(function(){
				if(!isPlayStarted){
					pluginObj.setBitrateIndex(playerInstance.getCurrentQuality());
				}
				isPlayStarted = true;
				akaPlugin.handlePlaying();
            });
            playerInstance.onPause(function(){
                akaPlugin.handlePause();
            });
            playerInstance.onBuffer(function(){
				akaPlugin.handleBufferStart();
            });
            playerInstance.onComplete(function(){
				akaPlugin.handlePlayEnd("JWPlayer.Complete");
				isSessionInitiated = false;
				isPlayStarted = false;
            });
            playerInstance.onError(function(e){
                akaPlugin.handleError("JWPlayer.Error:"+e.message);
				isSessionInitiated = false;
				isPlayStarted = false;
            });
			playerInstance.onSetupError(function(e){
                akaPlugin.handleError("JWPlayer.SetupError:"+e.message);
				isSessionInitiated = false;
				isPlayStarted = false;
            });
			
			playerInstance.onQualityChange(function(e){
				pluginObj.setBitrateIndex(e.currentQuality);
            });
			

			playerInstance.onAdImpression(function(e){//JWPlayer provides only one event when Ad starts.
				isFQ = false;isMP = false;isTQ = false;
				akaPlugin.handleAdLoaded({adTitle:e.tag});//Need to send more Ad related custom dimensions.
				akaPlugin.handleAdStarted();
            });

			playerInstance.onAdTime(function(e){
				try{
					if(e.duration > 0){
						var adPlayPercent = e.position / e.duration;
						if(!isFQ && adPlayPercent >= 0.25 && adPlayPercent < 0.5){
							akaPlugin.handleAdFirstQuartile();
							isFQ = true;
						}else if(!isMP && adPlayPercent >= 0.5 && adPlayPercent < 0.75){
							akaPlugin.handleAdMidPoint();
							isMP = true;
						}else if(!isTQ && adPlayPercent >= 0.75){
							akaPlugin.handleAdThirdQuartile();
							isTQ = true;
						}
					}
	    		}catch(e){}
			});
			
			playerInstance.onAdComplete(function(e){
				akaPlugin.handleAdComplete();
            });
			playerInstance.onAdError(function(e){
				akaPlugin.handleAdError();
            });
        }
        catch(e){
        }
    }
	
	this.setData = function(name, value){
		if(akaPlugin){
			akaPlugin.setData(name, value);
		}
	}
	
	this.setBitrateIndex = function(bitrateIndex){
		//console.log("setBitrateIndex:"+bitrateIndex);
		try{
		var qualityObj = playerInstance.getQualityLevels()[bitrateIndex];
		var bitrate = parseInt(qualityObj.bitrate);
		if(bitrate < 50000){
			bitrate = bitrate*1000;//Converting kbps to bps
		}
		if(isNaN(bitrate) || !(bitrate>0)){
			if(qualityObj.label && qualityObj.label.toLowerCase().indexOf("kbps") > 0){
				bitrate = parseInt(qualityObj.label)*1000;
			}
		}
		if(bitrate > 0){
			this.setBitrate(bitrate);
		}
		}catch(e){}
	}
	
	//Set bitrate in bps
	this.setBitrate = function(bitrate){
		if(akaPlugin){
			//console.log("setBitrate:"+bitrate);
			akaPlugin.handleBitRateSwitch(bitrate);
		}
	}
	
	function createLibraryInstance(){
		var akaPluginCallBack = {};
		akaPluginCallBack["streamHeadPosition"] = getStreamHeadPosition;
		akaPluginCallBack["streamLength"] = getStreamLength;
		akaPluginCallBack["streamURL"] = getStreamURL;
		akaPlugin = new AkaHTML5MediaAnalytics(akaPluginCallBack);
		akaPlugin.setData("std:playerType", playerInstance.getRenderingMode()+"-html5");//Setting playerType for debugging purposes.
	}
    
    function getStreamHeadPosition()
    {
        return playerInstance.getPosition();
    } 
	function getStreamLength(){
		return playerInstance.getDuration();
	}
	function getStreamURL(){
		var itemIndex = playerInstance.getPlaylistIndex();
		var item = playerInstance.getPlaylistItem(itemIndex);
		return item.file;
	}
	function setCustomData(){
		try{
			if(playerInstance.getPlaylist() && playerInstance.getPlaylistIndex() > -1){
				var playItem = playerInstance.getPlaylist()[playerInstance.getPlaylistIndex()];
				akaPlugin.setData("title", playItem.title);
				var sources = playItem.sources;
				if(sources && sources.length > -1){
					akaPlugin.setData("std:format", sources[0].type);
				}
			}
		}catch(e){
			console.log(e);
		}
	}
	this.loadMediaAnalytics();
}
