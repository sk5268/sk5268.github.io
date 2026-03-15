document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".smooth-scroll-wrapper");

  // Basic keyboard navigation for slides (Instant/Static transitions)
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      container.scrollBy({ top: window.innerHeight, behavior: "auto" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      container.scrollBy({ top: -window.innerHeight, behavior: "auto" });
    }
  });

  console.log("Static Mode Active.");
});
