function submitbutton1(id) {
			var form 		= document.pollxtd;			
			var radio		= form.voteid;
			var radioLength = radio.length;
			var check 		= 0;
			if ( id != 'z' ) {
				alert("आप पहले ही इसके लिए मतदान कर चुके हैं.");
				return;
			}
			for(var i = 0; i < radioLength; i++) {
				if(radio[i].checked) {
					form.submit();
					check = 1;					
				}
			}		
			if (check == 0) {
				alert("चयन नहीं किया गया है. कृपया पुन: प्रयास करें.");
			}
		}		