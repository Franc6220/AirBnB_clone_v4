#!/usr/bin/python3
""" Starts a Flask web application """
from flask import Flask, render_template
import uuid
from models import storage

app = Flask(__name__)

@app.teardown_appcontext
def teardown_db(exception):
    """ Close storage session """
    storage.close()

@app.route('/0-hbnb/')
def display_hbnb():
    """ Display the HBNB HTML page """
    cache_id = uuid.uuid4()
    states = storage.all("State").values()
    amenities = storage.all("Amenity").values()
    places = storage.all("Place").values()
    return render_template('0-hbnb.html', states=states, amenities=amenities, places=places, cache_id=cache_id)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

