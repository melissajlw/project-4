from config import db
from sqlalchemy_serializer import SerializerMixin

# Define the TeamPlayer model, which inherits from db.Model and SerializerMixin
class TeamPlayer(db.Model, SerializerMixin):
    __tablename__ = "team_players"

    # Define serialization rules to exclude certain fields from the serialized output
    serialize_rules = (
        '-player.team_players', 
        '-player.teams',        
        '-team.players',        
        '-team.team_players',   
        '-player_id',            
        '-team_id'              
    )

    # Define the columns for the team_players table
    id = db.Column(db.Integer(), primary_key=True) 
    team_id = db.Column(db.Integer(), db.ForeignKey("teams.id"))  
    player_id = db.Column(db.Integer(), db.ForeignKey("players.id")) 
    order_number = db.Column(db.Integer()) 
    
    # Define relationships
    player = db.relationship("Player", back_populates="team_players", overlaps="players,teams")  # Relationship with the Player model
    team = db.relationship("Team", back_populates="team_players", overlaps="players,teams")  # Relationship with the Team model

    # Define a string representation for the TeamPlayer model
    def __repr__(self):
        return f'<TeamPlayer id={self.id} team_id={self.team_id} player_id={self.player_id} order_number={self.order_number}>'