from constants import *
import json
import requests
from datetime import datetime, date, timedelta


def fetch_news(r, candidate_name, candidate_query, api_key):
    today_datestring = (date.today() - timedelta(days=3)).strftime("%Y-%m-%d")
    params = {
        'qInTitle': candidate_query,
        'language': 'en',
        'sortBy': 'popularity',
        'excludeDomains': 'pjmedia.com, patheos.com, politifact.com, liveleak.com, rightwingwatch.org, slickdeals.net, fark.com, knowyourmeme.com', 'towleroad.com',
        'from': today_datestring,
        'apiKey': api_key,
        'pageSize': '100',
    }
    news_url = 'https://newsapi.org/v2/everything'
    all_articles = requests.get(url=news_url, params=params).json()
    redis_key = '{}_news'.format(candidate_name)
    r.set(redis_key, json.dumps(all_articles))
    print('fetched {} news items at {} with {} datestring, inserted into {}'.format(all_articles['totalResults'],
                                                                  datetime.now(), today_datestring, redis_key))
