window.onload = function() {
  $('#error-section').text('');
  $('#formatted-amount').text('Money: $ _____.__');

  $('#submit-format').click(function() {
    var textContent = $('#number-input').val();
    console.log('VALUE OF INPUT IS %s', textContent);
    var request = $.ajax({
      url: '/format/money/' + textContent,
      method: 'GET',
    });

    request.done(function(response) {
      $('#error-section').text('');
      $('#formatted-amount').text('Money: $' + response);
    });

    request.fail(function(jqXHR, textStatus) {
      $('#formatted-amount').text('Money: $ _____.__');
      $('#error-section').text(
        'Error: ' +
          jqXHR.status +
          ' ' +
          jqXHR.statusText +
          ' ' +
          jqXHR.responseText,
      );
    });
  });
};
