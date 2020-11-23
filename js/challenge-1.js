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
            var eleContainer = document.querySelector('#basketAddQuick');  // might need a reference to this for scroll detection
            var btnBasketAdd = document.querySelector('#btnBasketAddQuick');
            var btnBasketQty = document.querySelector('#btnBasketQtyAddQuick');
            var anchorsModalDropdown = document.querySelectorAll('.a-dropdown-link');
            // console.log('anchorsModalDropdown.length : ' + anchorsModalDropdown.length);
            

            btnBasketAdd.addEventListener('click', function() {

                document.querySelector('#add-to-cart-button').click();
            }, false);

            btnBasketQty.addEventListener('click', function() {

                // default is 1, subsequent click is 2 and then toggle, as per video example                
                
                
                // var qtyVals = document.querySelectorAll('.a-dropdown-prompt');

                // qtyVals.forEach(function(ele) {
                //     if(ele.textContent == '1') {
                //         ele.textContent = '2';
                //     }
                //     else {
                //         ele.textContent = '1';
                //     }
                // });

                // update the <select> value and the original quantity control with the quantity in the test markup

            }, false);

            // handle changes to the original quantity control and update the test equivalent
            anchorsModalDropdown.forEach(function(ele) {

                ele.addEventListener('click', function() {

                    var qty = ele.textContent;
                    console.log('qty : ', qty);

                    // update the quantity in the test markup


                }, false);
            });



            // also need listener for changes to the original quantity control to then update the test one

                // get the quantity from #btnBasketQtyAddQuick
                // update the original <select> - document.querySelector('#mobileQuantityDropDown').value = theValue;
                // update the pseudo-select element value - #mobileQuantitySelection .a-dropdown-prompt
                // simulate a click event on the original 'Add to Basket' control

                // document.querySelector('#mobileQuantityDropDown').click(); // opens the modal selector at specific screen positions
                // document.querySelector('#mobileQuantityDropDown_1').click(); // or document.querySelector('#mobileQuantityDropDown_0').click();
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
