GIT_SHA := $(shell git rev-parse HEAD)
BUILD_TAG := $(if $(BUILD_TAG),$(BUILD_TAG),latest)

down:
	docker compose down --remove-orphans --volumes
up: down
	docker compose up --detach 

