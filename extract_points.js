const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
    <svg id="svg">
        <path id="path" d="M242.179 21.1696C249.167 3.85178 268.871 -4.52245 286.188 2.46546C303.506 9.45344 311.88 29.1566 304.893 46.4743C266.732 141.046 207.119 182.352 158.166 210.734C132.796 225.443 115.594 234.048 101.748 245.091C89.8995 254.542 84.1258 263.188 82.0566 275.442C77.9925 299.513 89.1042 325.581 114.016 349.423C123.913 259.86 244.448 189.106 391.687 189.106C468.212 189.106 537.522 208.221 587.837 239.153C587.34 235.199 587.085 231.171 587.085 227.083C587.085 202.438 596.382 179.965 611.659 162.978C584.62 132.176 596.784 101.992 607.397 89.8092C629.639 99.7404 641.672 120.48 647.46 137.981C658.446 133.597 670.433 131.185 682.982 131.185C698.321 131.185 712.819 134.787 725.676 141.19C731.017 123.089 743.123 100.355 766.741 89.8092C777.88 102.595 790.725 135.207 758.169 167.553C771.135 183.908 778.88 204.591 778.88 227.083C778.88 268.821 752.214 304.33 714.99 317.506L644.032 438.057L772.251 702.659H672.369L581.968 516.097L491.567 702.659H391.687L477.669 525.215C450.591 530.653 421.693 533.592 391.687 533.592C357.038 533.592 323.869 529.673 293.271 522.513L380.564 702.659H280.684L190.282 516.098L99.8818 702.659H0L126.934 440.707C111.708 432.741 97.1556 423.345 83.9609 412.841C41.7644 379.252 4.79151 326.855 15.373 264.183C20.9301 231.271 38.5268 209.014 59.5791 192.222C78.6337 177.024 103.864 164.046 124.246 152.229C166.798 127.559 211.969 96.0356 242.179 21.1696Z"/>
    </svg>
</body>
</html>
`);

const path = dom.window.document.getElementById('path');
const totalLength = path.getTotalLength();
const numPoints = 95;

const points = [];
for (let i = 0; i < numPoints; i++) {
    const distance = (i / (numPoints - 1)) * totalLength;
    const point = path.getPointAtLength(distance);
    points.push({x: point.x, y: point.y});
}

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;
points.forEach(p => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
});

const originalWidth = maxX - minX;
const originalHeight = maxY - minY;

const targetHeight = 600 * 0.7;
const scale = targetHeight / originalHeight;
const scaledWidth = originalWidth * scale;
const scaledHeight = originalHeight * scale;

const offsetX = (800 - scaledWidth) / 2;
const offsetY = (600 - scaledHeight) / 2;

const scaledPoints = points.map(p => ({
    x: Math.round((p.x - minX) * scale + offsetX),
    y: Math.round((p.y - minY) * scale + offsetY)
}));

console.log(JSON.stringify(scaledPoints));
