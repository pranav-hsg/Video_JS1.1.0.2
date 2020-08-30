
var instanceOfVideojs=videojs("my-video",{playbackRates:[0.25,.5,.75,1,1.5,2]});

// PlaybackRateMenuItem(instanceOfVideojs,[.5,1,1.5,2] )
instanceOfVideojs.addMenu({
    player:instanceOfVideojs,
    action1:'action1()',
    action2:'action2()',
    action3:'action3()',
    nameOfButton1:"Record",
    nameOfButton2:"Attach PDF",
    nameOfButton3:"Take Note"

}
);
//Show Custom alert
var alrt=document.createElement("div");
alrt.id="alertBox";
document.getElementsByTagName("body")[0].appendChild(alrt);

function alertShow(title,description,color="success"){
    setTimeout(function(){document.getElementById("alertBox").innerHTML
    =``  }, 2000);
    document.getElementById("alertBox").innerHTML
    =`
    <div id="alrt"class="alert ${'alert-'+color} alert-dismissible fade show" role="alert">
    <strong>${title}</strong> ${description}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
   
}

//Add Note function
function onAddNoteBtnClick(){
 let note=document.getElementById("NoteTextArea1").value;
 let noteDict={};
 if(JSON.parse(localStorage.getItem("Note"))){
    noteDict=JSON.parse(localStorage.getItem("Note"));
 }
//  console.log(note,typeof(note))

 if(note===''){
     console.log("Note is empty");
     alertShow("Cannot Add Notes","Text area is empty","danger")

 }
 else{
    noteDict[Math.floor(instanceOfVideojs.currentTime())]=note;
    localStorage.setItem('Note',JSON.stringify(noteDict));
    document.getElementById("NoteTextArea1").value='';
    alertShow("Notes added","Notes added successfully","success")
    document.getElementById('note').style.display='none';
    instanceOfVideojs.play();
    instanceOfVideojs.controls(true);


 }
}
function onCancelBtnClick(){
    
    document.getElementById(`note`).style.display='none';
    
    instanceOfVideojs.play();
    instanceOfVideojs.controls(true);

}
function onCancelBtn(){
    document.getElementById(`drop-area`).style.display='none';    
    instanceOfVideojs.play();
    instanceOfVideojs.controls(true);
    
}

//Action1
function toggleclass(){
    if(document.querySelector("#recordContainer #recrdButton #recordStartIcon")){   
      document.getElementById("recrdButton").innerHTML='<i class="far fa-stop-circle"  id="recordStopIcon"></i>' 
      startRecord();
  }
  else if(document.querySelector("#recordContainer #recrdButton #recordStopIcon")){
          document.getElementById("recrdButton").innerHTML='<i class="fas fa-record-vinyl" onclick="startRecord()" id="recordStartIcon"></i>'
          document.getElementById("recrdButton").innerHTML='<i class="fas fa-microphone-alt"  id="recordStartIcon"></i>'            
          console.log(document.getElementById("recrdButton").onclick);   
          stopRecord();                
  }
}
function showTimer(min,sec){
  if (min<10){
      min="0"+String(min); 
  }
  if (sec<10){
      sec='0'+String(sec);
  }
  document.getElementById('recTim').innerText=min+':'+sec;
}

function startTimer(){
  let sec=0;
  let min=0;

  showTimer(min,sec)
  timer1=setInterval((e) => {
      sec=sec+1;
      if (sec===60){
          min=min+1;
          sec=0;
      }
      try{
          if(min>10){
              throw("Too much of audio size recorded")
          }
      }
      catch(err){
          console.log(err)
      }
      showTimer(min,sec)
  }, 1000);
}
function stopTimer(){
  clearInterval(timer1);
  document.getElementById('recTim').innerText="00:00"
}

function displayAudioInList(audioUrls){
  document.getElementById('displayRecordedAudio').innerHTML=''
  audioUrls.forEach(element => {
      document.getElementById('displayRecordedAudio').innerHTML+=`<audio controls > <source src="${element}" type="audio/mp3"></audio>`
  });
}

navigator.mediaDevices.getUserMedia({ audio: true }).then(function (mediaStreamObj){
  let mediaRecorder = new MediaRecorder(mediaStreamObj);  
  let audioUrls=[];
  mdGlobal=mediaRecorder
  let dataArray = []; 
  mdGlobal.ondataavailable = function (ev) { 
      dataArray.push(ev.data); 
      console.log(dataArray)
  } 
  mdGlobal.onstop = function (ev) { 
  
      // blob of type mp3 
      
      let audioData = new Blob(dataArray,  { 'type': 'audio/mp3;' }); 
      dataArray = [];
      let audioSrc = window.URL.createObjectURL(audioData);   
      audioUrls.push(audioSrc)
      displayAudioInList(audioUrls)
      //  <audio id="adioPlay" controls></audio> 
  }    
  
})
   

// console.log(mediaRecorder)


function startRecord(){
  document.getElementById('recTxt').innerHTML="Recording"
  document.getElementById('recTim').style.display="block"
  mdGlobal.start()
  startTimer()
}
function stopRecord(){
  document.getElementById('recTxt').innerHTML="Record"
  document.getElementById('recTim').style.display="none"
  
  mdGlobal.stop()
  stopTimer()
}
//act1 complete





function action1(){
  instanceOfVideojs.pause();
  instanceOfVideojs.controls(false);
  document.getElementsByClassName('recordWrapper')[0].style.display='block'
  document.getElementById('recrdButton').innerHTML='<i id="recordStartIcon"  class="fas fa-microphone-alt"></i>'   
  document.getElementById("recrdButton").addEventListener('click',toggleclass)
    
}
function closeRecDisp(){
  document.getElementsByClassName('recordWrapper')[0].style.display='none'
  instanceOfVideojs.play();
  instanceOfVideojs.controls(true);
}
function action2(){
    // dragAndDrop()
    document.getElementById("drop-area").style.display="block";
     instanceOfVideojs.pause();
     instanceOfVideojs.controls(false);
    // document.getElementsByClassName('DropBoxBtn')[0].addEventListener('click',onCancelBtn)

}



function initializeActions(){
    let note = document.createElement("div");
    note.id = 'note';
    note.innerHTML =`
    <h4>Notes</h4>
        <textarea
        class="form-control"
        id="NoteTextArea1"
        rows="4"
        ></textarea>
        <p class="card-text">
        Write something,don't worry i'll remind for you
        </p>
        <button class="btn btn-primary" id="addNoteBtn1"><i class="fa fa-plus noteIcons" aria-hidden="true"></i>Add Notes</button>
        <button class="btn btn-primary" id="cancel"><i class="fa fa-times noteIcons" aria-hidden="true"></i>
        Close</button>
        `
    note.style.display="none"
    document.getElementById('my-video').appendChild(note)

    let dragndrophtml=document.createElement("div");
    dragndrophtml.id='drop-area';
    dragndrophtml.innerHTML=`
    <button class="DropBoxBtn" onclick='onCancelBtn()'>Close<i class="fas fa-times clsDrpBtn"></i></button>
    <p class="dropPara">Drag and drop your Photos/PDF</p>
    
    <form class="my-form">
    
    <input type="file" id="fileField" multiple accept=".pdf,.doc,.docx,image/*" onchange="handleFiles(this.files)">
    <label class="button DropBoxBtn" for="fileField"><i class="fas fa-file-upload"></i> Choose File(s)</label>
    <progress id="progress-bar" max=100 ></progress><span  id='percentDisp'>0%</span>

    </form>
    <div id='drop-area-inner'>
       <p id='dropText'>Drop Here</p>
    </div>
    <div id="gallery"></div>
    
    `
    document.getElementById('my-video').appendChild(dragndrophtml);
    dragndrophtml.style.display="none";
    document.getElementById('progress-bar').value=0
    document.getElementById('percentDisp').innerHTML='0%'


    let recWrap=document.createElement("div");
    recWrap.className='recordWrapper';
    recWrap.innerHTML=`
    <button
    onclick="closeRecDisp()"  id='recClose'><i class="fas fa-times clsDrpBtn"></i>Close</button>
     <div class="recordText">
    <h3 id="recTxt">Record</h3>
   
    <p id="recTim">00:00</p>
    
    
    </div>
    <div class="recordContainerWrapper">
    <div id="recordContainer">
        
        <div id="recrdButton"></div>
    </div>
    <hr>
        <div id="displayRecordedAudio">

        </div>
    </div>`
    document.getElementById('my-video').appendChild(recWrap);
    recWrap.style.display="none";
   
}
initializeActions();

    function preventDefaultBehaviour (e) {
        e.preventDefault()
        e.stopPropagation()
      }
    let dropArea=document.getElementById('drop-area-inner');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        dropArea.addEventListener(event, preventDefaultBehaviour)
      });
      
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName,applyBorderStyle, false)
      });
      
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, removeBorderStyle, false)
      });
      
    function applyBorderStyle(e) {
        dropArea.classList.add('borderStyle')
    }
      
    function removeBorderStyle(e) {
        dropArea.classList.remove('borderStyle')
    }
    dropArea.addEventListener('drop', handleDrop, false)

    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files
      
        handleFiles(files)
    }
    
    function handleFiles(files) {
        files = [...files]
        initializeProgress(files.length)
        files.forEach(uploadFile)
        files.forEach(previewFile)
    }
    function uploadFile(file, i) { 
  var url = 'C:/Users/Pranav/Documents/visualcode/Video Player Project/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)

 
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alertShow(`Success ${xhr.readyState}`,"Uplaoded successfully")
      
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      alertShow(`${'Error Code: '+xhr.status}`,`Can't upload Some Error Occured `,"danger")
    }
  })

  formData.append('file', file)
  console.log(formData,file,i)
  xhr.send(formData)
}
      function previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
          let imgCover = document.createElement('div');
          imgCover.id='imgCover'
          let img = document.createElement('img')
          let fileName=
          (file['name'].length)>20?file['name'].slice(0,8)+'....'+file['name'].substr(file['name'].length - 5):file['name'];
          console.log(reader.result,typeof(reader.result))
          let reg=/^(data:image)/;
          img.src =reg.test(reader.result) ?reader.result:'document.png';
          imgCover.innerHTML=img.outerHTML+`<p>${fileName}</p>`
          document.getElementById('gallery').appendChild(imgCover);
        }
      }
      
        let progressBar = document.getElementById('progress-bar')
        
        function initializeProgress(numFiles) {
            progressBar.value = 0
            document.getElementById('percentDisp').innerHTML='0%'
            uploadProgress = []
            
            for(let i = numFiles; i > 0; i--) {
              uploadProgress.push(0)
            }
            
          }
          
          function updateProgress(fileNumber, percent) {
            uploadProgress[fileNumber] = percent
            let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
            progressBar.value = total
            document.getElementById('percentDisp').innerHTML=`${Math.floor(total)}`+'%';
          }        



function action3(){
    // alertShow("Take Notes","Has been Performed")
     note.style.display="block"
     document.getElementById('addNoteBtn1').addEventListener('click',onAddNoteBtnClick)
     document.getElementById('cancel').addEventListener('click',onCancelBtnClick)
     instanceOfVideojs.pause();
     instanceOfVideojs.controls(false);

}   