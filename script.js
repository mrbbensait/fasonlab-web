/**
 * FasonLAB - Premium Kozmetik Formülasyon ve Üretim
 * Modern ve etkileşimli kullanıcı deneyimi için geliştirilmiş kod
 */

// DOM yüklendikten sonra çalışacak
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hidden');
            }, 500);
        });
        
        // Sayfa yüklenmesi 2 saniyeden fazla sürerse preloader'ı gizle
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 2000);
    }
    
    // Hero animasyonlarını kalıcı hale getir
    const heroTexts = document.querySelectorAll('.hero h1, .hero .subtitle');
    heroTexts.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Süreç Zaman Çizelgesi için özel animasyonlar
    function initProcessTimeline() {
        const processSteps = document.querySelectorAll('.process-step');
        const flowArrows = document.querySelectorAll('.flow-arrow');
        
        if (processSteps.length === 0) return;
        
        // İlk yüklemede tüm adımları ve okları gizle
        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            
            // İlk aşama dışındaki tüm aşamaların delay'ini ayarla
            const baseDelay = 100; // ms
            const stepDelay = index * baseDelay;
            
            step.setAttribute('data-aos-delay', stepDelay);
            
            // İlk aşama hariç diğer oklar için de delay ayarla
            if (index < flowArrows.length) {
                flowArrows[index].style.opacity = '0';
                flowArrows[index].style.transform = 'scale(0.5)';
                flowArrows[index].setAttribute('data-aos-delay', stepDelay + 150);
            }
        });
    }
    
    // Süreç zaman çizelgesi animasyonlarını başlat
    initProcessTimeline();
    
    // Mobil Menü - Artık kullanılmıyor, ancak gelecekte kullanılabilir diye kod kalabilir
    /*
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.classList.contains('active'));
            
            // Menü açıkken scroll'u engelle
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Menü bağlantılarına tıkladığında menüyü kapat
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });
    }
    */
    
    // Scroll Olayları
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        // Navbar stilleri
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to Top butonu
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Görünüm alanına giren elementleri animasyonla göster
        animateOnScroll();
    });
    
    // Back to Top butonuna tıklama
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth Scroll
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Testimonial Slider
    setupTestimonialSlider();
    
    // İstatistik Sayaçları
    const stats = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // Animasyon süresi (ms)
            const increment = target / (duration / 20); // Her 20ms'de bir artış
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(count);
                }
            }, 20);
        });
        
        countersStarted = true;
    }
    
    // Scroll-triggered Animations için AOS benzeri fonksiyon
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        const flowArrows = document.querySelectorAll('.flow-arrow');
        const statsSection = document.querySelector('.stats');
        const triggerPoint = window.innerHeight * 0.98;
        
        elements.forEach(element => {
            if (!element.classList.contains('aos-animated')) {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < triggerPoint) {
                    const delay = parseInt(element.getAttribute('data-aos-delay') || 0);
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        element.classList.add('aos-animated');
                    }, delay);
                }
            }
        });
        
        // Flow-Arrow elementleri için özel animasyon
        flowArrows.forEach(arrow => {
            if (!arrow.classList.contains('aos-animated')) {
                const arrowTop = arrow.getBoundingClientRect().top;
                
                if (arrowTop < triggerPoint) {
                    const delay = parseInt(arrow.getAttribute('data-aos-delay') || 0);
                    
                    setTimeout(() => {
                        arrow.style.opacity = '1';
                        arrow.style.transform = 'scale(1)';
                        arrow.classList.add('aos-animated');
                    }, delay);
                }
            }
        });
        
        // İstatistik sayaçlarını başlat
        if (statsSection && !countersStarted) {
            const statsSectionTop = statsSection.getBoundingClientRect().top;
            
            if (statsSectionTop < triggerPoint) {
                startCounters();
            }
        }
    }
    
    // AOS benzeri animasyon için stilleri uygula
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
        const animation = element.getAttribute('data-aos') || 'fade-up';
        
        element.style.opacity = '0';
        
        // Animation tipine göre başlangıç transformu ayarla
        if (animation.includes('fade-up')) {
            element.style.transform = 'translateY(30px)';
        } else if (animation.includes('fade-down')) {
            element.style.transform = 'translateY(-30px)';
        } else if (animation.includes('fade-left')) {
            element.style.transform = 'translateX(30px)';
        } else if (animation.includes('fade-right')) {
            element.style.transform = 'translateX(-30px)';
        }
        
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    // İlk yükleme için animasyonları çalıştır
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    // Testimonial Slider Kurulumu
    function setupTestimonialSlider() {
        const testimonialSlides = document.querySelector('.testimonial-slides');
        const prevButton = document.querySelector('.prev-testimonial');
        const nextButton = document.querySelector('.next-testimonial');
        const dotsContainer = document.querySelector('.testimonial-dots');
        
        if (!testimonialSlides || !prevButton || !nextButton || !dotsContainer) return;
        
        const slides = testimonialSlides.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        let autoplayTimer;
        const autoplayDelay = 5000; // 5 saniye
        
        // Nokta göstergelerini oluştur
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        
        // Slide'ı göster
        function goToSlide(index) {
            testimonialSlides.style.transform = `translateX(-${index * 100}%)`;
            
            // Aktif nokta göstergesini güncelle
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Otomatik geçiş için timer'ı resetle
        function resetAutoplay() {
            clearInterval(autoplayTimer);
            startAutoplay();
        }
        
        // Otomatik geçişi başlat
        function startAutoplay() {
            autoplayTimer = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                goToSlide(currentSlide);
            }, autoplayDelay);
        }
        
        // Önceki slide
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
            resetAutoplay();
        });
        
        // Sonraki slide
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
            resetAutoplay();
        });
        
        // Otomatik geçişi başlat
        startAutoplay();
        
        // Fareyle üzerine gelince otomatik geçişi durdur
        testimonialSlides.addEventListener('mouseenter', () => {
            clearInterval(autoplayTimer);
        });
        
        // Fare ayrılınca otomatik geçişi devam ettir
        testimonialSlides.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }
    
    // İletişim Formu Gönderimi
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form kontrolü
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Başarı mesajı göster
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.';
            document.body.appendChild(successMessage);
            
            // Mesajı görünür yap
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 100);
            
            // Mesajı kaldır
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 500);
            }, 5000);
            
            // Formu temizle
            contactForm.reset();
        });
    }
}); 