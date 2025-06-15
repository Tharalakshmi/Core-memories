// Drag-and-drop logic for .paper elements in .main-papers
window.addEventListener("DOMContentLoaded", function() {
  const papers = Array.from(document.querySelectorAll('.main-papers .paper')).reverse();
  const stack = document.querySelector('.main-papers');
  if (!stack) return;
  papers.forEach((paper, i) => {
    // Stack each with a slight offset for initial look
    let offset = i * 12;
    paper.style.top = 45 + offset + 'px';
    paper.style.left = 25 + offset + 'px';
    paper.style.zIndex = 10 + i;
  });
  papers.forEach(paper => {
    paper.addEventListener('mousedown', function(e) {
      e.preventDefault();
      let shiftX = e.clientX - paper.getBoundingClientRect().left;
      let shiftY = e.clientY - paper.getBoundingClientRect().top;
      paper.style.position = 'absolute';
      paper.style.zIndex = 99;
      function moveAt(pageX, pageY) {
        // keep within parent (stack)
        let minX = stack.getBoundingClientRect().left;
        let minY = stack.getBoundingClientRect().top;
        let x = pageX - shiftX - minX;
        let y = pageY - shiftY - minY;
        paper.style.left = x + 'px';
        paper.style.top = y + 'px';
      }
      moveAt(e.pageX, e.pageY);
      function onMouseMove(e) { moveAt(e.pageX, e.pageY); }
      document.addEventListener('mousemove', onMouseMove);
      paper.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        paper.onmouseup = null;
        paper.style.zIndex = 99 + Math.floor(Math.random()*10);
      };
    });
    paper.ondragstart = () => false;
  });
});
