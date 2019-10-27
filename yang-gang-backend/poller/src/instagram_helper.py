from constants import *
import hashlib
import sys
import time
import requests
import json
from datetime import datetime
import traceback


def get_ig_gis(rhx_gis, params):
    data = rhx_gis + ":" + params
    if sys.version_info.major >= 3:
        return hashlib.md5(data.encode('utf-8')).hexdigest()
    else:
        return hashlib.md5(data).hexdigest()


def update_ig_gis_header(params, session):
    session.headers.update({
        'x-instagram-gis': get_ig_gis(
            "",
            params
        )
    })


def fetch_instagram(r, candidate_name, instagram_id):
    start = time.time()
    with requests.Session() as session:
        session.headers.update({'Referer': BASE_URL, 'user-agent': STORIES_UA})
        req = session.get(BASE_URL)
        session.headers.update({'X-CSRFToken': req.cookies['csrftoken']})
        session.headers.update({'user-agent': CHROME_WIN_UA})
        params = QUERY_MEDIA_VARS.format(instagram_id, '')  # TODO: add config to this file
        update_ig_gis_header(params, session)
        try:
            media = json.loads(session.get(QUERY_MEDIA.format(params)).text)['data']['user']['edge_owner_to_timeline_media']['edges']
            # remove 'node' key wrapper
            media = [x['node'] for x in media]
            for m in media:
                if m['__typename'] == 'GraphVideo':
                    m['actual_url'] = json.loads(requests.get(VIEW_MEDIA_URL.format(m['shortcode'])).text)['graphql']['shortcode_media']['video_url']
                else:
                    m['actual_url'] = None
            redis_key = '{}_instagram'.format(candidate_name)
            r.set(redis_key, json.dumps(media))
            end = time.time()
            print('fetched {} instagram items at {} in {} seconds, inserted into {}'.format(len(media),
                                                                                                datetime.now(),
                                                                                                end - start,
                                                                                                redis_key))
            session.cookies.clear()
        except:
            traceback.print_exc()
            session.cookies.clear()
