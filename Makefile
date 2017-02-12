all: build push

build: front back

front:
	docker build -t 7imbrook/sneak-speak:frontend frontend/
back:
	docker build -t 7imbrook/sneak-speak:backend backend/
push:
	docker push 7imbrook/sneak-speak

deploy:
	docker stack deploy -c docker-compose.yml sneakspeak
	docker service update --secret-add api_client_token sneakspeak_backend
	docker service update --secret-add weather_token sneakspeak_backend
