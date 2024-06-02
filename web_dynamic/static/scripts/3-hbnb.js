$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
            // Loop through the result and create article tags for each place
            data.forEach(function(place) {
                var article = $('<article>');
                // Add details of the place to the article tag
                article.append('<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
                // Add other details as needed
                // Append the article tag to the section with class places
                $('.places').append(article);
            });
        }
    });
});

