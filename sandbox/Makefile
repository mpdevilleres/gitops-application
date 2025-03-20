SHELL := /usr/bin/env sh

.EXPORT_ALL_VARIABLES:

# ENVIRONMENTAL VARIABLES
# ================================
FRONTEND_TAG := ${FRONTEND_TAG}
BACKEND_TAG := ${BACKEND_TAG}

# CONSTANT VARIABLES
# ================================
IMAGE_REGISTRY := 851725559187.dkr.ecr.me-central-1.amazonaws.com
REPOSITORY := mpdevilleres/gitops-application

.PHONY: docker-cleanup
docker-cleanup:
	docker container kill $(shell docker container ls -qa) || true
	docker container rm $(shell docker container ls -qa) || true
	docker volume rm $(shell docker volume ls -q) || true
	docker network prune -f
	docker system prune -f
	#docker rmi $(shell docker images -q) || true

.PHONY: docker-build
docker-build:
	docker compose pull
	docker compose build --no-cache

.PHONY: docker-up
docker-up:
	openssl genrsa -out jwt_private_key.pem 4096
	openssl rsa -in jwt_private_key.pem -pubout -out jwt_public_key.pem
	docker compose up -d