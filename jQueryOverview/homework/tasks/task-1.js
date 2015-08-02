/* globals $ */

/* 

Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:   
  * The UL must have a class `items-list`
  * Each of the LIs must:
    * have a class `list-item`
    * content "List item #INDEX"
      * The indices are zero-based
  * If the provided selector does not selects anything, do nothing
  * Throws if
    * COUNT is a `Number`, but is less than 1
    * COUNT is **missing**, or **not convertible** to `Number`
      * _Example:_
        * Valid COUNT values:
          * 1, 2, 3, '1', '4', '1123'
        * Invalid COUNT values:
          * '123px' 'John', {}, [] 
*/

function solve() {
  return function (selector, count) {
      if (isNaN(count)) {
          throw new Error('Count is not a number');
      }

      count = +count;

      if (count < 1) {
          throw new Error('count is less than one');
      }

      if (typeof selector !== 'string') {
          throw new Error('invalid selector');
      }

      var $selector = $(selector),
          $list = $('<ul>').addClass('items-list'),
          $item = $('<li>').addClass('list-item');
      
      if ($selector.length) {
          for (var i = 0; i < count; i++) {
              $item.html('List item #' + i).clone().appendTo($list);
          }

          $selector.append($list);
      }
  };
};

module.exports = solve;