#!/bin/bash

set -e

echo "=========================================="
echo "Personal Blog - VPS Deployment Setup"
echo "=========================================="

BLOG_DIR="/opt/blog"

if [ ! -d "$BLOG_DIR" ]; then
    echo "Creating blog directory..."
    sudo mkdir -p $BLOG_DIR
    sudo chown $USER:$USER $BLOG_DIR
fi

echo "Installing Docker if not present..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "Docker installed. Please logout and login again for group changes to take effect."
fi

echo "Installing Docker Compose if not present..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo "Cloning repository..."
if [ ! -d "$BLOG_DIR/.git" ]; then
    git clone https://github.com/LIN19990818/personal-blog.git $BLOG_DIR
else
    cd $BLOG_DIR
    git pull origin main
fi

cd $BLOG_DIR

echo "Creating environment file..."
if [ ! -f "$BLOG_DIR/deploy/.env" ]; then
    cp $BLOG_DIR/deploy/.env.example $BLOG_DIR/deploy/.env
    echo ""
    echo "=========================================="
    echo "IMPORTANT: Please edit deploy/.env file"
    echo "with your production settings:"
    echo "  - MySQL root password"
    echo "  - JWT secret key"
    echo "  - Other environment variables"
    echo "=========================================="
    echo ""
fi

echo "Creating uploads directory..."
mkdir -p $BLOG_DIR/uploads

echo "Setting up SSL certificates directory..."
mkdir -p $BLOG_DIR/deploy/nginx/ssl

echo "=========================================="
echo "Setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit deploy/.env with your settings"
echo "2. (Optional) Add SSL certificates to deploy/nginx/ssl/"
echo "3. Run: cd $BLOG_DIR && docker-compose -f deploy/docker-compose.yml up -d"
echo "=========================================="
