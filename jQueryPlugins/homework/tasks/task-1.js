function solve(){
  return function(selector){
      var $selectedList = $(selector).hide();
      var $options = $selectedList.children();
      var $divContainer = $('<div />').addClass('dropdown-list').append($selectedList);
      var $current = $('<div />').addClass('current').attr('data-value', '').text('Select value');
      var $divOptionsContainer = $('<div />').addClass('options-container').css({
          'position': 'absolute',
          'display': 'none'
      });

      $current.on('click', function () {
          var $container = $('.options-container');
          $container.css('display', 'inline-block');
      });

      $divOptionsContainer.on('click', function (event) {
          var $clicked = $(event.target);
          var $display = $('.current');
          $display.text($clicked.text());
          $selectedList.val($clicked.attr('data-value'));
          //console.log($selectedList.val());

          $(this).css('display', 'none');
      });

      $options.each(function (index) {
          var $this = $(this);
          var $currentDiv = $('<div />')
              .addClass('dropdown-item')
              .attr('data-value', $this.val())
              .attr('data-index', index)
              .text($this.text());

          $currentDiv.appendTo($divOptionsContainer);
      });

      $divContainer.append($current);
      $divContainer.append($divOptionsContainer);
      $divContainer.appendTo('body');
  };
}

//console.log($('select').children());

module.exports = solve;