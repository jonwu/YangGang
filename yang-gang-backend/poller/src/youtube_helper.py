from constants import *
import requests
from datetime import datetime, timezone, timedelta
import traceback
import json


def get_youtube_params(published_after, api_key, query):
    if published_after is None:
        return {
            'part': 'snippet',
            'order': 'viewCount',
            'q': query,
            'type': 'video',
            'maxResults': str(top_num),
            'key': api_key
        }
    return {
        'part': 'snippet',
        'order': 'viewCount',
        'publishedAfter': published_after,
        'q': query,
        'type': 'video',
        'maxResults': str(top_num),
        'key': api_key
    }


def get_youtube_stat_params(vid_list, api_key):
    return {
        'part': 'contentDetails,statistics',
        'id': ','.join(vid_list),
        'key': api_key
    }


def fetch_youtube(days_lag, candidate_name, redis_suffix, api_key, r, query):
    # setting to default message to avoid null pointer error
    initial_response = 'failed before getting response'
    try:
        if days_lag is not None:
            published_after = (datetime.now(timezone.utc) - timedelta(days=days_lag)).isoformat()
        else:
            published_after = None
        params = get_youtube_params(published_after, api_key, query)

        initial_response = requests.get(url=youtube_url, params=params).json()
        response = initial_response['items']
        vid_ids = [x['id']['videoId'] for x in response]
        redis_key = '{}_{}'.format(candidate_name, redis_suffix)
        print('fetched new youtube items at {} using {} params with api key: {}'.format(datetime.now(),
                                                                                        redis_suffix,
                                                                                        params['key']))
        view_counts = requests.get(url=youtube_vid_url,
                                   params=get_youtube_stat_params(vid_ids, params['key'])).json()['items']
        for i in range(len(response)):
            response[i] = {k: v for k, v in response[i].items() if k in youtube_vid_fields}
            response[i].update(view_counts[i])
        r.set(redis_key, json.dumps(response))
        print('set: {} with: {}'.format(redis_key, response[0]['statistics']))
    except:
        print('exception in getting video responses')
        print('error code: {}'.format(initial_response))
        traceback.print_exc()
