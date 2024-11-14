from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

# Define the Player model, which inherits from db.Model and SerializerMixin
class Player(db.Model, SerializerMixin):
    __tablename__ = "players"

    # Define serialization rules to exclude certain fields from the serialized output
    serialize_rules = (
        '-team_players.player',
        '-team_players.team.team_players',
        '-team_players.team.players',
        '-team_players.player_id',
        '-team_players.team_id',
        '-teams'
    )

    # Define the columns for the players table
    id = db.Column(db.Integer(), primary_key=True)  # Primary key column
    name = db.Column(db.String(), nullable=False)  # Name column, cannot be null

    # Define relationships
    team_players = db.relationship("TeamPlayer", back_populates="player", cascade="all, delete-orphan")
    teams = db.relationship("Team", secondary="team_players", back_populates="players", overlaps="team_players")

    # Validate the name field to ensure it is not blank
    @validates("name")
    def validate_name(self, key, name):
        if name == "":
            raise ValueError("Name cannot be blank")
        return name

    # Define a string representation for the Player model
    def __repr__(self):
        return f'<Player id={self.id} name={self.name}>'