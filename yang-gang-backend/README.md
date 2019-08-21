Steps for Installation:
===
If running locally, it's just three steps:
1. cd to directory with 'docker-compose.yml'
2. run 'docker-compose build'
3. run 'docker-compose up'

That's it! If you make a code change, you need to rebuild the containers. For some reason, the volume mount isn't working. Also, if you don't have docker you should download it from online and start it up.

### Instructions for Deploying on AWS:

0. In app.py and poller.py, uncomment the line 
"r = Redis(host='localhost', port=6379)" and comment out the other line where
host='redis'. This is important because the redis hostname is different on AWS.

1. We need to build the images and deploy to ECR so that docker-compose can access them. I've already created ECR repositories
for my containers, so we just need to run the following commands.
    
    - cd poller
    - docker build -t poller .
    - docker tag poller:latest 407985344618.dkr.ecr.us-east-2.amazonaws.com/poller:latest
    - docker push 407985344618.dkr.ecr.us-east-2.amazonaws.com/poller:latest
    
    - cd app
    - docker build -t yanggang .
    - docker tag yanggang:latest 407985344618.dkr.ecr.us-east-2.amazonaws.com/yanggang:latest
    - docker push 407985344618.dkr.ecr.us-east-2.amazonaws.com/yanggang:latest
    
    Note: You might need to run $(aws ecr get-login --no-include-email --region us-east-2) to re-login to AWS.
    
2. If for some reason you need to create the cluster again, follow the tutorial at https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-cli-tutorial-fargate.html
 to create a Fargate cluster on ECS.
 
3. Once the cluster is created, run the following command to launch the containers. Note that I have assumed here that the 
project name is "yang"

    ecs-cli compose --file docker-compose-aws.yml --project-name yang service up --create-log-groups --cluster-config yang
    
    Note that AWS uses a different docker-compose file. This is because certain commands like "volume" don't work on AWS,
    and also we need to configure the log groups and image locations differently. Please do not edit the local docker file.

4. To get the endpoint URL that the server is running on, just run:

    ecs-cli compose --project-name yang service ps --cluster-config yang
