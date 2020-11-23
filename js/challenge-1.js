/*
    Test Name   : 	Biglight Challenge 01
    Target URL  :   https://www.amazon.co.uk/Echo-Dot-3rd-Gen-Charcoal/dp/B07PJV3JPR/ref=sr_1_2
    Devices     :   Mobile only
*/

(function(win) {

    win.challenge_01 = {

        config: {

            mutationObserverConfig: {
                
                childList: true,
                subtree: true
            },

            basketAddQuickHtml: function(qty) {

                return  '<div id="basketAddQuick" class="basket-add-quick">' +
                            '<button class="a-button a-button-dropdown a-button-small" id="btnBasketQtyAddQuick"><span class="a-button-inner"><span class="a-button-text a-declarative" ><span class="a-dropdown-label">Qty:</span><span class="a-dropdown-prompt">' + qty + '</span></span><i class="a-icon a-icon-dropdown"></i></span></button>' +
                            '<button class="a-button a-button-primary a-button-icon" id="btnBasketAddQuick"><span class="a-button-inner"><i class="a-icon a-icon-cart"></i><span title="Add to Shopping Basket" class="a-button-input"></span><span class="a-button-text a-text-left">Add to Basket</span></span></button>' +
                        '</div>';
            }
        },

        init: function() {

            var $_ = this;
            $_.utilities.eleObsAvailable($_);

            // generate missing DOM modal popup content on page load
            document.querySelector('.a-native-dropdown.mobileQuantityDropDown').click();

            // wait for the popup close button
            $_.eleObsSelector('.a-button-close.a-declarative', function(ele) {

                var elePopupContent = document.querySelector('#a-popover-1');
                var elePopupBackground = document.querySelector('#a-popover-lgtbox');

                // hide the generated popup
                elePopupContent.classList.add('off-screen');
                elePopupBackground.classList.add('off-screen');

                // wait for the popup close button functionality and close
                setTimeout(function() {
                    ele.click();
                    elePopupContent.classList.remove('off-screen');
                    elePopupBackground.classList.remove('off-screen');
                }, 1800);

                $_.updateDom();
                $_.bindEvents();
                $_.inViewport();
            });
        },

        updateDom: function() {

            var $_ = this;
            var newHtmlFrag = $_.config.basketAddQuickHtml(1);
            var eleDest = document.querySelector('#a-page');

            // add test DOM content
            eleDest.insertAdjacentHTML('beforeend', newHtmlFrag);
        },

        bindEvents: function() {

            var $_ = this;
            var btnBasketAdd = document.querySelector('#btnBasketAddQuick');
            var btnBasketQty = document.querySelector('#btnBasketQtyAddQuick');
            var eleQtyTest = btnBasketQty.querySelector('.a-dropdown-prompt');

            // new Add to Basket button executes the original button functionality
            btnBasketAdd.addEventListener('click', function() {

                document.querySelector('#add-to-cart-button').click();
            }, false);

            // new quantity control - default is 1, subsequent click is 2 and then toggle, as per video example.
            btnBasketQty.addEventListener('click', function() {

                var eleQtyOrig = document.querySelector('#mobileQuantitySelection .a-dropdown-prompt');
                var eleSelectQty = document.querySelector('#mobileQuantityDropDown');

                if(eleQtyTest.textContent == '1') {
                    eleQtyTest.textContent = '2';
                    eleQtyOrig.textContent = '2';
                    document.querySelector('#mobileQuantityDropDown_1').click();
                    eleSelectQty.value = '2';
                }
                else {
                    eleQtyTest.textContent = '1';
                    eleQtyOrig.textContent = '1';
                    document.querySelector('#mobileQuantityDropDown_0').click();
                    eleSelectQty.value = '1';
                }
            }, false);

            // handle changes to the original quantity control and update the test equivalent
            document.querySelector('#mobileQuantityDropDown_0').addEventListener('click', function() {

                eleQtyTest.textContent = '1';
            });

            document.querySelector('#mobileQuantityDropDown_1').addEventListener('click', function() {

                eleQtyTest.textContent = '2';
            });
        },

        inViewport: function() {

            var $_ = this;
            var eleTrigger = document.querySelector('#buyNow_feature_div + #addToCart_feature_div'); // theres more than one #addToCart_feature_div :(
            var eleBasketAddQuick = document.querySelector('#basketAddQuick');

            win.addEventListener('scroll', function() {

                if($_.utilities.inView(eleTrigger)) {

                    eleBasketAddQuick.classList.add('off-screen');
                }
                else {
    
                    eleBasketAddQuick.classList.remove('off-screen');
                }
            }, {passive: true});            
        },
        
        utilities: {

            // MutationObserver to detect appearance of element
            eleObsAvailable: function($_) {
                
                var listeners = [],
                doc = win.document,
                MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
                observer;

                function observeSelector(selector, fn) {

                    listeners.push({
                        selector: selector,
                        fn: fn
                    });

                    if (!observer) {

                        observer = new MutationObserver(check);
                        observer.observe(doc.documentElement, $_.config.mutationObserverConfig);
                    }

                    // Check if the element is currently in the DOM
                    check();
                }

                function check() {
                    // Check the DOM for elements matching a stored selector
                    for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
                        
                        listener = listeners[i];
                        
                        // Query for elements matching the specified selector
                        elements = doc.querySelectorAll(listener.selector);
                        
                        for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                            
                            element = elements[j];

                            // Make sure the callback isn't invoked with the same element more than once
                            if (!element.observeSelector) {
                                
                                element.observeSelector = true;

                                // Invoke the callback with the element
                                listener.fn.call(element, element);
                            }
                        }
                    }
                }

                // Expose 'observeSelector'
                $_.eleObsSelector = observeSelector;
            },

            inView: function(ele) {

                var bounds = ele.getBoundingClientRect();

                return (bounds.top >= 0 && bounds.bottom <= (win.innerHeight || document.documentElement.clientHeight));
            }
        }
    };

    document.addEventListener('DOMContentLoaded', function() {

        var mobRender = document.querySelector('html').classList.contains('a-mobile') ? true : false;

        // apply to mobile render only (usually handled in Optimizely, VWO, etc.)
        if(mobRender) {

            win.challenge_01.init();
        }
    });
})(window);
