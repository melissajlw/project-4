from flask import request, session
from config import db, api
from models.models import Team
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

class TeamsResource(Resource):
    def get(self):
        teams = [team.to_dict() for team in Team.query.all()]
        return teams
    
    def post(self):
        data = request.get_json()
        name = data.get("name")
        try:
            team = Team(name=name, user_id=session["user_id"])
            db.session.add(team)
            db.session.commit()
            return team.to_dict(), 201
        except IntegrityError:
            return {"error": "Name must be unique"}, 422
        except ValueError as e:
            return {"error": str(e)}, 422

api.add_resource(TeamsResource, "/api/teams")

class TeamResource(Resource):
    def get(self, id):
        team = Team.query.get(id)
        if team:
            return team.to_dict(), 200
        else:
            return {"error": "Team does not exist"}, 400
        
    def patch(self, id):
        data = request.get_json()
        team = Team.query.get(id)
        if team.user.id != session["user_id"]:
            return {"error": "unauthorized"}, 401
        
        try:
            for key in data.keys():
                if hasattr(team, key):
                    setattr(team, key, data.get(key))
            db.session.add(team)
            db.session.commit()
            return team.to_dict(), 200
        except IntegrityError:
            return {"error": "Name must be unique"}, 422
        except ValueError as e:
            return {"error": str(e)}, 422
        
    def delete(self, id):
        team = Team.query.get(id)

        if not team:
            return {"error": "Team does not exist"}, 400
        elif team.user.id != session["user_id"]:
            return {"error": "Unauthorizd"}, 401
        
        db.session.delete(team)
        db.session.commit()
        return {}, 204

api.add_resource(TeamResource, "/api/teams/<int:id>")