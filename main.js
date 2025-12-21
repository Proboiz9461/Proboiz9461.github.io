document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    document.body.style.opacity = "0";
  });
});
