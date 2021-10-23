/*****
  This library has not yet been published
  and is under construction (by wwwAlireza) 
 *****/
document.body.innerHTML += `<div class="wowAlert-container">
<div class="wowAlert-content">
    <span id="wowAlert-text">
        </span>
</div>
<div class="wowoAlert-close-container">
    <svg xmlns="http://www.w3.org/2000/svg" id="wowAlert-close" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
</div>
</div>`
const $ = document;
const wowAlert_closeBtn = $.querySelector(".wowoAlert-close-container");
const wowAlert_mainContainer = $.querySelector(".wowAlert-container");
const wowAlert_text = $.querySelector("#wowAlert-text");

wowAlert_closeBtn.onclick = () => {
    closeWowAlert("fade")
};

function closeWowAlert(closeMode) {
    if (closeMode) {
        switch (closeMode) {
            case "none":
                {
                    wowAlert_mainContainer.style.display = "none";
                }
                break;
            case "fade":
                {
                    wowAlert_removeClass()
                    wowAlert_mainContainer.classList.add("fade-close");
                    mainDisplayNone(400)
                }
                break;
            case "fadeInDown":
                {
                    wowAlert_removeClass()
                    wowAlert_mainContainer.classList.add("fadeInDown-close");
                    mainDisplayNone(900)
                }
                break;
            case "fadeInLeft":
                {
                    wowAlert_removeClass()
                    wowAlert_mainContainer.classList.add("fadeInLeft-close");
                    mainDisplayNone(900)
                }
                break;
            case "fadeInRight":
                {
                    wowAlert_removeClass()
                    wowAlert_mainContainer.classList.add("fadeInRight-close");
                    mainDisplayNone(900)
                }
                break;
            case "fadeInUp":
                {
                    wowAlert_removeClass()
                    wowAlert_mainContainer.classList.add("fadeInUp-close");
                    mainDisplayNone(900)
                }
                break;
            case "zoom":
                {
                    wowAlert_removeClass()
                    wowAlert_mainContainer.classList.add("zoom-close");
                    mainDisplayNone(900)
                }
                break;
            default:
                {
                    wowAlert_removeClass()
                    wowAlert_mainContainer.classList.add("fade-close");
                    mainDisplayNone(400)
                }
                break;
        }
    }
}

const wowAlert = {
    success: wowAlertSuccess,
    danger: wowAlertDanger,
    warning: wowAlertWarning,
    info: wowAlertInfo,
    dark: wowAlertDark,
    light: wowAlertLight,
}

function wowAlertSuccess(setting) {
    wowAlert_removeStyle()
    wowAlert_mainContainer.classList.add("wowAlert-success")
    if (!setting) {
        setting = new Object();
    }
    wowAlertSetting(setting.openMode, setting.closeMode, setting.closeTime, setting.text, setting.autoClose)
}

function wowAlertDanger(setting) {
    wowAlert_removeStyle()
    wowAlert_mainContainer.classList.add("wowAlert-danger")
    if (!setting) {
        setting = new Object();
    }
    wowAlertSetting(setting.openMode, setting.closeMode, setting.closeTime, setting.text, setting.autoClose)
}

function wowAlertWarning(setting) {
    wowAlert_removeStyle()
    wowAlert_mainContainer.classList.add("wowAlert-warning")
    if (!setting) {
        setting = new Object();
    }
    wowAlertSetting(setting.openMode, setting.closeMode, setting.closeTime, setting.text, setting.autoClose)
}

function wowAlertInfo(setting) {
    wowAlert_removeStyle()
    wowAlert_mainContainer.classList.add("wowAlert-info")
    if (!setting) {
        setting = new Object();
    }
    wowAlertSetting(setting.openMode, setting.closeMode, setting.closeTime, setting.text, setting.autoClose)
}

function wowAlertDark(setting) {
    wowAlert_removeStyle()
    wowAlert_mainContainer.classList.add("wowAlert-dark")
    if (!setting) {
        setting = new Object();
    }
    wowAlertSetting(setting.openMode, setting.closeMode, setting.closeTime, setting.text, setting.autoClose)
}

