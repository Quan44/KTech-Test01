# Employee API - Docker Setup

## 🐳 Docker Compose Setup

### Prerequisites
- Docker
- Docker Compose

### Quick Start

1. **Clone and navigate to project directory:**
```bash
cd EmployeeAPI
```

2. **Start the application:**
```bash
docker-compose up -d
```

3. **Check status:**
```bash
docker-compose ps
```

4. **View logs:**
```bash
docker-compose logs -f employee-api
```

### 🚀 API Endpoints

- **Base URL:** `http://localhost:8080`
- **API Documentation:** `http://localhost:8080/api/v1/employees`
- **Paginated API:** `http://localhost:8080/api/v1/employees/paging`

### 🗄️ Database

- **Host:** `localhost:3306`
- **Database:** `employee_database`
- **Username:** `developer`
- **Password:** `developer_password`

### 📁 Docker Files

- `docker-compose.yml` - Development environment
- `docker-compose.prod.yml` - Production environment
- `Dockerfile` - Spring Boot application container
- `.dockerignore` - Exclude files from build context

## 🔧 Development Commands

### Build and Run
```bash
# Build the application
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Database Operations
```bash
# Access MySQL container
docker exec -it employee_mysql mysql -u developer -p

# Backup database
docker exec employee_mysql mysqldump -u developer -p employee_database > backup.sql

# Restore database
docker exec -i employee_mysql mysql -u developer -p employee_database < backup.sql
```

## 🚀 Production Deployment

### 1. Build and Push to Docker Hub

```bash
# Build image
docker build -t yourusername/employee-api:latest .

# Push to Docker Hub
docker push yourusername/employee-api:latest
```

### 2. Deploy with Production Compose

```bash
# Set environment variables
export DOCKER_USERNAME=yourusername
export IMAGE_TAG=latest
export MYSQL_ROOT_PASSWORD=secure_password
export MYSQL_DATABASE=employee_prod
export MYSQL_USER=prod_user
export MYSQL_PASSWORD=secure_prod_password

# Deploy production stack
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Environment Variables

Create `.env` file for production:
```env
DOCKER_USERNAME=yourusername
IMAGE_TAG=latest
MYSQL_ROOT_PASSWORD=secure_password
MYSQL_DATABASE=employee_prod
MYSQL_USER=prod_user
MYSQL_PASSWORD=secure_prod_password
```

## 📊 Monitoring

### Health Check
```bash
# Check application health
curl http://localhost:8080/actuator/health

# Check container status
docker-compose ps
```

### Logs
```bash
# Application logs
docker-compose logs -f employee-api

# Database logs
docker-compose logs -f mysql
```

## 🧹 Cleanup

### Remove everything
```bash
# Stop and remove containers, networks, volumes
docker-compose down -v

# Remove images
docker rmi employee-api:latest
```

### Remove specific resources
```bash
# Remove only containers
docker-compose down

# Remove volumes
docker-compose down -v

# Remove networks
docker network prune
```

## 🔒 Security Notes

- Change default passwords in production
- Use environment variables for sensitive data
- Consider using Docker secrets for production
- Enable SSL/TLS for database connections in production
- Restrict network access using Docker networks

## 📝 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :8080
   # Kill the process or change port in docker-compose.yml
   ```

2. **Database connection failed:**
   ```bash
   # Check if MySQL is running
   docker-compose ps mysql
   # Check logs
   docker-compose logs mysql
   ```

3. **Application won't start:**
   ```bash
   # Check application logs
   docker-compose logs employee-api
   # Check if database is ready
   docker-compose logs mysql
   ```

### Reset Everything
```bash
# Complete reset
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```
