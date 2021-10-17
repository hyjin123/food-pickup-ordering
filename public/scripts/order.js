
$(document).ready(function() {

  const loadItemInOrder = () => {

    $.ajax('/api/orders', {
      method: 'GET',
      dataType: 'json',
      success: (orderData) => {
        console.log(orderData);
        renderItems(orderData.orders);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  };

  loadItemInOrder();

  const addNewItem = (item) => {
    const $selectedItem = $('<tr>').addClass('order-item');
    const $itemName$ = $('<td>').addClass('order-item-name').text(item.name);
    const $quantity = $('<td>').addClass('order-quantity').text(item.quantity);
    const $price = $('<td>').addClass('order-price').text(item.price);

    $selectedItem.append($itemName$, $quantity, $price);

    return $selectedItem;
  };

  const sumItem = (text, num) => {
    const $item = $('<tr>').addClass('order-item');
    const $name = $('<td>').addClass('order-item-name').text(text);
    const $emptyCell = $('<td>').addClass('order-quantity');
    const $summary = $('<td>').addClass('order-price').text(num);

    $item.append($name, $emptyCell, $summary);

    return $item;
  }

  const renderItems = (items) => {
    const $itemContainer = $('#selected-items-container');
    // $itemContainer.empty();
    let totalWtTax = 0;

    for (const item of items) {
      console.log(item);
      totalWtTax += item.price;
      const $selectedItem = addNewItem(item);
      $itemContainer.append($selectedItem);
    }

    const tax = Math.round(totalWtTax * 13) / 100;
    const $subTotal = sumItem('Sub total', totalWtTax);
    const $tax = sumItem('Tax (13%)', tax);
    const $totalWTax = sumItem ('Total', Math.round((totalWtTax + tax) * 100) / 100);


    $itemContainer.append($subTotal, $tax, $totalWTax);

  };
});

/************************************************************* */
  //ref code
  // const loadTweets = () => {

  //   $.ajax('/tweets', {
  //     method: 'GET',
  //     dataType: 'json',
  //     success: (tweetData) => {

  //       //Sort tweets by creation time before rendering all tweets
  //       let tweets = tweetData;
  //       tweets.sort((a, b) => {
  //         return b.created_at - a.created_at;
  //       });

  //       console.log(tweets);

  //       renderTweets(tweets);
  //     },

  //     error: (err) => {
  //       console.log(`Error details: ${err}`);
  //     }

  //   });
  // };

  // loadTweets();

  // const createTweetElement = function(tweet) {
  //   //Create all elements of a tweet
  //   const $tweet = $('<article>').addClass('article-tweet');

  //   const $headerContainer = $('<header>').addClass('article-tweet-header');
  //   const $userContainer = $('<span>').addClass('article-tweet-user');
  //   const $avatar = $('<img>').attr('src', tweet.user.avatars);
  //   const $username = $('<span>').text(tweet.user.name);
  //   const $handle = $('<span>').addClass('article-tweet-handle').text(tweet.user.handle);

  //   const $tweetContent = $('<p>').addClass('article-tweet-content').text(tweet.content.text);

  //   const $footerContainer = $('<footer>').addClass('article-tweet-footer');
  //   const $createdTime = $('<span>').addClass('tweet-age').text(timeago.format(tweet.created_at));

  //   const $iconContainer = $('<span>').addClass('article-tweet-icons');
  //   const $flagIcon = $('<i>').addClass('fas fa-flag');
  //   const $retweeticon = $('<i>').addClass('fas fa-retweet');
  //   const $heartIcon = $('<i>').addClass('fas fa-heart');
  //   //Append elements to sub containers, then append usb containers to a tweet
  //   $userContainer.append($avatar, $username);
  //   $headerContainer.append($userContainer, $handle);

  //   $iconContainer.append($flagIcon, $retweeticon, $heartIcon);
  //   $footerContainer.append($createdTime, $iconContainer);

  //   $tweet.append($headerContainer, $tweetContent, $footerContainer);

  //   return $tweet;
  // }

  // const renderTweets = (tweets) => {
  //   const $tweetContainer = $('#tweets-container');
  //   $tweetContainer.empty();

  //   for (const tweet of tweets) {
  //     const $tweet = createTweetElement(tweet);
  //     $tweetContainer.append($tweet);
  //   }
  // };

  // const $form = $('#new-tweet');
  // $form.on('submit', function(event) {
  //   event.preventDefault();


  //   //Validate if the new tweet is empty or too long and display related messages
  //   const inputTweet = $(this)[0][0].value;
  //   $('.error-message').hide();
  //   if (inputTweet.length < 1) {
  //     $('#error-empty').show(400);
  //   } else if (inputTweet.length > 140) {
  //     $('#error-exceed-length').show(400);
  //   } else {
  //     $('.error-message').hide();
  //     const serializeData = $(this).serialize();

  //     $(this)[0].reset();

  //     $.post('/tweets', serializeData, function(response) {
  //       loadTweets();
  //     });

  //   }

  // });

