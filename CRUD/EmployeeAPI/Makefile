# Employee API Makefile
# Usage: make [target]

.PHONY: help build up down logs clean build-push

# Default target
help:
	@echo "Employee API - Available commands:"
	@echo ""
	@echo "Development:"
	@echo "  build     - Build Docker images"
	@echo "  up        - Start services (development)"
	@echo "  up-prod   - Start services (production)"
	@echo "  down      - Stop services"
	@echo "  logs      - View application logs"
	@echo "  logs-db   - View database logs"
	@echo ""
	@echo "Docker Hub:"
	@echo "  build-push - Build and push to Docker Hub"
	@echo "  login     - Login to Docker Hub"
	@echo ""
	@echo "Maintenance:"
	@echo "  clean     - Clean up containers, images, volumes"
	@echo "  backup    - Backup database"
	@echo "  restore   - Restore database from backup"
	@echo ""

# Development commands
build:
	docker-compose build

up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.prod.yml up -d

down:
	docker-compose down

logs:
	docker-compose logs -f employee-api

logs-db:
	docker-compose logs -f mysql

# Docker Hub commands
build-push:
	@echo "Building and pushing to Docker Hub..."
	@chmod +x build-and-push.sh
	@./build-and-push.sh

login:
	docker login

# Maintenance commands
clean:
	docker-compose down -v
	docker system prune -f
	docker volume prune -f

backup:
	@echo "Creating database backup..."
	docker exec employee_mysql mysqldump -u developer -pdeveloper_password employee_database > backup_$(shell date +%Y%m%d_%H%M%S).sql

restore:
	@echo "Restoring database from backup..."
	@read -p "Enter backup filename: " backup_file; \
	docker exec -i employee_mysql mysql -u developer -pdeveloper_password employee_database < $$backup_file

# Quick start
start: build up
	@echo "✅ Employee API started successfully!"
	@echo "🌐 API: http://localhost:8080"
	@echo "🗄️  Database: localhost:3306"

# Status check
status:
	docker-compose ps
	@echo ""
	@echo "📊 Health check:"
	@curl -s http://localhost:8080/actuator/health || echo "❌ Application not responding"
