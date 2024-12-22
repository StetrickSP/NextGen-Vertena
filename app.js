//Search form Section
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => 
{
    searchForm.classList.toggle('active');
}
window.onscroll = () =>
{
    searchForm.classList.remove('active');
}

//Slideshow bar: Portfolio Section
$(document).ready(function()
{
    // $window.scroll(function()
    // {
    //     //Navbar-bottom scrolling
    //     if (this.scrollY > 5)
    //     {
    //         $('.navbar-bottom').addClass('sticky');
    //     }
    //     else
    //     {
    //         $('.navbar-bottom').removeClass('sticky');
    //     }
    // });

    //Owl Carousel
    $('.owl-carousel').owlCarousel({
        margin: 5,
        mavigation: true,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoHoverPause: true,
        responsive:{
            0:{
                items:1,
                nav: false
            },
            600:{  
                items:2,
                nav: false
            },
            1000:{
                items:3,
                nav: false
            }
        }   
    });
});

