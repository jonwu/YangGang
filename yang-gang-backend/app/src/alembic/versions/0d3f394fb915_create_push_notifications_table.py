"""create push notifications table

Revision ID: 0d3f394fb915
Revises: 3fe554051763
Create Date: 2019-10-08 21:51:54.740832

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d3f394fb915'
down_revision = '3fe554051763'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'push_notifications',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('created_date', sa.DateTime(),
                  server_default=sa.func.current_timestamp()),
        sa.Column('expo_id', sa.Text()),
        sa.Column('event_id', sa.Integer, sa.ForeignKey('events.id')),
        sa.Column('num_retries', sa.Integer, default=0),
        sa.Column('error_message', sa.Text()),
    )


def downgrade():
    pass
