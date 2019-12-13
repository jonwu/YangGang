"""add chatroom tables

Revision ID: 866b658b4bc6
Revises: 587b6882db88
Create Date: 2019-11-14 21:39:25.557778

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '866b658b4bc6'
down_revision = '587b6882db88'
branch_labels = None
depends_on = None

# User Model (GET / POST / PUT)
# - username (unique) string | null
# - device_token (unique)
# - id (unique)
# - timestamp: date 
#
# Message Model
# - id: unique
# - user_id (UserModel)
# - room_id (RoomModel)
# - message: string
# - timestamp: date
#
# Room_Model (PUT)
# - id: unique
# - title: string | null
# - owner_id: (UserModel | null)
# - timestamp: date

def upgrade():
    op.drop_table('comment')
    op.drop_table('thread')
    op.drop_table('user')
    op.create_table(
        'user',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('device_token', sa.String(100), unique=True),
        sa.Column('created_date', sa.DateTime, server_default=sa.func.current_timestamp()),
        sa.Column('username', sa.String(128), nullable=True)
    )
    op.create_table(
        'room',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('owner_id', sa.Integer, sa.ForeignKey('user.id'), nullable=True),
        sa.Column('created_date', sa.DateTime, server_default=sa.func.current_timestamp()),
        sa.Column('link', sa.Text()),
        sa.Column('tag', sa.Text()),
        sa.Column('title', sa.Text()),
        sa.Column('message_count', sa.Integer, default=0)
    )
    op.create_table(
        'message',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('user.id')),
        sa.Column('created_date', sa.DateTime, server_default=sa.func.current_timestamp()),
        sa.Column('room_id', sa.Integer, sa.ForeignKey('room.id')),
        sa.Column('message', sa.Text()),
    )


def downgrade():
    pass
