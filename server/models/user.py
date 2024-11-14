from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

# Define the User model, which inherits from db.Model and SerializerMixin
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    # Define serialization rules to exclude certain fields from the serialized output
    serialize_rules = (
        '-_password_hash', 
        '-teams.user'      
    )

    # Define the columns for the users table
    id = db.Column(db.Integer(), primary_key=True) 
    username = db.Column(db.String(), unique=True) 
    _password_hash = db.Column(db.String())         

    # Define relationships
    teams = db.relationship("Team", back_populates="user")  # One-to-many relationship with the Team model

    # Define a hybrid property for password_hash to prevent direct access
    @hybrid_property
    def password_hash(self):
        raise Exception("Cannot access password hash")

    # Define a setter for the password_hash property to hash the password before storing it
    @password_hash.setter
    def password_hash(self, password):
        pw_hash = bcrypt.generate_password_hash(password)  
        self._password_hash = pw_hash.decode('utf-8')     

    # Define a method to authenticate a user by checking the password
    def authenticate(self, password):
        # Check if the provided password matches the stored hash
        return bcrypt.check_password_hash(self._password_hash, password) 

    # Define a string representation for the User model
    def __repr__(self):
        return f'<User id={self.id} username={self.username}>'