#!/bin/bash

# Employee API Docker Build and Push Script
# Usage: ./build-and-push.sh [version] [username]

set -e

# Default values
VERSION=${1:-latest}
DOCKER_USERNAME=${2:-yourusername}
IMAGE_NAME="employee-api"
FULL_IMAGE_NAME="$DOCKER_USERNAME/$IMAGE_NAME:$VERSION"

echo "🐳 Building and pushing Employee API to Docker Hub"
echo "=================================================="
echo "Version: $VERSION"
echo "Username: $DOCKER_USERNAME"
echo "Image: $FULL_IMAGE_NAME"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if user is logged in to Docker Hub
if ! docker info | grep -q "Username"; then
    echo "❌ You are not logged in to Docker Hub. Please run 'docker login' first."
    exit 1
fi

echo "🔨 Building Docker image..."
docker build -t $FULL_IMAGE_NAME .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🏷️  Tagging image..."
docker tag $FULL_IMAGE_NAME $DOCKER_USERNAME/$IMAGE_NAME:latest

echo "📤 Pushing to Docker Hub..."
docker push $FULL_IMAGE_NAME
docker push $DOCKER_USERNAME/$IMAGE_NAME:latest

if [ $? -eq 0 ]; then
    echo "✅ Push successful!"
    echo ""
    echo "🎉 Image successfully pushed to Docker Hub!"
    echo "Image: $FULL_IMAGE_NAME"
    echo "Latest: $DOCKER_USERNAME/$IMAGE_NAME:latest"
    echo ""
    echo "🚀 You can now deploy using:"
    echo "docker-compose -f docker-compose.prod.yml up -d"
    echo ""
    echo "Or pull the image on another machine:"
    echo "docker pull $FULL_IMAGE_NAME"
else
    echo "❌ Push failed!"
    exit 1
fi
