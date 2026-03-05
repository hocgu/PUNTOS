// Manual SVG path point extraction
// Parse path commands and sample points along curves

function parsePath(d) {
    const commands = [];
    const regex = /([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi;
    let match;

    while ((match = regex.exec(d)) !== null) {
        const cmd = match[1];
        const args = match[2].trim().split(/[\s,]+/).filter(x => x).map(Number);
        commands.push({ cmd, args });
    }

    return commands;
}

function cubicBezier(t, p0, p1, p2, p3) {
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    return {
        x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
        y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
    };
}

function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function samplePath(pathD, numSamples = 95) {
    const commands = parsePath(pathD);
    const segments = [];
    let currentPos = { x: 0, y: 0 };

    for (const { cmd, args } of commands) {
        if (cmd === 'M') {
            currentPos = { x: args[0], y: args[1] };
        } else if (cmd === 'C') {
            for (let i = 0; i < args.length; i += 6) {
                const p0 = currentPos;
                const p1 = { x: args[i], y: args[i + 1] };
                const p2 = { x: args[i + 2], y: args[i + 3] };
                const p3 = { x: args[i + 4], y: args[i + 5] };

                // Estimate length by sampling
                let length = 0;
                let lastP = p0;
                for (let t = 0.01; t <= 1; t += 0.01) {
                    const p = cubicBezier(t, p0, p1, p2, p3);
                    length += distance(lastP, p);
                    lastP = p;
                }

                segments.push({ type: 'C', p0, p1, p2, p3, length });
                currentPos = p3;
            }
        } else if (cmd === 'L') {
            for (let i = 0; i < args.length; i += 2) {
                const p0 = currentPos;
                const p1 = { x: args[i], y: args[i + 1] };
                const length = distance(p0, p1);
                segments.push({ type: 'L', p0, p1, length });
                currentPos = p1;
            }
        } else if (cmd === 'H') {
            for (const x of args) {
                const p0 = currentPos;
                const p1 = { x, y: currentPos.y };
                const length = distance(p0, p1);
                segments.push({ type: 'L', p0, p1, length });
                currentPos = p1;
            }
        } else if (cmd === 'Z') {
            // Close path - could add line back to start if needed
        }
    }

    // Calculate total length
    const totalLength = segments.reduce((sum, seg) => sum + seg.length, 0);

    // Sample points evenly along path
    const points = [];
    let targetDist = 0;
    const distStep = totalLength / (numSamples - 1);

    let currentDist = 0;
    let segmentIdx = 0;
    let segmentProgress = 0;

    for (let i = 0; i < numSamples; i++) {
        targetDist = i * distStep;

        // Find the segment containing targetDist
        while (segmentIdx < segments.length && currentDist + segments[segmentIdx].length < targetDist) {
            currentDist += segments[segmentIdx].length;
            segmentIdx++;
            segmentProgress = 0;
        }

        if (segmentIdx >= segments.length) {
            // Last point
            const lastSeg = segments[segments.length - 1];
            points.push(lastSeg.type === 'C' ? lastSeg.p3 : lastSeg.p1);
            break;
        }

        const segment = segments[segmentIdx];
        const distInSegment = targetDist - currentDist;
        const t = distInSegment / segment.length;

        let point;
        if (segment.type === 'C') {
            point = cubicBezier(t, segment.p0, segment.p1, segment.p2, segment.p3);
        } else {
            point = {
                x: segment.p0.x + t * (segment.p1.x - segment.p0.x),
                y: segment.p0.y + t * (segment.p1.y - segment.p0.y)
            };
        }

        points.push(point);
    }

    return points;
}

const pathD = "M242.179 21.1696C249.167 3.85178 268.871 -4.52245 286.188 2.46546C303.506 9.45344 311.88 29.1566 304.893 46.4743C266.732 141.046 207.119 182.352 158.166 210.734C132.796 225.443 115.594 234.048 101.748 245.091C89.8995 254.542 84.1258 263.188 82.0566 275.442C77.9925 299.513 89.1042 325.581 114.016 349.423C123.913 259.86 244.448 189.106 391.687 189.106C468.212 189.106 537.522 208.221 587.837 239.153C587.34 235.199 587.085 231.171 587.085 227.083C587.085 202.438 596.382 179.965 611.659 162.978C584.62 132.176 596.784 101.992 607.397 89.8092C629.639 99.7404 641.672 120.48 647.46 137.981C658.446 133.597 670.433 131.185 682.982 131.185C698.321 131.185 712.819 134.787 725.676 141.19C731.017 123.089 743.123 100.355 766.741 89.8092C777.88 102.595 790.725 135.207 758.169 167.553C771.135 183.908 778.88 204.591 778.88 227.083C778.88 268.821 752.214 304.33 714.99 317.506L644.032 438.057L772.251 702.659H672.369L581.968 516.097L491.567 702.659H391.687L477.669 525.215C450.591 530.653 421.693 533.592 391.687 533.592C357.038 533.592 323.869 529.673 293.271 522.513L380.564 702.659H280.684L190.282 516.098L99.8818 702.659H0L126.934 440.707C111.708 432.741 97.1556 423.345 83.9609 412.841C41.7644 379.252 4.79151 326.855 15.373 264.183C20.9301 231.271 38.5268 209.014 59.5791 192.222C78.6337 177.024 103.864 164.046 124.246 152.229C166.798 127.559 211.969 96.0356 242.179 21.1696Z";

const points = samplePath(pathD, 95);

// Find bounding box
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

// Scale to fit 800x600 canvas, taking 70% of height
const targetHeight = 600 * 0.7;
const scale = targetHeight / originalHeight;
const scaledWidth = originalWidth * scale;

// Center in canvas
const offsetX = (800 - scaledWidth) / 2;
const offsetY = (600 - targetHeight) / 2;

// Scale and translate points
const scaledPoints = points.map(p => ({
    x: Math.round((p.x - minX) * scale + offsetX),
    y: Math.round((p.y - minY) * scale + offsetY)
}));

console.log(JSON.stringify(scaledPoints));
