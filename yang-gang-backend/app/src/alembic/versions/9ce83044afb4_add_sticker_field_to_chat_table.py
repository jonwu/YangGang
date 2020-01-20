"""add sticker field to chat table

Revision ID: 9ce83044afb4
Revises: 223234d99790
Create Date: 2020-01-20 08:51:15.969855

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ce83044afb4'
down_revision = '223234d99790'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('message', sa.Column('sticker', sa.Text()))


def downgrade():
    pass
