SHELL := /bin/bash

locally:;@:
.PHONY: locally

##
## Проект
## ------
install:
	docker compose exec -it react-admin pnpm i --frozen-lockfile

react:
	docker compose exec react-admin sh

up: ## Запустить приложение
	docker compose up --build --detach --remove-orphans --force-recreate
	$(MAKE) install
.PHONY: up

down: ## Остановить приложение
	docker compose down --remove-orphans
.PHONY: down

restart: down up ## Перезапустить приложение
.PHONY: restart

# -----------------------

help:
	@awk ' \
		BEGIN {RS=""; FS="\n"} \
		function printCommand(line) { \
			split(line, command, ":.*?## "); \
        	printf "\033[32m%-28s\033[0m %s\n", command[1], command[2]; \
        } \
		/^[0-9a-zA-Z_-]+: [0-9a-zA-Z_-]+\n[0-9a-zA-Z_-]+: .*?##.*$$/ { \
			split($$1, alias, ": "); \
			sub(alias[2] ":", alias[2] " (" alias[1] "):", $$2); \
			printCommand($$2); \
			next; \
		} \
		$$1 ~ /^[0-9a-zA-Z_-]+: .*?##/ { \
			printCommand($$1); \
			next; \
		} \
		/^##(\n##.*)+$$/ { \
			gsub("## ?", "\033[33m", $$0); \
			print $$0; \
			next; \
		} \
	' $(MAKEFILE_LIST) && printf "\033[0m"
.PHONY: help
.DEFAULT_GOAL := help
