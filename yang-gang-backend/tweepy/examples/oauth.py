from __future__ import absolute_import, print_function

import tweepy
import json

# == OAuth Authentication ==
#
# This mode of authentication is the new preferred way
# of authenticating with Twitter.

# The consumer keys can be found on your application's Details
# page located at https://dev.twitter.com/apps (under "OAuth settings")
consumer_key="UgNuDDnG4aD0vuakNHHGzRqHI"
consumer_secret="KD0yJfipBTBJ2tp0nLjGof2zDpSp3o7CEbTvXwKHOEUFiZJg2r"

# The access tokens can be found on your applications's Details
# page located at https://dev.twitter.com/apps (located
# under "Your access token")
access_token="885251996608978945-4S2COwbMyG7DnC77ROxYvJERXuvJsS1"
access_token_secret="XmcTgSjOEGo3CVRBzRd54WNJx8TcBF8xnsCdy9xbupYyR"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)
user = api.get_user('AndrewYang')
timeline = api.user_timeline('AndrewYang', tweet_mode='extended')
single = json.dumps(timeline[2]._json, indent=4, sort_keys=True)
print(single)

# If the authentication was successful, you should
# see the name of the account print out
print(api.me().name)

# If the application settings are set for "Read and Write" then
# this line should tweet out the message to your account's
# timeline. The "Read and Write" setting is on https://dev.twitter.com/apps
# api.update_status(status='Updating using OAuth authentication via Tweepy!')
