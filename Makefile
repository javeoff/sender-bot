run:
	docker run -d --name tg-bot-sender \
		--network=sendbot-network \
		javeoff/tg-bot-sender \
		npm start
create-network:
	docker network create -d bridge sendbot-network
rm-network:
	docker network rm sendbot-network
migration:
	docker run --rm \
		--network=sendbot-network \
		javeoff/tg-bot-sender \
		npm run migration
logs:
	docker logs tg-bot-sender -f
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
rm-redis:
	docker rm -f myredis
rm-postgres:
	docker rm -f postgres_host
rm-clickhouse:
	docker rm -f clickhouse_host
redis:
	docker run -d -v ~/.redis:/usr/local/etc/redis --name myredis --network=sendbot-network redis redis-server
postgres:
	docker run -d --name postgres_host \
		-e POSTGRES_USER=root \
		-e POSTGRES_PASSWORD=root \
		-e POSTGRES_DB=sendbot \
		-e PGDATA=/var/lib/postgresql/data/pgdata \
		-v ~/.postgres:/var/lib/postgresql/data \
		--network=sendbot-network \
		-p 9001:5432 \
		postgres \
		-c shared_buffers=256MB \
		-c max_connections=200
clickhouse:
	docker run -d \
		--name clickhouse_host \
		-e CLICKHOUSE_DB=sendbot \
		-e CLICKHOUSE_USER=root \
		-e CLICKHOUSE_PASSWORD=root \
		-v ~/clickhouse/ch_data):/var/lib/clickhouse/ \
		--network=sendbot-network \
		-p 9000:9000/tcp \
		-p 18123:8123 \
		clickhouse/clickhouse-server
