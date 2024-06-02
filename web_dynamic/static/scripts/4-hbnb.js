$(document).ready(function() {
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

    // Event listener for button click
    $('button').click(function() {
        var amenities = [];
        $('input[type="checkbox"]:checked').each(function() {
            amenities.push($(this).data('id'));
        });
        fetchPlaces({ amenities: amenities });
    });
});

