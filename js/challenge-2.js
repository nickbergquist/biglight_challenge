/*
    Test Name   : 	Biglight Challenge 02
    Target URL  :   https://www.amazon.co.uk/s\?k=Amazon
    Devices     :   Mobile only
*/

(function(win) {

    win.challenge_02 = {

        config: {

            mutationObserverConfig: {
                
                childList: true
            },

            promoBlockHtml: function() {

                return  '<div id="promoBlock" class="bl-promo-block">' +
                            '<h2>Get 50% off <br/>all Amazon products</h2>' +
                            '<p class="bl-offer">Use code: <span class="bl-offer-code">AZ50</span></p>' +
                            '<p class="bl-terms">T&Cs Apply</p>' +
                        '</div>';
            }
        },

        init: function() {

            var $_ = this;
            var eleContainer = document.querySelector('.s-main-slot');

            var observer = new MutationObserver(function() {

                console.log('changed');
                if(!document.querySelector('#promoBlock')) {

                    $_.updateDom();
                }
            });

            // initial render
            $_.updateDom();

            // subsequent renders after container mutation events
            observer.observe(eleContainer, $_.config.mutationObserverConfig);
        },

        updateDom: function() {

            var $_ = this;
            var newHtmlFrag = $_.config.promoBlockHtml();           

            // add test DOM content
            var eleDest = document.querySelectorAll("[data-component-type='s-search-result']")[0];
            
            if(eleDest) {
                eleDest.insertAdjacentHTML('afterend', newHtmlFrag);
            }
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
