function show_indiatoday_widget(type){
   switch(type){
      case 1:
              var height=122;
              var width=300;
              var border=0;
              var code='<iframe name="indiatoday_widget" scrolling="no" style="border-right:1px solid #e7e7e7"  noresize="noresize" frameborder="'+border+'" width="'+width+'" height="'+height+'" src="http://indiatoday.intoday.in/rss/latest-news-from-indiatoday.jsp"></iframe>'
              document.write(code);
              break; 
    } 
   
}