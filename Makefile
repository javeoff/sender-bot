run:
	docker run -d --rm --name tg-bot-sender javeoff/tg-bot-sender
run-env:
	docker run -d --rm --env-file ./.env --name tg-bot-sender javeoff/tg-bot-sender
stop:
	docker stop tg-bot-sender
build:
	docker build -t javeoff/tg-bot-sender -f ./.docker/node/Dockerfile .
rmi:
	docker rmi javeoff/tg-bot-sender -f
rm:
	docker rm tg-bot-sender
