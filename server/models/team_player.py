from config import db
from sqlalchemy_serializer import SerializerMixin

class TeamPlayer(db.Model, SerializerMixin):
    __tablename__ = "team_players"

    serialize_rules=(
        '-player.team_players',
        '-player.teams',
        '-team.players',
        '-team.team_players',
        '-player_id',
        '-team_id'
    )

    id = db.Column(db.Integer(), primary_key=True)
    team_id = db.Column(db.Integer(), db.ForeignKey("teams.id"))
    player_id = db.Column(db.Integer(), db.ForeignKey("players.id"))
    order_number = db.Column(db.Integer())

    player = db.relationship("Player", back_populates="team_players", overlaps="players,teams")
    team = db.relationship("Team", back_populates="team_players", overlaps="players,teams")

    def __repr__(self):
        return f'<TeamPlayer id={self.id} team_id={self.team_id} player_id={self.player_id} order_number={self.order_number}>'