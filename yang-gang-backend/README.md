Steps for Installation:
===
1. Download Docker Desktop for Mac (https://hub.docker.com/editions/community/docker-ce-desktop-mac)
2. Install/Open Docker. You should see a whale icon next to your wifi icon.
3. cd /YangGang/yang-gang-backend
4. run 'docker build -t yanggang:latest .' This should only take some time the first time through.
5. run 'docker run --name yanggang -d -p 8000:5000 --rm yanggang:latest' to start the server in background. If you remove '-d' it will start in the foreground.
6. That's it! Server will be up and running at http://localhost:8000/. Check out http://localhost:8000/docs for the Swagger view.

If you are running the server in the background and want to stop it, you should run 'docker stop <container_id>'. The container_id can be found by running 'docker container ls'.
