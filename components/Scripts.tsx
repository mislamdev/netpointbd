'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    $: any;
    jQuery: any;
    initializePlugins: () => void;
  }
}

export default function Scripts() {
  const pathname = usePathname();

  useEffect(() => {
    // Function to initialize all plugins
    const initPlugins = () => {
      if (typeof window !== 'undefined' && window.$) {
        const $ = window.$;

        // Destroy existing instances first
        try {
          $('.mean-menu').meanmenu('destroy');
        } catch (e) {}
        
        try {
          $('.owl-carousel').trigger('destroy.owl.carousel');
        } catch (e) {}

        try {
          $('select').niceSelect('destroy');
        } catch (e) {}

        // Reinitialize plugins
        setTimeout(() => {
          // Mean Menu
          if (typeof $.fn.meanmenu !== 'undefined') {
            $('.mean-menu').meanmenu({ 
              meanScreenWidth: "991"
            });
          }

          // Nice Select
          if (typeof $.fn.niceSelect !== 'undefined') {
            $('select').niceSelect();
          }

          // Owl Carousel - Banner Slider
          if (typeof $.fn.owlCarousel !== 'undefined') {
            $('.banner-slider').owlCarousel({
              items: 1,
              loop: true,
              margin: 0,
              nav: true,
              dots: false,
              autoplay: true,
              smartSpeed: 1000,
              autoplayHoverPause: true,
              navText: [
                "<i class='flaticon-left-arrow'></i>",
                "<i class='flaticon-right-arrow'></i>",
              ],
            });

            // Testimonials Slider
            $('.testimonials-slider').owlCarousel({
              items: 1,
              loop: true,
              margin: 0,
              nav: true,
              dots: false,
              autoplay: true,
              smartSpeed: 1000,
              autoplayHoverPause: true,
              navText: [
                "<i class='flaticon-left-arrow'></i>",
                "<i class='flaticon-right-arrow'></i>",
              ],
            });

            // Partner Slider
            $('.partner-slider').owlCarousel({
              loop: true,
              margin: 30,
              nav: false,
              dots: false,
              autoplay: true,
              smartSpeed: 1000,
              autoplayHoverPause: true,
              responsive: {
                0: { items: 2 },
                576: { items: 3 },
                768: { items: 4 },
                992: { items: 5 },
                1200: { items: 6 },
              },
            });
          }

          // Jarallax
          if (typeof $.fn.jarallax !== 'undefined') {
            $('.jarallax').jarallax({
              speed: 0.3
            });
          }

          // Tab functionality
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          $('.tabs li').on('click', function(this: any) {
            var tab = $(this).data('tab');
            $('.tabs li').removeClass('current');
            $('.tabs_item').removeClass('current');
            $(this).addClass('current');
            $('.tabs_item').eq(tab).addClass('current');
          });

          // Sticky Header and Go To Top
          const handleScroll = () => {
            const scrolled = $(window).scrollTop();
            if (scrolled > 150) {
              $('.navbar-area').addClass('is-sticky');
            } else {
              $('.navbar-area').removeClass('is-sticky');
            }
            
            if (scrolled > 300) {
              $('.go-top').addClass('active');
            } else {
              $('.go-top').removeClass('active');
            }
          };

          $(window).on('scroll', handleScroll);
          handleScroll(); // Call once on load

          // Go to top click
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          $('.go-top').on('click', function(e: any) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 1000);
          });

          // Smooth scroll
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          $('a[href*="#"]:not([href="#"])').on('click', function(this: any, e: any) {
            if (this.hash !== '') {
              const hash = this.hash;
              const target = $(hash);
              if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                  scrollTop: target.offset().top - 70
                }, 800);
              }
            }
          });

          // Initialize WOW.js
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof (window as any).WOW !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new (window as any).WOW({
              boxClass: 'wow',
              animateClass: 'animated',
              offset: 0,
              mobile: false,
              live: true
            }).init();
          }

          // Odometer
          if (typeof $.fn.appear !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            $('.odometer').appear(function(this: any) {
              var odo = $(this);
              var countNumber = odo.attr('data-count');
              if (countNumber) {
                odo.html(countNumber);
              }
            });
          }

        }, 100);
      }
    };

    // Initialize plugins when scripts are loaded
    if (typeof window !== 'undefined') {
      window.initializePlugins = initPlugins;
      
      // Wait for all scripts to load
      const checkAndInit = setInterval(() => {
        if (window.$ && window.jQuery) {
          clearInterval(checkAndInit);
          initPlugins();
        }
      }, 100);

      // Cleanup on unmount
      return () => {
        clearInterval(checkAndInit);
      };
    }
  }, [pathname]); // Reinitialize on route change

  return (
    <>
      <Script 
        src="/assets/js/jquery.min.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="/assets/js/bootstrap.bundle.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/meanmenu.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/owl.carousel.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/nice-select.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/magnific-popup.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/jarallax.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/appear.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/odometer.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/smoothscroll.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/ajaxchimp.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/assets/js/wow.min.js" 
        strategy="afterInteractive" 
      />
    </>
  );
}