function wowAlertLight(setting) {
    wowAlert_removeStyle()
    wowAlert_mainContainer.classList.add("wowAlert-Light")
    if (!setting) {
        setting = new Object();
    }
    wowAlertSetting(setting.openMode, setting.closeMode, setting.closeTime, setting.text, setting.autoClose)
}

var wowAlertcloseTimeOut;

function wowAlertSetting(openMode, closeMode, closeTime, text, autoClose) {
    openMode = openMode ? openMode : "fade";
    closeMode = closeMode ? closeMode : [...openMode];
    closeTime = closeTime ? closeTime : 2500;
    text = text ? text : "This is an example text for alert";
    if (autoClose) {
        wowAlertcloseTimeOut = setTimeout(() => {
            closeWowAlert(closeMode)
        }, closeTime)
    } else {
        clearTimeout(wowAlertcloseTimeOut)
    }
    wowAlert_closeBtn.onclick = () => {
        closeWowAlert(closeMode)
    };
    wowAlert_text.innerHTML = text;
    switch (openMode) {
        case "none":
            {
                openWowAlert.none();
            }
            break;
        case "fade":
            {
                openWowAlert.fade();
            }
            break;
        case "fadeInDown":
            {
                openWowAlert.fadeInDown();
            }
            break;
        case "fadeInUp":
            {
                openWowAlert.fadeInUp();
            }
            break;
        case "fadeInRight":
            {
                openWowAlert.fadeInRight();
            }
            break;
        case "fadeInLeft":
            {
                openWowAlert.fadeInLeft();
            }
            break;
        case "zoom":
            {
                openWowAlert.zoom();
            }
            break;
        default:
            {
                openWowAlert.fade();
            }
            break;
    }
}

const openWowAlert = {
    none: () => {
        wowAlert_mainContainer.style.display = "flex";
    },
    fade: () => {
        wowAlert_mainContainer.style.display = "flex";
        wowAlert_removeClass()
        wowAlert_mainContainer.classList.add("fade");
    },
    fadeInDown: () => {
        wowAlert_mainContainer.style.display = "flex";
        wowAlert_removeClass()
        wowAlert_mainContainer.classList.add("fadeInDown");
    },
    fadeInUp: () => {
        wowAlert_mainContainer.style.display = "flex";
        wowAlert_removeClass()
        wowAlert_mainContainer.classList.add("fadeInUp");
    },
    fadeInRight: () => {
        wowAlert_mainContainer.style.display = "flex";
        wowAlert_removeClass()
        wowAlert_mainContainer.classList.add("fadeInRight");
    },
    fadeInLeft: () => {
        wowAlert_mainContainer.style.display = "flex";
        wowAlert_removeClass()
        wowAlert_mainContainer.classList.add("fadeInLeft");
    },
    zoom: () => {
        wowAlert_mainContainer.style.display = "flex";
        wowAlert_removeClass()
        wowAlert_mainContainer.classList.add("zoom");
    },
}

function mainDisplayNone(delay) {
    setTimeout(() => {
        wowAlert_mainContainer.style.display = "none";
    }, delay)
}

function wowAlert_removeClass() {
    wowAlert_mainContainer.classList.remove("fadeInUp-close");
    wowAlert_mainContainer.classList.remove("fadeInRight-close");
    wowAlert_mainContainer.classList.remove("fadeInLeft-close");
    wowAlert_mainContainer.classList.remove("fadeInDown-close");
    wowAlert_mainContainer.classList.remove("zoom-close");
    wowAlert_mainContainer.classList.remove("fade-close");
    wowAlert_mainContainer.classList.remove("fadeInUp");
    wowAlert_mainContainer.classList.remove("fadeInRight");
    wowAlert_mainContainer.classList.remove("fadeInLeft");
    wowAlert_mainContainer.classList.remove("fadeInDown");
    wowAlert_mainContainer.classList.remove("zoom");
    wowAlert_mainContainer.classList.remove("fade");
}

function wowAlert_removeStyle() {
    wowAlert_mainContainer.classList.remove("wowAlert-success");
    wowAlert_mainContainer.classList.remove("wowAlert-danger");
    wowAlert_mainContainer.classList.remove("wowAlert-warning");
    wowAlert_mainContainer.classList.remove("wowAlert-info");
    wowAlert_mainContainer.classList.remove("wowAlert-dark");
    wowAlert_mainContainer.classList.remove("wowAlert-light");
}