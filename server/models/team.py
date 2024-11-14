from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Team(db.Model, SerializerMixin):
    __tablename__ = "teams"

    serialize_rules=(
        '-team_players.team',
        '-team_players.player.team_players',
        '-team_players.player.teams',
        '-team_players.player_id',
        '-team_players.team_id',
        '-players'
    )

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="teams")
    team_players = db.relationship("TeamPlayer", back_populates="team", cascade="all, delete-orphan")
    players = db.relationship("Player", secondary="team_players", back_populates="teams", overlaps="team_players")
    
    @validates("name")
    def validate_name(self, key, name):
        if name == None:
            raise ValueError("Name must exist")
        elif name == "":
            raise ValueError("Name cannot be blank")
        
        return name
    
    def __repr__(self):
        return f'<Team id={self.id} name={self.name}>'