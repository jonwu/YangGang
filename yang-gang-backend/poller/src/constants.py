reddit_fields = ['preview', 'thumbnail', 'media', 'id', 'title', 'stickied',
                 'created_utc', 'score', 'url','secure_media', 'domain', 'selftext']

twitter_fields = ['id', 'id_str', 'full_text', 'user', 'extended_entities', 'entities',
                  'retweet_count', 'favorite_count', 'created_at', 'retweeted_status']

youtube_vid_fields = ['id', 'snippet']

youtube_url = 'https://www.googleapis.com/youtube/v3/search'

youtube_vid_url = 'https://www.googleapis.com/youtube/v3/videos'

top_num = 30

top_num_tweets = 50

# instagram voodoo
BASE_URL = 'https://www.instagram.com/'
VIEW_MEDIA_URL = BASE_URL + 'p/{0}/?__a=1'
CHROME_WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
STORIES_UA = 'Instagram 52.0.0.8.83 (iPhone; CPU iPhone OS 11_4 like Mac OS X; en_US; en-US; scale=2.00; 750x1334) AppleWebKit/605.1.15'
QUERY_MEDIA_VARS = '{{"id":"{0}","first":30,"after":"{1}"}}'
QUERY_MEDIA = BASE_URL + 'graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={0}'