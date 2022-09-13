run:
	docker run -d --name tg-bot-sender \
		--network=sendbot-network \
		javeoff/tg-bot-sender \
		npm start
migration:
	docker run --rm \
		--network=sendbot-network \
		javeoff/tg-bot-sender \
		npm run migration
run-env:
	docker run -d --rm --env-file ./.env --name tg-bot-sender javeoff/tg-bot-sender
stop:
	docker stop tg-bot-sender
build:
	docker build -t javeoff/tg-bot-sender -f ./.docker/node/Dockerfile .
rmi:
	docker rmi javeoff/tg-bot-sender -f
rm:
	docker rm -f tg-bot-sender
redis:
	docker run -d -v /Users/daniiljave/.redis:/usr/local/etc/redis --name myredis --network=sendbot-network redis redis-server
postgres:
	docker run -d --name postgres_host \
		-e POSTGRES_USER=root \
		-e POSTGRES_PASSWORD=root \
		-e POSTGRES_DB=sendbot \
		-e PGDATA=/var/lib/postgresql/data/pgdata \
		-v /Users/daniiljave/.postgres:/var/lib/postgresql/data \
		--network=sendbot-network \
		postgres \
		-c shared_buffers=256MB \
		-c max_connections=200
logs:
	docker logs
