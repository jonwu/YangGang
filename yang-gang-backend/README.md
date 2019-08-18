Steps for Installation:
===
If running locally, it's just three steps:
1. cd to directory with 'docker-compose.yml'
2. run 'docker-compose build'
3. run 'docker-compose up'

That's it! If you make a code change, you need to rebuild the containers. For some reason, the volume mount isn't working. Also, if you don't have docker you should download it from online and start it up.

To deploy on AWS, follow the tutorial at:
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-cli-tutorial-fargate.html

I've pretty much done all the steps, so we shouldn't have to repeat this again.

Another useful link is:
https://www.bogotobogo.com/DevOps/Docker/Docker-ECS-Service-Dicsovery-Redis-Flask.php
