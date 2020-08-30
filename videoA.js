var plyer;
function addMenu (option){
    var player  = option.player;
    plyer=player;
    player.ready(function(){
    //toggle menu
    function toggleMenuDiv() {
        let x = document.getElementById("menu01");
        if (x.style.display === "none") {
        x.style.display = "block";
        } else {
        x.style.display = "none";
        }
    }
    function onUnfocus(){
        let y = document.getElementById("menu01");
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        
    }
    var Button = videojs.getComponent('Button');
    var MyButton = videojs.extend(Button, {
        constructor: function() {
        Button.apply(this, arguments);
        this.addClass('fa');
        this.addClass('fa-dedent');
        },
        handleClick: function() {
            toggleMenuDiv();
        },
        handleKeyDown:function(e){
            console.log("Hmm",e)
        }

    });
    videojs.registerComponent('MyButton', MyButton);   
    player.getChild('controlBar').addChild('myButton');
    //Creating Menu
    var elem = document.createElement("div");
    elem.id = 'menu01';
    elem.tabIndex="1";
    // elem.contentEditable=true;
    elem.innerHTML = ` <button
    tabindex="1" 
    class="actionButton" onclick="${option.action1}" ><i class="fas fa-microphone"></i>${option.nameOfButton1} </button>
    <button 
    tabindex="2" class="actionButton" onclick="${option.action2}"><i class="fas fa-file-pdf"></i> ${option.nameOfButton2}</button> 
    <button
    tabindex="3"  class="actionButton " onclick="${option.action3}"> <i class="fas fa-pen"></i>   ${option.nameOfButton3} </button>`
    document.getElementsByClassName('vjs-control-bar')[0].appendChild(elem)
    document.getElementById("menu01").style.display = "none";
    var menuButton=document.getElementsByClassName("vjs-control vjs-button fa  fa-dedent")[0]
    // document.getElementById('menu01').addEventListener('blur',function(){console.log("me")})
    // getElementsByClassName("vjs-control vjs-button fa  fa-dedent")[0].tabindex="2"
    // when blur event occurs 
    // document.getElementsByClassName("menuButton")[0]

    menuButton.addEventListener('blur',function(){
        setTimeout(function(){ onUnfocus(); }, 280);       
    })
    // menuButton.addEventListener('blur',function(){
    //     setTimeout(function(){ onUnfocus(); }, 280);       
    // })
        
    // document.getElementsByClassName("vjs-playback-rate")[0].addEventListener('click',function(){
    //     document.getElementsByClassName("vjs-playback-rate")[0].hide()
    // }) 
    })
}
//Registering Plug-in
videojs.registerPlugin('addMenu',addMenu );
