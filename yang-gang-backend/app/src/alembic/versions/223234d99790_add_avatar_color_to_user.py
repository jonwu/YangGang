"""add avatar color to user

Revision ID: 223234d99790
Revises: 866b658b4bc6
Create Date: 2019-12-16 01:05:00.337640

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '223234d99790'
down_revision = '866b658b4bc6'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('user', sa.Column('avatar_color', sa.Text()))


def downgrade():
    pass
