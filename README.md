# 🚀 CI/CD Pipeline Test with Docker

This project is a **CI/CD pipeline test** for a **React-based chat application**, consisting of a **client and server**, both containerized using Docker and deployed with **Nginx** and **Let's Encrypt SSL certificates**.

## 📦 Project Structure

```
.
├── client/             # React frontend app
├── server/             # Backend server (e.g., Node.js / Express)
├── nginx.conf          # Custom Nginx configuration
└── docker-compose.yml  # Multi-service Docker setup
```

---

## 🚀 Running the App Locally with Docker

### 1. Build and Start Containers

```bash
docker-compose up --build
```

This command builds and runs all the services defined in `docker-compose.yml`, including:

* `client`: React frontend built and served via Nginx
* `server`: Backend API service
* `nginx`: Reverse proxy to route traffic and serve HTTPS via Certbot

---

## 🔒 HTTPS Setup with Let's Encrypt

### 1. Install Certbot (on the host machine)

```bash
sudo yum install -y certbot
```

### 2. Obtain SSL Certificates

This application is deployed on lozoya.org.

```bash
sudo certbot certonly --standalone -d lozoya.org -d www.lozoya.org
```

> This will generate certificates in `/etc/letsencrypt/live/lozoya.org`.

Make sure ports **80** and **443** are open in your EC2 or firewall settings, and that **Nginx is stopped** during certificate generation.

---

## 🧪 CI/CD Overview

This setup can be integrated into a CI/CD pipeline to:

1. **Build the client and server** images.
2. **Run tests** (if any).
3. **Push Docker images** to a registry (optional).
4. **Deploy to production** using `docker-compose` on a remote server.
5. **Automate SSL renewal** with a scheduled Certbot job.

---

## 🛠 Example Deployment Steps (Production)

```bash
# SSH into your server
ssh ec2-user@your-ec2-instance

# Clone or pull the latest code
cd /home/ec2-user/chat
git pull origin main

# Rebuild and restart the services
docker-compose down
docker-compose up --build -d
```

---

## 🌐 Domain and DNS

Make sure the domain `lozoya.org` is pointing to your server's public IP using **A records** in your DNS provider (e.g., Route 53).

---

## 🔁 Auto-Renew SSL Certificates

Add a cron job to renew certificates automatically:

```bash
sudo crontab -e
```

Add:

```bash
0 0 * * * certbot renew --pre-hook "docker stop nginx" --post-hook "docker start nginx"
```

---

