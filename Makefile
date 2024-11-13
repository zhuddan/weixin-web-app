# Makefile for automating Docker build and run

# Define the image and container name
IMAGE_NAME = nextjs-docker
CONTAINER_NAME = nextjs

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Stop and remove the existing container
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

# Remove the Docker image
remove-image:
	docker rmi $(IMAGE_NAME)

# Run the Docker container
run:
	docker run -d -p 3000:3000 --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Clean up: stop, remove container and image
clean: stop remove-image

# Full rebuild: stop, remove container/image, build, and run
rebuild: clean build run
