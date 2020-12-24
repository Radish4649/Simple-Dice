document.getElementById("darkmode").addEventListener("click", darkmode);

const el = document.getElementsByTagName("*")

function darkmode() {
    for (let i = 0; i < el.length; i++) {
        if (el[i].style.color === "black") {
            el[i].setAttribute("style", "color:white; background-color: black;")
        } else {
            el[i].setAttribute("style", "color:black; background-color: white;")
        }
    }
}

