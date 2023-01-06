document.addEventListener("DOMContentLoaded", function(event) {

  document.getElementById('file').addEventListener('change', function() {
    if (this.files && this.files[0]) {
      const img = document.getElementById('image');

      img.src = URL.createObjectURL(this.files[0]);
    }
  });

  const svg = d3.select('.mapper svg');
  const polygon = svg.append('polygon')
  .style('fill', 'red')
  .style('stroke', 'black');

  let points = [];

  svg.on('click', function(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    points.push([x, y]);
    updatePolygon();
  });

  function updatePolygon() {
    polygon.attr('points', points.map(p => p.join(',')).join(' '));
  }

  let selectedVertex = null;

  svg.on('mousedown', function(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    for (let i = 0; i < points.length; i++) {
      const [px, py] = points[i];
      if (Math.abs(x - px) < 5 && Math.abs(y - py) < 5) {
        selectedVertex = i;
        break;
      }
    }
  });

  svg.on('mousemove', function(e) {
    if (selectedVertex !== null) {
      const x = e.offsetX;
      const y = e.offsetY;
      points[selectedVertex] = [x, y];
      updatePolygon();
    }
  });

  svg.on('mouseup', function() {
    selectedVertex = null;
  });
});