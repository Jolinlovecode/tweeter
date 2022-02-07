/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // prevents XSS
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //get tweets from the database and call the render function
  const loadTweets = () => {
    $.ajax({
      url: '/tweets', // === localhost:8080/tweets
      method: 'GET',
      success: (data) => {
        renderTweets(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  };
  loadTweets();

  $('.new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

      if ($('.form-textarea').val().length > 140) {
        $('.error-container').empty();
        $('.error-container').append(`<i class="fas fa-exclamation-triangle"></i><h4 class='error'> Too long </h4><i class="fas fa-exclamation-triangle"></i>`);
        $('.error-container').slideDown("fast");
        $('.form-textarea').val('').empty();
      } else if ($('.form-textarea').val() === '') {
        $('.error-container').empty();
        $('.error-container').append(`<i class="fas fa-exclamation-triangle"></i><h4 class='error'> Empty!</h4><i class="fas fa-exclamation-triangle"></i>`);
        $('.error-container').slideDown("fast");
      } else {
        $.post('/tweets', serializedData, (response) => {
          $('.error-container').empty();
          $('.form-textarea').val('').empty();
          loadTweets();
        });
      }
    });

  //loop through the tweets and dynamically render each
  const renderTweets = (tweets) => {
    $('.tweet-container').empty();

    tweets.forEach((tweet) => {
      let $tweetElement = createTweetElement(tweet);
      $('.tweet-container').prepend($tweetElement);
    });
  };

//create the tweet HTML
  const createTweetElement = (tweetData) => {
    let $tweet = $("<article>").addClass('tweet');

    let html = `
      <header class="tweet-header">
        <div id="avatar-name">
          <img class="tweet-avatar" src='${tweetData.user.avatars}'>
          <h2 class="tweet-name">${tweetData.user.name}</h2>
        </div>
          <small class="tweet-handle">${tweetData.user.handle}</small>
      </header>

      <div class="tweet-body">
      <p>${escape(tweetData.content.text)}</p>
      </div>

      <footer class="tweet-footer">
        <small class="footer-age">${timeago.format(tweetData.created_at)}</small>
        <span class="footer-actions">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    <article>
    `;

    let element = $tweet.append(html);
    return element;
  };

});