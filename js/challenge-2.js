/*
    Test Name   : 	Biglight Challenge 02
    Target URL  :   https://www.amazon.co.uk/s\?k=Amazon
    Devices     :   Mobile only
*/


// var firstResult = document.querySelectorAll("[data-component-type='s-search-result']")[0];

// div.s-main-slot - observe change


(function(win) {

    win.challenge_02 = {

        init: function() {

            console.log('<<<<<< CHALLENGE-02 >>>>>>>');
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        
        var mobRender = document.querySelector('html').classList.contains('a-mobile') ? true : false;

        // apply to mobile render only (usually handled in Optimizely, VWO, etc.)
        if(mobRender) {

            win.challenge_02.init();
        }
    });
})(window);
