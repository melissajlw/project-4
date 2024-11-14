from flask import request, session
from config import db, api
from models.models import Player
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

class PlayersResource(Resource):
    def get(self):
        players = [player.to_dict() for player in Player.query.all()]
        return players
    
    def post(self):
        data = request.get_json()
        name = data.get("name")
        try:
            player = Player(name=name)
            db.session.add(player)
            db.session.commit()
            return player.to_dict(), 201
        except IntegrityError:
            return {"error": "Name must exist"}, 422
        except ValueError as e:
            return {"error": f'{str(e)}'}, 422
        
api.add_resource(PlayersResource, "/api/players")