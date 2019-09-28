"""add events table

Revision ID: 3fe554051763
Revises: 5a121c2336d1
Create Date: 2019-09-26 14:56:20.733930

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3fe554051763'
down_revision = '5a121c2336d1'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'events',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('created_date', sa.DateTime(),
                  server_default=sa.func.current_timestamp()),
        sa.Column('image', sa.Text()),
        sa.Column('title', sa.Text()),
        sa.Column('location', sa.Text()),
        sa.Column('event_date', sa.DateTime()),
        sa.Column('link', sa.Text()),
    )


def downgrade():
    pass
