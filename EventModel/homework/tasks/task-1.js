/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/

function solve(){
    return function (selector) {
        if ((typeof selector !== 'string') && !(selector instanceof HTMLElement)) {
            throw new Error('not a string or element');
        }

        if (typeof selector === 'string') {
            
            if (document.getElementById(selector) == null) {
                throw new Error('id doesnt select anythig');
            }

            selector = document.getElementById(selector);
        }

        var buttons = selector.getElementsByClassName('button'),
            contents = selector.getElementsByClassName('content'),
            i,
            len;

        //console.log(buttons);
        //console.log(contents);

        for (i = 0, len = buttons.length; i < len; i++) {
            buttons[i].innerHTML = 'hide';
            buttons[i].addEventListener('click', function (ev) {
                var clicked = ev.target,
                    nextSibling = clicked.nextElementSibling,
                    firstContent,
                    validFirstContent = false;

                while (nextSibling) {
                    
                    if (nextSibling.className === 'content') {
                        firstContent = nextSibling;
                        nextSibling = nextSibling.nextElementSibling;

                        if (nextSibling.className === 'button') {
                            validFirstContent = true;
                            break;
                        }
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }

                if (validFirstContent) {
                    if (firstContent.style.display === 'none') {
                        firstContent.style.display = '';
                        clicked.innerHTML = 'hide';
                    } else {
                        firstContent.style.display = 'none';
                        clicked.innerHTML = 'show';
                    }
                }
            });
        }
  };
};



module.exports = solve;