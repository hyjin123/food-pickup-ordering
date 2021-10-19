$(() => {

  // creating markup for each menu item
  const createMenuItem = function(item) {
    let $markup = `
    <div class="col">
      <div class="card h-80">
        <img src=${item.image_url} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text card-price">$${item.price}</p>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-primary add-to-cart" name="item" value="${item.id}">ADD TO CART</button>
        </div>
      </div>
    </div>
    `
    return $markup;
  };

  // prepending the markup for each menu item
  const renderMenuItems = function(menu) {
    $('#menu').empty();
    for (const item of menu) {
      const newItem = createMenuItem(item);
      $("#menu").prepend(newItem);
    }
  }

  $(".search-bar").on('input propertychange', function() {
    // this is the text inside the searchbox at any given time
    let searchText = $("#floatingTextarea").val().toLowerCase();
    // make a post request and use that data to render
    $.ajax({
      url: "/api/search",
      type: "POST",
      dataType: "JSON",
      data: {
        search: searchText
      },
      success: (data) => {
        const menu = data.menuItems;
        renderMenuItems(menu);
      }
    })
  });


  // $(document).ready(function() {
  //   $("#tweet-text").on('input propertychange', function() {
  //     let counter = $(this).parent().find(".counter");
  //     counter.text(140 - $(this).val().length);
  //     if (counter.text() < 0) {
  //       counter.addClass("red");
  //     } else {
  //       counter.removeClass("red");
  //     }
  //   });
  // });

})
