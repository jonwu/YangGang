"""add instagram followers table

Revision ID: 5a121c2336d1
Revises: 6691b1d6155b
Create Date: 2019-09-16 17:16:59.856247

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a121c2336d1'
down_revision = '6691b1d6155b'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'instagram_stats',
        sa.Column('id', sa.DateTime(), primary_key=True, autoincrement=False,
                  server_default=sa.func.current_timestamp()),
        sa.Column('num_followers_yang', sa.Integer),
        sa.Column('num_followers_sanders', sa.Integer),
        sa.Column('num_followers_warren', sa.Integer),
        sa.Column('num_followers_buttigieg', sa.Integer),
        sa.Column('num_followers_kamala', sa.Integer),
        sa.Column('num_followers_biden', sa.Integer)
    )


def downgrade():
    pass
