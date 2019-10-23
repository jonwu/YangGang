"""add trump and tulsi stats

Revision ID: 587b6882db88
Revises: 1c619367db87
Create Date: 2019-10-20 17:30:52.310599

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '587b6882db88'
down_revision = '1c619367db87'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('instagram_stats', sa.Column('num_followers_gabbard', sa.Integer))
    op.add_column('instagram_stats', sa.Column('num_followers_trump', sa.Integer))

    op.add_column('twitter_stats', sa.Column('num_followers_gabbard', sa.Integer))
    op.add_column('twitter_stats', sa.Column('num_followers_trump', sa.Integer))

    op.add_column('reddit_stats', sa.Column('num_followers_gabbard', sa.Integer))
    op.add_column('reddit_stats', sa.Column('num_followers_trump', sa.Integer))


def downgrade():
    pass
