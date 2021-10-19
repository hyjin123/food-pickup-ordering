$(() => {

  $(".search-bar").on('input', function() {
    // this is the text inside the searchbox at any given time
    let searchText = $("#floatingTextarea").val().toLowerCase();
    // hide all element first
    $('.col').hide();
    // iterate through the elements that has class .col
    $('.col').map(function() {
      // if any of the element has the text in their title or description, show the element
     if($(this).find(".card-title").text().toLowerCase().includes(searchText) ||
     $(this).find(".card-text").text().toLowerCase().includes(searchText)) {
       $(this).show();
     }
    })
  });

})
