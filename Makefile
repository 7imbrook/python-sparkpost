all: front back push

front:
	docker build -t 7imbrook/sneak-speak:frontend frontend/
back:
	docker build -t 7imbrook/sneak-speak:backend backend/
push:
	docker push 7imbrook/sneak-speak

deploy:
	docker stack deploy -c docker-compose.yml sneakspeak
