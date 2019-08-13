from __future__ import absolute_import, print_function

from tweepy import OAuthHandler, Stream, StreamListener

# Go to http://apps.twitter.com and create an app.
# The consumer key and secret will be generated for you after
consumer_key="UgNuDDnG4aD0vuakNHHGzRqHI"
consumer_secret="KD0yJfipBTBJ2tp0nLjGof2zDpSp3o7CEbTvXwKHOEUFiZJg2r"

# After the step above, you will be redirected to your app's page.
# Create an access token under the the "Your access token" section
access_token="885251996608978945-4S2COwbMyG7DnC77ROxYvJERXuvJsS1"
access_token_secret="XmcTgSjOEGo3CVRBzRd54WNJx8TcBF8xnsCdy9xbupYyR"

class StdOutListener(StreamListener):
    """ A listener handles tweets that are received from the stream.
    This is a basic listener that just prints received tweets to stdout.

    """
    def on_data(self, data):
        print(data)
        return True

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    l = StdOutListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    stream = Stream(auth, l)
    stream.filter(track=['basketball'])
