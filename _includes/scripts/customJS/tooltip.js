document.querySelectorAll("tooltip").forEach(e => {
    e.style.color = (e.childNodes.length > 1) ? "#FFE05C" : "rgba(255,255,255, 0.7)";
})

function setTooltip() {
    let innerWidth = document.querySelector(".tooltip").offsetWidth;
    let tooltip = document.querySelector(".tooltip");
    let style = getComputedStyle(tooltip);
    let marginLeft = parseInt(style.marginLeft);
    let width = innerWidth + marginLeft;
    
    document.querySelectorAll(".tooltip").forEach((element) => {
        element.querySelectorAll("tooltip").forEach((e, i) => {
            let text = e.querySelector("text");
            if (text != null){
                text.style.width = `${width / 2}px`;
                text.style.left = `${(width / 2) - marginLeft}px`;
                text.style.transform = `translateY(-${tooltip.childNodes[1].offsetHeight * i}px)`;
            }
        })
    })
};

setTooltip();

window.onresize = function () {
    setTooltip();
}