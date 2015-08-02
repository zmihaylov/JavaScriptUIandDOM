/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"       
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string` 

*/
function solve() {
  return function (selector) {
      if (typeof selector !== 'string' || !($(selector).length)) {
          throw new Error('invalid selector');
      }

      var $selector = $(selector),
          $buttons = $selector.find('.button'),
          len = $buttons.length;
          $contents = $selector.find('.content');

      //console.log($buttons);
      //console.log($contents);

      $buttons.each(function (index) {
          $(this).text('hide');
          // $(this).attr('id', index);

          // [1,2,1,2,1,2,1,2,1,1,1,2,1,2,2,2,2,1,1,1,1,2]
          $(this).on('click', function (event) {
              //alert($(event.target).attr('id'));
              //alert($(event.target).attr('class'));
              var $clicked = $(event.target),
                  $next = $clicked.next(),
                  $firstContent,
                  count = 0,
                  validFirstContent = false;

              while ($next) {

                  if ($next.attr('class') === 'content') {
                      $firstContent = $next;
                      $next = $next.next();

                      if ($next.attr('class') === 'button') {
                          validFirstContent = true;
                          break;
                      }
                  }
                  $next = $next.next();
                  count++;
                  if (count == len) {
                      break;
                  }
              }

              if (validFirstContent) {
                  if ($firstContent.css('display') === 'none') {
                      $clicked.text('hide');
                      $firstContent.css('display', '');
                  }
                  else {
                      $clicked.text('show');
                      $firstContent.hide();
                  }
              }
          });
      });
  };
};

module.exports = solve;