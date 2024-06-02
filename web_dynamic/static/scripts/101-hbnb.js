$(document).ready(function() {
    let amenities = {};
    let states = {};
    let cities = {};

    // Function to fetch places
    function fetchPlaces(data) {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(data) {
                $('.places').empty();
                data.forEach(function(place) {
                    var article = $('<article>');
                    article.append('<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
                    article.append('<div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div></div>');
                    article.append('<div class="description">' + place.description + '</div>');
                    $('.places').append(article);
                });
            }
        });
    }

    // Initial fetch of places with empty data
    fetchPlaces({});

    // Event listener for amenity checkbox
    $('input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        if ($(this).is(':checked')) {
            if ($(this).closest('h4').text() === 'Amenities') {
                amenities[id] = name;
            } else if ($(this).closest('h4').text() === 'States') {
                states[id] = name;
            } else {
                cities[id] = name;
            }
        } else {
            delete amenities[id];
            delete states[id];
            delete cities[id];
        }
        updateLocations();
    });

    // Function to update the locations display
    function updateLocations() {
        const locations = Object.values(states).concat(Object.values(cities));
        $('div.locations h4').text(locations.join(', '));
    }

    // Event listener for button click
    $('button').click(function() {
        fetchPlaces({
            amenities: Object.keys(amenities),
            states: Object.keys(states),
            cities: Object.keys(cities)
        });
    });

    // Toggle reviews
    $('.toggle-reviews').click(function() {
        const span = $(this);
        const reviewsDiv = $('.reviews');

        if (span.text() === 'show') {
            $.ajax({
                url: 'http://0.0.0.0:5001/api/v1/reviews/', // Update to correct endpoint if necessary
                success: function(reviews) {
                    reviews.forEach(function(review) {
                        var reviewDiv = $('<div class="review">');
                        reviewDiv.append('<h3>' + review.user + '</h3>'); // Assuming review.user contains the user name
                        reviewDiv.append('<p>' + review.text + '</p>'); // Assuming review.text contains the review text
                        reviewsDiv.append(reviewDiv);
                    });
                    span.text('hide');
                }
            });
        } else {
            reviewsDiv.empty();
            span.text('show');
        }
    });
});

