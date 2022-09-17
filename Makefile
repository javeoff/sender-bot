-include .env
-include .env.local

run:
	docker run -d --name $(CONTAINER_NAME) \
		--network=$(NETWORK_NAME) \
		$(IMAGE_NAME) \
		npm start
create-network:
	docker network create -d bridge $(NETWORK_NAME)
rm-network:
	docker network rm $(NETWORK_NAME)
migration:
	docker run --rm \
		--network=$(NETWORK_NAME) \
		javeoff/tg-bot-sender \
		npm run migration
logs:
	docker logs -ft $(CONTAINER_NAME)
run-env:
	docker run -d --rm --env-file ./.env --name $(CONTAINER_NAME) $(IMAGE_NAME)
stop:
	docker stop $(CONTAINER_NAME)
build:
	docker build -t $(IMAGE_NAME) -f ./.docker/node/Dockerfile .
rmi:
	docker rmi $(IMAGE_NAME) -f
rm:
	docker rm -f $(CONTAINER_NAME)
rm-redis:
	docker rm -f $(REDIS_HOST)
rm-postgres:
	docker rm -f $(DB_HOST)
rm-clickhouse:
	docker rm -f $(CLICKHOUSE_HOST)
redis:
	docker run -d \
		-v ~/.redis:/usr/local/etc/redis \
		--name $(REDIS_HOST) \
		--network=$(NETWORK_NAME) \
		-p $(REDIS_EXTERNAL_PORT):$(REDIS_PORT) \
		redis redis-server
postgres:
	docker run -d --name $(DB_HOST) \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASSWORD) \
		-e POSTGRES_DB=$(DB_NAME) \
		-e PGDATA=/var/lib/postgresql/data/pgdata \
		-v ~/.postgres:/var/lib/postgresql/data \
		--network=$(NETWORK_NAME) \
		-p $(DB_EXTERNAL_PORT):$(DB_PORT) \
		postgres \
		-c shared_buffers=256MB \
		-c max_connections=200
clickhouse:
	docker run -d \
		--name $(CLICKHOUSE_HOST) \
		-e CLICKHOUSE_DB=$(CLICKHOUSE_DB) \
		-e CLICKHOUSE_USER=$(CLICKHOUSE_USER) \
		-e CLICKHOUSE_PASSWORD=$(CLICKHOUSE_PASSWORD) \
		-v ~/ch_data:/var/lib/clickhouse/ \
		-v ~/ch_logs:/var/log/clickhouse-server/ \
		--network=$(NETWORK_NAME) \
		-p $(CLICKHOUSE_EXTERNAL_PORT):$(CLICKHOUSE_PORT) \
		clickhouse/clickhouse-server
