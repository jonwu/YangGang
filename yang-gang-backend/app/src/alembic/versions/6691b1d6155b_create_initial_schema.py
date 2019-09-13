"""create initial schema

Revision ID: 6691b1d6155b
Revises: 
Create Date: 2019-09-11 09:15:58.475107

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6691b1d6155b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'user',
        sa.Column('id', sa.Text(), primary_key=True, autoincrement=False),
        sa.Column('created_date', sa.DateTime, server_default=sa.func.current_timestamp()),
        sa.Column('status', sa.Text()),
        sa.Column('handle', sa.String(40))
    )

    op.create_table(
        'thread',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.String(40), sa.ForeignKey('user.id')),
        sa.Column('created_date', sa.DateTime, server_default=sa.func.current_timestamp()),
        sa.Column('title', sa.Text()),
        sa.Column('body', sa.Text()),
    )

    op.create_table(
        'comment',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.String(40), sa.ForeignKey('user.id')),
        sa.Column('created_date', sa.DateTime, server_default=sa.func.current_timestamp()),
        sa.Column('thread_id', sa.Integer, sa.ForeignKey('thread.id')),
        sa.Column('body', sa.Text()),
    )

    op.create_table(
        'twitter_stats',
        sa.Column('id', sa.DateTime(), primary_key=True, autoincrement=False, server_default=sa.func.current_timestamp()),
        sa.Column('num_followers', sa.Integer),
    )

    # https://subredditstats.com/r/YangForPresidentHQ
    reddit_table = op.create_table(
        'reddit_stats',
        sa.Column('id', sa.DateTime(), primary_key=True, autoincrement=False, server_default=sa.func.current_timestamp()),
        sa.Column('num_followers', sa.Integer),
    )

    # with open('reddit_followers.csv', newline='') as csvfile:
    #     csv_reader = csv.reader(csvfile, delimiter=',')
    #     data = [{'id': i,
    #              'timestamp': row[0].split(' ')[0],
    #              'num_followers': int(row[1]) if row[1] != '' else 0} for i, row in enumerate(csv_reader)]
    #     op.bulk_insert(reddit_table, data)

    op.create_table(
        'youtube_stats',
        sa.Column('id', sa.DateTime(), primary_key=True, autoincrement=False, server_default=sa.func.current_timestamp()),
        sa.Column('num_views', sa.Integer),
    )


def downgrade():
    op.drop_table('user')
