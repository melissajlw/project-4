from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

# Define the Team model, which inherits from db.Model and SerializerMixin
class Team(db.Model, SerializerMixin):
    __tablename__ = "teams"

    # Define serialization rules to exclude certain fields from the serialized output
    serialize_rules = (
        '-team_players.team',  
        '-team_players.player.team_players',  
        '-team_players.player.teams',  
        '-team_players.player_id',  
        '-team_players.team_id',  
        '-players'  
    )

    # Define the columns for the teams table
    id = db.Column(db.Integer(), primary_key=True)  
    name = db.Column(db.String(), unique=True)  
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))  

    # Define relationships
    user = db.relationship("User", back_populates="teams")  # Many-to-one relationship with the User model
    team_players = db.relationship("TeamPlayer", back_populates="team", cascade="all, delete-orphan")  # One-to-many relationship with the TeamPlayer model
    players = db.relationship("Player", secondary="team_players", back_populates="teams", overlaps="team_players")  # Many-to-many relationship with the Player model

    # Validate the name field to ensure it is not None or blank
    @validates("name")
    def validate_name(self, key, name):
        if name is None:
            raise ValueError("Name must exist")
        elif name == "":
            raise ValueError("Name cannot be blank")
        return name

    # Define a string representation for the Team model
    def __repr__(self):
        return f'<Team id={self.id} name={self.name}>'