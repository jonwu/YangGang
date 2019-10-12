reddit_fields = ['preview', 'thumbnail', 'media', 'id', 'title', 'stickied',
                 'created_utc', 'score', 'url','secure_media', 'domain', 'selftext']

twitter_fields = ['id', 'id_str', 'full_text', 'user', 'extended_entities', 'entities',
                  'retweet_count', 'favorite_count', 'created_at', 'retweeted_status']

youtube_vid_fields = ['id', 'snippet']

youtube_url = 'https://www.googleapis.com/youtube/v3/search'

youtube_vid_url = 'https://www.googleapis.com/youtube/v3/videos'

top_num = 30

top_num_tweets = 50

BASE_URL = 'https://www.instagram.com/'
VIEW_MEDIA_URL = BASE_URL + 'p/{0}/?__a=1'