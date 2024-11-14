from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Player(db.Model, SerializerMixin):
    __tablename__ = "players"

    serialize_rules=(
        '-team_players.player',
        '-team_players.team.team_players',
        '-team_players.team.players',
        '-team_players.player_id',
        '-team_players.team_id',
        '-teams'
    )

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Integer(), nullable=False)

    team_players = db.relationship("TeamPlayer", back_populates="player", cascade="all, delete-orphan")
    teams = db.relationship("Team", secondary="team_players", back_populates="players", overlaps="team_players")

    @validates("name")
    def validate_name(self, key, name):
        if name == "":
            raise ValueError("Name cannot be blank")
        return name
    
    def __repr__(self):
        return f'<Player id={self.id} name={self.name}>'