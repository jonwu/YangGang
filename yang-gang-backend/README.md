Steps for Installation:
===
If running locally, it's just three steps:
1. cd to directory with 'docker-compose.yml'
2. run 'docker-compose build'
3. run 'docker-compose up'

That's it! If you make a code change, you need to rebuild the containers. For some reason, the volume mount isn't working. Also, if you don't have docker you should download it from online and start it up.

### Instructions for Deploying on AWS (Prod):
1. run 'ssh -i ./yangpair.pem ec2-user@ec2-54-185-34-163.us-west-2.compute.amazonaws.com' to connect to the EC2 instance.
2. run 'git pull origin master'
3. run docker-compose -f docker-compose-prod.yml build
4. run docker-compose -f docker-compose-prod.yml up

TODO: I need to figure out volumes so that we don't completely wipe the database every time we do docker-compose down.
