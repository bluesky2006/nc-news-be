const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    for (let j = 0; j < coll.length; j++) {
      if (coll[j] !== this) {
        coll[j].classList.remove("active");
        const otherContent = coll[j].nextElementSibling;
        if (otherContent) {
          otherContent.style.display = "none";
        }
      }
    }

    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content) {
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    }
  });
}
