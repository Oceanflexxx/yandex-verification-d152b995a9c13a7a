let radius = 240; 
let autoRotate = true;
let rotateSpeed = -60; 
let imgWidth = 140; 
let imgHeight = 205;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");

let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("a");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
function init(delayTime) {
    for (let i = 0; i < aImg.length; i++) {
        aImg[i].style.transform =
        "rotateY(" +
        i * (360 / aImg.length) +
        "deg) translateZ(" +
        radius +
        "px)";
        aImg[i].style.transition = "transform 1s";
        aImg[i].style.transitionDelay =
        delayTime || (aImg.length - i) / 4 + "s";
    }
}
function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
sY,
nX,
nY,
desX = 0,
desY = 0,
tX = 0,
tY = 10;
if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
    )}s infinite linear`;
}
carousel.onpointerdown = function(e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    let sX = e.clientX,
    sY = e.clientY;
    this.onpointermove = function(e) {
        e = e || window.event;
        let nX = e.clientX,
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };
    this.onpointerup = function(e) {
        odrag.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};
var alertRedInput = "#8C1010";
var defaultInput = "rgba(10, 180, 180, 1)";

function userNameValidation(usernameInput) {
    var username = document.getElementById("username");
    var issueArr = [];
    if (/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(usernameInput)) {
        issueArr.push("Без специальных символов!");
    }
    if (issueArr.length > 0) {
        username.setCustomValidity(issueArr);
        username.style.borderColor = alertRedInput;
    } else {
        username.setCustomValidity("");
        username.style.borderColor = defaultInput;
    }
}

function phoneValidation(phoneInput) {
    var phone = document.getElementById("phone");
    var issueArr = [];
    if (!/^.{11}$/.test(phoneInput)) {
        issueArr.push("Номер должен содержать 11 цифр.");
    }
    if (issueArr.length > 0) {
        phone.setCustomValidity(issueArr.join("\n"));
       phone.style.borderColor = alertRedInput;
    } else {
        phone.setCustomValidity("");
        phone.style.borderColor = defaultInput;
    }
}
let open_modal = document.querySelectorAll('.open_modal');
let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];
for (let i = 0; i < open_modal.length; i++) {
    open_modal[i].onclick = function() { 
        modal.classList.add('modal_vis'); 
        modal.classList.remove('bounceOutDown'); 
        body.classList.add('body_block'); 
    };
}
close_modal.onclick = function() { 
    modal.classList.add('bounceOutDown'); 
    window.setTimeout(function() { 
        modal.classList.remove('modal_vis'); 
        body.classList.remove('body_block'); 
    }, 500);
};
const slider = (function(){
  
  //const
  const slider = document.getElementById("slider");
  const sliderContent = document.querySelector(".slider-content");
  const sliderWrapper = document.querySelector(".slider-content-wrapper"); 
  const elements = document.querySelectorAll(".slider-content__item"); 
  const sliderContentControls = createHTMLElement("div", "slider-content__controls");
  let dotsWrapper = null; 
  let prevButton = null; 
  let nextButton = null;
  let leftArrow = null; 
  let rightArrow = null;
  let intervalId = null; 
  
  // data
  const itemsInfo = {
    offset: 0, 
    position: {
      current: 0, 
      min: 0, 
      max: elements.length - 1 
    },
    intervalSpeed: 1500, 

    update: function(value) {
      this.position.current = value;
      this.offset = -value;
    },
    reset: function() {
      this.position.current = 0;
      this.offset = 0;
    }
  };

  const controlsInfo = {
    dotsEnabled: false,
    prevButtonDisabled: true,
    nextButtonDisabled: false,
  };


  function init(props) {
    if (slider && sliderContent && sliderWrapper && elements) {
      if (props) {
        if (props.currentItem) {
          if (parseInt(props.currentItem) >= itemsInfo.position.min && parseInt(props.currentItem) <= itemsInfo.position.max) {
            itemsInfo.position.current = props.currentItem;
            itemsInfo.offset = - props.currentItem; 
          }
        }
        
        if (props.intervalSpeed) itemsInfo.intervalSpeed = props.intervalSpeed;
        if (props.dots) controlsInfo.dotsEnabled = true;  
      }
      
      _createControls(controlsInfo.dotsEnabled);
      _render();    
      _updateControlsInfo();

      if (controlsInfo.autoMode) {
       
      }
    } else {
      console.log("Разметка слайдера задана неверно. Проверьте наличие всех необходимых классов 'slider/slider-content/slider-wrapper/slider-content__item'");
    }
  }

  function _updateControlsInfo() {
    const { current, min, max } = itemsInfo.position;
    controlsInfo.prevButtonDisabled = current <= min;
    controlsInfo.nextButtonDisabled = current >= max;
  }

  function _createControls(dots = false, buttons = false) {
    sliderContent.append(sliderContentControls);
    createArrows();
    buttons ? createButtons() : null;
    dots ? createDots() : null;
    

    function createArrows() {
      const dValueLeftArrow = "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z";
      const dValueRightArrow = "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z";
      const leftArrowSVG = createSVG(dValueLeftArrow);
      const rightArrowSVG = createSVG(dValueRightArrow);
      
      leftArrow = createHTMLElement("div", "prev-arrow");
      leftArrow.append(leftArrowSVG);
      leftArrow.addEventListener("click", () => updateSliderPosition(itemsInfo.position.current - 1))
      
      rightArrow = createHTMLElement("div", "next-arrow");
      rightArrow.append(rightArrowSVG);
      rightArrow.addEventListener("click", () => updateSliderPosition(itemsInfo.position.current + 1))

      sliderContentControls.append(leftArrow, rightArrow);
      

      function createSVG(dValue, color="currentColor") {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 256 512");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", color);
        path.setAttribute("d", dValue);
        svg.appendChild(path);  
        return svg;
      }
    }

    function createDots() {
      dotsWrapper = createHTMLElement("div", "dots");     
      for(let i = 0; i < itemsInfo.position.max + 1; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.addEventListener("click", function() {
          updateSliderPosition(i);
        })
        dotsWrapper.append(dot);    
      }
      sliderContentControls.append(dotsWrapper);  
    }
    

    function createButtons() {
      const controlsWrapper = createHTMLElement("div", "slider-controls");
;
      slider.append(controlsWrapper);
    }
  }

  function setClass(options) {
    if (options) {
      options.forEach(({ element, className, disabled }) => {
        if (element) {
          disabled ? element.classList.add(className) : element.classList.remove(className) 
        } else {
          console.log("Error: function setClass(): element = ", element);
        }
      })
    }
  }
 
  function updateSliderPosition(value) {
    itemsInfo.update(value);
    controlsInfo.autoMode = false
    _slideItem(); 
  }

  function _render() {
    const { prevButtonDisabled, nextButtonDisabled } = controlsInfo;
    let controlsArray = [
      { element: leftArrow, className: "d-none", disabled: prevButtonDisabled },
      { element: rightArrow, className: "d-none", disabled: nextButtonDisabled }
    ];
    if (controlsInfo.buttonsEnabled) {
      controlsArray = [
        ...controlsArray, 
        { element: prevButton, className: "disabled", disabled: prevButtonDisabled },
        { element: nextButton, className: "disabled", disabled: nextButtonDisabled }
      ];
    }
    
    setClass(controlsArray);

    // Передвигаем слайдер
    sliderWrapper.style.transform = `translateX(${itemsInfo.offset * 100}%)`; 
    
    if (controlsInfo.dotsEnabled) {
      if (document.querySelector(".dot--active")) {
        document.querySelector(".dot--active").classList.remove("dot--active"); 
      }
      dotsWrapper.children[itemsInfo.position.current].classList.add("dot--active");
    }
  }

  function _slideItem() {
    if (!controlsInfo.autoMode && intervalId) {
      _stopAutoMode()
    }
    _updateControlsInfo();
    _render();
  }

  function createHTMLElement(tagName="div", className, innerHTML) {
    const element = document.createElement(tagName);
    element.className = className || null;
    element.innerHTML = innerHTML || null;
    return element;
  }
  return { init };
}())

slider.init({
  buttons: true,
  dots: true,
  autoMode: true
});
