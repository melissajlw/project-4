from flask import request, session
from config import db, api
from models.models import Player
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Define the PlayersResource class to handle player-related API requests
class PlayersResource(Resource):
    # GET /players
    def get(self):
        # Retrieve all players from the database and convert them to dictionaries
        players = [player.to_dict() for player in Player.query.all()]
        return players
    
    # POST /players
    def post(self):
        # Get JSON data from the request
        data = request.get_json()
        name = data.get("name")
        try:
            # Create a new player and add it to the database
            player = Player(name=name)
            db.session.add(player)
            db.session.commit()
            return player.to_dict(), 201
        except IntegrityError:
            # Handle integrity errors (e.g., duplicate names)
            return {"error": "Name must exist"}, 422
        except ValueError as e:
            # Handle validation errors
            return {"error": f'{str(e)}'}, 422

# Add the PlayersResource to the API with the endpoint /api/players
api.add_resource(PlayersResource, "/api/players")