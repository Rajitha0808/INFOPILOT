class DynamicBackground {
  constructor() {
    this.canvas = document.getElementById('background-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.stars = [];
    this.gridSize = 50;
    this.time = 0;
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.init());
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Create particles for the glowing effect
    this.particles = [];
    for (let i = 0; i < 150; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width * 0.6, // Concentrate on left side
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 60 + 160, // Greenish-blue range
        pulse: Math.random() * 0.02 + 0.01
      });
    }
    
    // Create stars
    this.stars = [];
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2,
        twinkle: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
  }

  drawGrid() {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    this.ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  drawParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width * 0.6;
      if (particle.x > this.canvas.width * 0.6) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Pulsing effect
      const pulseFactor = Math.sin(this.time * particle.pulse) * 0.3 + 0.7;
      const currentOpacity = particle.opacity * pulseFactor;
      
      // Draw particle with glow
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${currentOpacity})`);
      gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 50%, ${currentOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 40%, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw core
      this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 80%, ${currentOpacity})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawStars() {
    this.stars.forEach(star => {
      const twinkleFactor = Math.sin(this.time * star.twinkle) * 0.5 + 0.5;
      const currentOpacity = star.opacity * twinkleFactor;
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate() {
    // Clear canvas with dark background
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw layers
    this.drawGrid();
    this.drawStars();
    this.drawParticles();
    
    this.time += 1;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the background when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new DynamicBackground();
});
