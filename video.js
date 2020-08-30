var myPlayer = plyer;
myPlayer.src({type: 'video/mp4', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'});


var resumeTime=0
var resumeVolume=5

if(JSON.parse(localStorage.getItem('currentTime'))!==undefined){
  resumeTime=Number(JSON.parse(localStorage.getItem('currentTime')))
}
if(JSON.parse(localStorage.getItem('currentVolume'))!==undefined){
  resumeVolume=Number(JSON.parse(localStorage.getItem('currentVolume') ))  
}

//Function which gets video title for startover,resume menu
function getVideoTitle(){
  
  try{

    let videoTitle=myPlayer.currentSrc();
    let curType=myPlayer.currentType();
    let minRegExp=/[^(video)\/].*$/i;
    const regex = new RegExp(`(\/[^/]*\.${curType.match(minRegExp)[0]})$`);
    // let regExp=/(\/[^/]*\.myPlayer.currentType())$/;
    if (videoTitle.match(regex)){
      return videoTitle.match(regex)[0].slice(1).charAt(0).toUpperCase()+videoTitle.match(regex)[0].slice(2);
    }
    else{
      return videoTitle.charAt(0).toUpperCase()+videoTitle.match(regex)[0].slice(1);
    }
  }
  catch(error){
    console.log(error)
    return 'Video'
  }
}

myPlayer.ready(function() {
  
   

  
  if(JSON.parse(localStorage.getItem('currentTime'))){
    bootbox.confirm({
      title: `${getVideoTitle()}`,
      message: "Do you wish to resume from where you stopped",
      buttons: {
          cancel: {
              label: '<i class="fa fa-repeat"></i> Start Over'
          },
          confirm: {
            
            label: '<i class="fa fa-check"></i> Resume'
          }
      },
      callback: function (result) {
          if (result){
            myPlayer.play()
            myPlayer.currentTime(resumeTime)
         
            
          }
          else{
            myPlayer.play();
           
          }
      
      }
    }); 
    myPlayer.volume(resumeVolume/10);
    
  }
  this.on('timeupdate',function(){
    let whereYouAt = myPlayer.currentTime();
    if(whereYouAt!==0){
      localStorage.setItem('currentTime',JSON.stringify(Math.floor(whereYouAt)))
    }
  });
  this.on('volumechange',function(){
    let currentVolume = myPlayer.volume();
    if(currentVolume!==1){
      localStorage.setItem('currentVolume',JSON.stringify(Math.floor(currentVolume*10)))
    }
  });
});

// document.getElementsByClassName("actionButton")[0].addEventListener('blur',function(){alert("me")})
