"""add push id table

Revision ID: 1c619367db87
Revises: 0d3f394fb915
Create Date: 2019-10-17 20:01:32.508381

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c619367db87'
down_revision = '0d3f394fb915'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'push_ids',
        sa.Column('id', sa.String(1024), primary_key=True, autoincrement=False),
    )


def downgrade():
    pass
