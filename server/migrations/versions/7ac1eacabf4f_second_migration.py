"""second migration

Revision ID: 7ac1eacabf4f
Revises: 4ba5d0bdaa65
Create Date: 2024-11-13 20:25:39.469867

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ac1eacabf4f'
down_revision = '4ba5d0bdaa65'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('players',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_players'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_teams_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_teams')),
    sa.UniqueConstraint('name', name=op.f('uq_teams_name'))
    )
    op.create_table('team_players',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_id', sa.Integer(), nullable=True),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.Column('order_number', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], name=op.f('fk_team_players_player_id_players')),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], name=op.f('fk_team_players_team_id_teams')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_team_players'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('team_players')
    op.drop_table('teams')
    op.drop_table('users')
    op.drop_table('players')
    # ### end Alembic commands ###
