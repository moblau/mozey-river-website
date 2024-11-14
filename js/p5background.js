let systems = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-background');
    
    // Create multiple solar systems
    for (let i = 0; i < 5; i++) {
        systems.push(new SolarSystem(random(width), random(height)));
    }
}

function draw() {
    drawStarrySky(); // Draw starry sky background
    
    for (let system of systems) {
        system.update();
        system.display();
    }
}

function drawStarrySky() {
    // Dark sky background
    background(0,0,40);
    
    // Draw glowing stars in the distance
    for (let i = 0; i < 200; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(1, 3);
        let brightness = random(150, 255);
        fill(255, brightness);
        noStroke();
        ellipse(x, y, size);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class SolarSystem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = random(-1, 1);
        this.dy = random(-1, 1);
        this.planets = [];
        
        for (let i = 0; i < random(2, 5); i++) {
            this.planets.push(new Planet(random(10, 20), random(TWO_PI), random(1, 3), random(30, 100)));
        }
    }
    
    update() {
        // Update position
        this.x += this.dx;
        this.y += this.dy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > width) this.dx *= -1;
        if (this.y < 0 || this.y > height) this.dy *= -1;
        
        // Update planets
        for (let planet of this.planets) {
            planet.update(this.x,this.y);
        }
    }
    
    display() {
        // Draw central star
        fill(255, 204, 0);
        noStroke();
        ellipse(this.x, this.y, 40);
        
        // Draw planets
        for (let planet of this.planets) {
            planet.display(this.x, this.y);
        }
    }
}

class Planet {
    constructor(size, angle, speed, distance) {
        this.size = size;
        this.angle = angle;
        this.speed = speed;
        this.distance = distance;
        this.trail = [];
        
        // Generate random gradient colors
        this.color1 = color(random(255), random(255), random(255));
        this.color2 = color(random(255), random(255), random(255));
    }
    
    update(x,y) {
        this.angle += this.speed * 0.01;
        
        // Add current position to trail
        this.trail.push({ x: this.calculateX(x), y: this.calculateY(y) });
        
        // Limit trail length
        if (this.trail.length > 200) {
            this.trail.shift(); // Remove oldest point
        }
    }
    
    display(cx, cy) {
        // Draw trail
        for (let i = 0; i < this.trail.length - 1; i++) {
            let from = this.trail[i];
            let to = this.trail[i + 1];
            let gradient = lerpColor(this.color1, this.color2, i / this.trail.length);
            strokeWeight(this.size / 10);
            stroke(gradient);
            line(from.x, from.y, to.x, to.y);
        }
        
        // Draw current position
        fill(this.color2);
        noStroke();
        ellipse(this.calculateX(cx), this.calculateY(cy), this.size);
    }
    
    calculateX(cx) {
        return cx + cos(this.angle) * this.distance;
    }
    
    calculateY(cy) {
        return cy + sin(this.angle) * this.distance;
    }
}
