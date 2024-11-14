from flask import request
from config import db, api
from models.models import TeamPlayer, Team
from flask_restful import Resource

class TeamPlayersResource(Resource):
    # GET /team_players
    def get(self):
        team_players = [team_player.to_dict() for team_player in TeamPlayer.query.all()]
        return team_players
    
    # POST /team_players
    def post(self):
        data = request.get_json()
        player_id = data.get("player_id")
        team_id = data.get("team_id")
        team = Team.query.get(team_id)
        order_number = len(team.team_players) + 1

        team_player = TeamPlayer(player_id=player_id, team_id=team_id, order_number=order_number)

        db.session.add(team_player)
        db.session.commit()

        return team_player.to_dict(), 201

api.add_resource(TeamPlayersResource, "/api/team_players")

class TeamPlayerResource(Resource):
    # PATCH /team_players
    def patch(self, id):
        tp = TeamPlayer.query.get(id)
        data = request.get_json()
        order_number = data.get("order_number")
        tp.order_number = order_number
        db.session.add(tp)
        db.session.commit()

        return tp.to_dict(), 200

api.add_resource(TeamPlayerResource, "/api/team_players/<int:id>")