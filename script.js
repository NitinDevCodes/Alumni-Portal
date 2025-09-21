document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if(entry.target.classList.contains('number')) updateCount(entry.target);
                if(entry.target.classList.contains('mockup-card')) {
                    const posts = entry.target.querySelectorAll('.mockup-post');
                    posts.forEach((post, i) => setTimeout(() => post.classList.add('animate'), i * 200));
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .number, .mockup-card').forEach(el => observer.observe(el));
    
    // Counter Animation
    function updateCount(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const increment = target / 100;
        const counter = setInterval(() => {
            count += increment;
            if(count < target) {
                el.innerText = Math.ceil(count).toLocaleString();
            } else {
                el.innerText = target.toLocaleString() + '+';
                clearInterval(counter);
            }
        }, 20);
    }

    // 3D Globe Animation
    if(window.innerWidth > 768 && typeof THREE !== 'undefined') { // Only run on desktop and if THREE.js is loaded
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe-canvas'), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.SphereGeometry(2.5, 32, 32);
        const material = new THREE.PointsMaterial({
            size: 0.015,
            color: 0xffffff
        });
        const sphere = new THREE.Points(geometry, material);
        scene.add(sphere);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            // Continuous rotation
            sphere.rotation.y += 0.0005;
            sphere.rotation.x += 0.0001;

            renderer.render(scene, camera);
        };
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});

