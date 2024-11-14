from config import app, db
from models.models import *

with app.app_context():
  print("deleting data...")

  Team.query.delete()
  Player.query.delete()
  TeamPlayer.query.delete()

  db.session.commit()

  print("Seeding data")

  team_1 = Team(name="Eagles")
  team_2 = Team(name="Ravens")
  db.session.add_all([team_1, team_2])
  db.session.commit()

  player_1 = Player(name="Saquon Barkley")
  player_2 = Player(name="Jalen Hurts")

  player_3 = Player(name="Lamar Jackson")
  player_4 = Player(name="Mark Andrews")

  db.session.add_all([player_1, player_2, player_3, player_4])
  db.session.commit()

  team_player_1 = TeamPlayer(player_id=player_1.id, team_id=team_1.id)
  team_player_2 = TeamPlayer(player_id=player_2.id, team_id=team_1.id)

  team_player_3 = TeamPlayer(player_id=player_3.id, team_id=team_2.id)
  team_player_4 = TeamPlayer(player_id=player_4.id, team_id=team_2.id)

  db.session.add_all([team_player_1, team_player_2, team_player_3, team_player_4])
  db.session.commit()

  print("Done seeding")
