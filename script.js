"strict mode"

// DarkMode:
const darkMode_highlight = '#66FF00'
const darktMode_textColor = "black";


// Light Mode:
const lightMode_background_image = "url(https://cdn.pixabay.com/photo/2016/10/25/18/14/audio-1769600_1280.png)";
const lightMode_highlight = "#4D4DFF"
const lightMode_textColor = "#4D4DFF";



//Declaring the required constants::



let drumIcons = document.querySelectorAll(".drum-icons");
let autoPlay = document.getElementById("autoplay");
let volSlider = document.getElementById('vol');
const themeChanger = document.getElementById('themeChanger');

let audio_vol_changer = 0.5;

//changing the theme::

function change_theme(theme){
    let root = document.documentElement; //accessing the root element of our css by "documentElement"
    if (theme === 'theme1'){
        themeChanger.innerHTML = "Light Mode";
        document.body.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2017/08/06/22/29/electric-2597045__480.jpg)"
        root.style.setProperty(' --backgroundImage', lightMode_background_image);
        root.style.setProperty('--highlighter', lightMode_highlight);
        root.style.setProperty('--textColor', lightMode_textColor); //"setProperty" is a method used to set certain properties
    }else{
        themeChanger.innerHTML = "Dark Mode";
        document.body.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2016/03/31/20/18/drum-1295665_1280.png)";
        root.style.setProperty('--highlighter', darkMode_highlight);
        root.style.setProperty('--textColor', darktMode_textColor);
    }
    
}

let currentTheme = "theme1";
themeChanger.addEventListener('click', function(e){
    if (currentTheme === "theme1"){
        change_theme("theme2");
        currentTheme = "theme2";
    }else{
        change_theme('theme1');
        currentTheme = "theme1";
    }                            
});

//Volume slider
volSlider.oninput =  function(event){
    audio_vol_changer = event.target.value/100
}

//for autoplay of drum sound
let auto_Play_Id;
let autoPlayOn = false;
function startAutoPlay(){
    let arr = ["w", "a", "s", "d", "j", "k", "l"];

    auto_Play_Id = setInterval(function (){
        let arrInd = arr[Math.floor(Math.random()*(arr.length))];
        makeAnimation(arrInd);
        playSound(arrInd);
    },120)

}


autoPlay.addEventListener('click', () => {
    if (autoPlayOn){
        clearInterval(auto_Play_Id);
        autoPlayOn = false;
        autoPlay.innerHTML = "Start AutoPlay";
        autoPlay.style.color = "green";
    }else{
        startAutoPlay();
        autoPlayOn = true;
        autoPlay.innerHTML = "Stop AutoPlay";
        autoPlay.style.color = "red";
    }

})
//--------------------------------autoplay ends here-----------------------------------------------------------------------------------


function makeSound(path){  //to take the passed file as audio path
    let audio = new Audio(path); 
    audio.volume = audio_vol_changer;
    audio.play();
};

document.addEventListener('keypress', function(event){
    const clickedKey = event.key;
    makeAnimation(clickedKey);
    playSound(clickedKey);
})

function playSound(key){
    switch(key){  //the key which will be pressed
        case "w":
            makeSound("sounds/Sound-1.mp3");
            break;
        case "a":
            makeSound("sounds/Sound-2.mp3");
            break;
        case "s":
            makeSound("sounds/Sound-3.mp3");
            break;
        case "d":
            makeSound("sounds/Sound-4.mp3");
            break;
        case "j":
            makeSound("sounds/Sound-5.mp3");
            break;
        case "k":
            makeSound("sounds/Sound-6.mp3");
            break;
        case "l":
            makeSound("sounds/Sound-7.mp3");
            break;
        default:
            alert("Enter a valid Key");
    }
};

function makeAnimation(key){
    const pressedKey = document.querySelector(`.${key}`);
    pressedKey.classList.add('animation');
    
    
    setInterval(function (){
        pressedKey.classList.remove('animation');
    }, 250)
};

function operateDrumIcons(event){
    var innerHtml = event.target.innerHTML;
    console.log(innerHtml)
    makeAnimation(innerHtml);
    playSound(innerHtml);
};


for (let i = 0; i < drumIcons.length; i++){
    drumIcons[i].addEventListener('click', operateDrumIcons);
}