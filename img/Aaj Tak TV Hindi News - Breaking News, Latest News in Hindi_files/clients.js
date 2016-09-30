SI_CRI.commonToLoadData = function (isLorRorF, data, i){
	function teamNames(teamAId, teamBId, seriesId) {
		if (SI_CRI.config.customshortnames && SI_CRI.config.customshortnames[seriesId] && teamAId && teamBId) {
			var teams = SI_CRI[SI_CRI.config.customshortnames[seriesId]];
			var teamA = "", teamB = "";
			if (teamAId != "")
				teamA = teams[teamAId].Name_Short;
			if (teamBId != "")
				teamB = teams[teamBId].Name_Short;
			return { 'teamA': teamA, 'teamB': teamB };
		}
		return false;
	}

	function dateString(myDate) {
		myDate = new Date(myDate);
		var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][myDate.getMonth()];
		var str = month + ' ' + myDate.getDate();
		return str;
	}

	var live = data.matches[i].hasOwnProperty("live"),
	matchStatus = data.matches[i].hasOwnProperty("matchstatus"),
	matchResult = data.matches[i].hasOwnProperty("matchresult");
	var appendStr = "";
	var seriesid = data.matches[i]["series_Id"];
	var match = data.matches[i]["matchnumber"];
	var teamA = data.matches[i]["teama_short"];
	var teamB = data.matches[i]["teamb_short"];
	var teamAId = data.matches[i]["teama_Id"];
	var teamBId = data.matches[i]["teamb_Id"];

	var match_Id = data.matches[i]["match_Id"]
	var priority = data.matches[i]["priority"]
	var seriesname = data.matches[i]["seriesname"];
	var localDate = dateString(data.matches[i]["matchdate_local"]);
	var teamNa = teamNames(teamAId, teamBId, seriesid);
	var teamAimg = SI_CRI.config.basepath.teamicons+teamAId+'.png';
	var teamBimg = SI_CRI.config.basepath.teamicons+teamBId+'.png';
	if (teamNa) {
		if (teamNa.teamA != "")
			teamA = teamNa.teamA;
		if (teamNa.teamB != "")
			teamB = teamNa.teamB;
	}
	var file = data.matches[i]["matchfile"];

	if (isLorRorF.toLowerCase() == "live") {
		var gmttime = data.matches[i]["matchtime_gmt"];
		var result = data.matches[i]["venue"]; //Live
			
		var inn1_score = data.matches[i]["inn_score_1"];
		var inn2_score = data.matches[i]["inn_score_2"];
		var inn3_score = data.matches[i]["inn_score_3"];
		var inn4_score = data.matches[i]["inn_score_4"];	

		var inn_team_1 = data.matches[i]["inn_team_1"];
		var inn_team_2 = data.matches[i]["inn_team_2"];
		var inn_team_3 = data.matches[i]["inn_team_3"];
		var inn_team_4 = data.matches[i]["inn_team_4"];		


		inn1_score = inn1_score;//.replace('ov', 'overs');
		inn2_score = inn2_score;//.replace('ov', 'overs');
		if(inn3_score) inn3_score = inn3_score;//.replace('ov', 'overs');
		if(inn4_score) inn4_score = inn4_score;//.replace('ov', 'overs');

		var teama_score = '', teamb_score = '';
		if(inn_team_1) {
			if(inn_team_1 ==  teamAId) {
				teama_score = inn1_score
			} else {
				teamb_score = inn1_score
			}
		}

		if(inn_team_2) {
			if(inn_team_2 ==  teamAId) {
				teama_score = inn2_score
			} else {
				teamb_score = inn2_score
			}
		}
		//console.log(inn_team_3+"--"+teamAId)
		//console.log(inn_team_4+"--"+teamBId)
		if(inn_team_3) {
			if(inn_team_3 ==  teamAId ) {
				teama_score = inn3_score +' & '+ inn1_score;
				//teama_score = inn3_score +' & '+ teama_score;
			} else {
				teamb_score = inn3_score +' & '+ inn2_score;
				//teamb_score = inn3_score +' & '+ teamb_score;
			}
		}

		if(inn_team_4) { 
			if(inn_team_4 ==  teamAId) {
				//teama_score = inn4_score +' & '+ teama_score;
				teama_score = inn4_score +' & '+ inn1_score;
			} else {
				//teamb_score = inn4_score +' & '+ teamb_score;
				teamb_score = inn4_score +' & '+ inn2_score;
			}
		}

		appendStr = '<div id="'+ match_Id +'" class="si-csTbCntRow" priority="'+priority+'"><div class="si-csRLft"><div class="si-csMid"><div class="si-teama"><span><img height="12" src="'+teamAimg+'"></span><span>'+teamA+'</span><span class="si-teama-score" id="'+ teamA.replace(' ', '').toLowerCase() +'"> '+ teama_score +'</span></div><div class="si-teamb"><span><img height="12" src="'+teamBimg+'" alt=""></span> <span>'+teamB+'</span><span class="si-teamb-score" id="'+ teamB.replace(' ', '').toLowerCase() +'"> '+ teamb_score +'</span></div></div></div><div class="si-csRRgtt si-nowhitebg"><span><div sportzmid="'+data.matches[i]['match_Id']+'" matchid="' + file + '" class="si-OtherCommBtn">scorecard</div></span><br></div><div class="si-clr"></div></div>';
	}
	else if (isLorRorF.toLowerCase() == "recent") {
		var result = data.matches[i]["matchresult"]; //Recent
		//priority=i;
		//priority="'+priority+'"
		appendStr = '<div class="si-csTbCntRow"><div class="si-csRLft"><div class="si-csMid"><div><span><img height="12" src="'+teamAimg+'"></span><span>'+teamA+'</span></div><div class="si-csVs">V</div><div><span><img height="12" src="'+teamBimg+'" alt=""></span> <span>'+teamB+'</span></div></div><div class="si-csBot">' + result + '</div></div><div class="si-csRRgtt si-nowhitebg"><span><div sportzmid="'+data.matches[i]['match_Id']+'" matchid="' + file + '" class="si-OtherCommBtn">scorecard</div></span><br></div><div class="si-clr"></div></div>';
	}
	else {
		var localtime = data.matches[i]["matchtime_local"];
		var gmttime = data.matches[i]["matchtime_gmt"];
		var gmtdate = data.matches[i]["matchdate_gmt"];
		var venue = data.matches[i]["venue"];
		var offset = data.matches[i]["gmt_offset"];
		var localdate = data.matches[i]["matchdate_local"];
		
		 
		 var x = SI_CRI.Convert2UserTZ(localtime, localdate, offset);
		 var y = x.usertime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		 y = y.replace(/.*(\d{2}:\d{2}:\d{0}).*/, "$1");
		if (matchStatus && data.matches[i].matchstatus != '') {
			reloaded = true;
			var result = data.matches[i]["venue"];
			appendStr = '<div class="si-csTbCntRow"><div class="si-csRLft"><div class="si-csMid"><div><span><img height="12" src="'+teamAimg+'"></span><span>'+teamA+'</span></div><div class="si-csVs">V</div><div><span><img height="12" src="'+teamBimg+'" alt=""></span> <span>'+teamB+'</span></div></div></div><div class="si-csRRgtt si-nowhitebg"><span><div sportzmid="'+data.matches[i]['match_Id']+'" matchid="' + file + '" class="si-OtherCommBtn">scorecard</div></span><br></div><div class="si-clr"></div></div>';
		} else {
			reloaded = true;
			//by gaurang
			if(!teamAId && teamBId) appendStr = '<div class="si-csTbCntRow"><div class="si-csRLft"><div class="si-csMid"><div><span>'+teamA+'</span></div><div class="si-csVs">V</div><div><span><img height="12" src="'+teamBimg+'" alt=""></span> <span>'+teamB+'</span></div></div></div><div class="si-csRRgtt"><span>'+localDate+'</span><br><span>'+y.substring(0, y.length - 1)+' '+SI_CRI.config.timeformat.tzext+'</span></div><div class="si-clr"></div></div>';
			else if(!teamBId && teamAId) appendStr = '<div class="si-csTbCntRow"><div class="si-csRLft"><div class="si-csMid"><div><span><img height="12" src="'+teamAimg+'"></span><span>'+teamA+'</span></div><div class="si-csVs">V</div><div><span>'+teamB+'</span></div></div></div><div class="si-csRRgtt"><span>'+localDate+'</span><br><span>'+y.substring(0, y.length - 1)+' '+SI_CRI.config.timeformat.tzext+'</span></div><div class="si-clr"></div></div>';
			else if(!teamAId && !teamBId) appendStr = '<div class="si-csTbCntRow"><div class="si-csRLft"><div class="si-csMid"><div><span>'+teamA+'</span></div><div class="si-csVs">V</div><div><span>'+teamB+'</span></div></div></div><div class="si-csRRgtt"><span>'+localDate+'</span><br><span>'+y.substring(0, y.length - 1)+' '+SI_CRI.config.timeformat.tzext+'</span></div><div class="si-clr"></div></div>';
			else appendStr = '<div class="si-csTbCntRow"><div class="si-csRLft"><div class="si-csMid"><div><span><img height="12" src="'+teamAimg+'"></span><span>'+teamA+'</span></div><div class="si-csVs">V</div><div><span><img height="12" src="'+teamBimg+'" alt=""></span> <span>'+teamB+'</span></div></div></div><div class="si-csRRgtt"><span>'+localDate+'</span><br><span>'+y.substring(0, y.length - 1)+' '+SI_CRI.config.timeformat.tzext+'</span></div><div class="si-clr"></div></div>';
		}
	}
	return appendStr;
};