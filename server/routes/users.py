from flask import request, session
from config import db, api
from flask_restful import Resource
from models.models import User
from sqlalchemy.exc import IntegrityError

class CheckCurrentUser(Resource):
  # GET /api/check-current-user
  def get(self):
    user = User.query.get(session.get("user_id"))
    if user:
      return user.to_dict(), 200
    else:
      return {}, 204

api.add_resource(CheckCurrentUser, "/api/check-current-user")

class SignupResource(Resource):
  # POST /api/signup
  def post(self):
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
      user = User(username=username)
      user.password_hash = password

      db.session.add(user)
      db.session.commit()

      session["user_id"] = user.id

      return user.to_dict(), 201
    except IntegrityError:
      return {"error": "Username already taken"}, 422
    except ValueError as error:
      return {"error": str(error)}, 422

api.add_resource(SignupResource, "/api/signup")

class LoginResource(Resource):
  # POST /api/login
  def post(self):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.authenticate(password):
      session["user_id"] = user.id
      return user.to_dict(), 200
    else:
      return {"error": "Username or Password didn't match"}, 422

api.add_resource(LoginResource, "/api/login")

class LogoutResource(Resource):
  # DELETE /api/logout
  def delete(self):
    if session.get("user_id"):
      del session["user_id"]
      return {}, 204
    else:
      return {"error": "Already logged out"}, 400
  
api.add_resource(LogoutResource, "/api/logout")

class UsersResource(Resource):
  # GET /api/users
  def get(self):
    users = [user.to_dict() for user in User.query.all()]
    return users, 200
  
api.add_resource(UsersResource, '/api/users')

class UserResource(Resource):
  # GET /api/users/<int:id>
  def get(self, id):
    user = User.query.get(id)
    return user.to_dict(), 200
  
api.add_resource(UserResource, '/api/users/<int:id>')

class CheckCurrentUser(Resource):
  # GET /api/check-current-user
  def get(self):
    user = User.query.get(session.get("user_id"))
    if user:
      return user.to_dict(), 200
    else:
      return {}, 204

api.add_resource(CheckCurrentUser, "/api/check-current-user")

class SignupResource(Resource):
  # POST /user
  def post(self):
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
      user = User(username=username)
      user.password_hash = password

      db.session.add(user)
      db.session.commit()

      session["user_id"] = user.id

      return user.to_dict(), 201
    except IntegrityError:
      return {"error": "Username already taken"}, 422
    except ValueError as error:
      return {"error": str(error)}, 422

api.add_resource(SignupResource, "/api/signup")

class LoginResource(Resource):
  # POST /user
  def post(self):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.authenticate(password):
      session["user_id"] = user.id
      return user.to_dict(), 200
    else:
      return {"error": "Username or Password didn't match"}, 422

api.add_resource(LoginResource, "/api/login")

class LogoutResource(Resource):
  # DELETE /user
  def delete(self):
    if session.get("user_id"):
      del session["user_id"]
      return {}, 204
    else:
      return {"error": "Already logged out"}, 400
  
api.add_resource(LogoutResource, "/api/logout")

class UsersResource(Resource):
  # GET /user
  def get(self):
    users = [user.to_dict() for user in User.query.all()]
    return users, 200
  
api.add_resource(UsersResource, '/api/users')

class UserResource(Resource):
  # GET /user/int:id
  def get(self, id):
    user = User.query.get(id)
    return user.to_dict(), 200
  
api.add_resource(UserResource, '/api/users/<int:id>')