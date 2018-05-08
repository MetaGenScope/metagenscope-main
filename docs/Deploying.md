# Spinning Up MetaGenScope

## DigitalOcean

Create w/ IPv6

## Ubuntu

Install software:

```sh
# Docker (from: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository)
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# Compare following to 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88
$ sudo apt-key fingerprint 0EBFCD88
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt-get update
$ sudo apt-get install docker-ce


# Docker Compose (from: https://docs.docker.com/compose/install/#install-compose)
$ sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
# Optionally: https://docs.docker.com/compose/completion/

# Other stuff:
$ sudo apt-get install emacs nginx
```

Provision metagenscope user:

```sh
$ useradd metagenscope
$ usermod -aG sudo metagenscope
$ mkdir /home/metagenscope/.ssh
$ emacs /home/metagenscope/.ssh/authorized_keys
$ visudo -f /etc/sudoers.d/90-cloud-init-users
# metagenscope ALL=(ALL) NOPASSWD:ALL
$ sudo groupadd docker
$ sudo usermod -aG docker metagenscope
# Log out of root and log back in as metagenscope
```


## MetaGenScope

Add GitHub deploy key

```sh
# Create new key to location /home/metagenscope/.ssh/metagenscope_deploy
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
$ emacs ~/.ssh/config
# IdentityFile ~/.ssh/metagenscope_deploy
$ cat ~/.ssh/metagenscope_deploy.pub
# Add this to metagenscope-main deploy keys
```

Log in to Docker Hub:

```sh
$ docker login
# Enter details
```

Set Up MetaGenScope:

```sh
$ git clone git@github.com:bchrobot/metagenscope-main.git
# Branch will usually be master, but might be different for custom deploys
$ git checkout master
$ cp production-variables.env.dist .env
# Set appropriate vars:
$ emacs .env
$ docker-compose -f docker-compose.prod.yml up -d --scale metagenscope-worker=5
```


## Nginx

Add `A` (IPv4) and `AAAA` (IPv6) DNS records for the domain. Make sure to include records for root (`.`) as well as `www`.

Install Certbot (from: https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx):

```sh
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install python-certbot-nginx
```

Install certs:

```sh
$ sudo certbot certonly --nginx -d metagenscope.com,www.metagenscope.com
```

Create vHost:

```sh
# Change vhost to whatever makes sense for you
$ sudo emacs /etc/nginx/sites-available/www.metagenscope.com.conf
# Add the content below and save
$ sudo rm /etc/nginx/sites-enabled/default
$ sudo ln -s /etc/nginx/sites-available/www.metagenscope.com.conf \
    /etc/nginx/sites-enabled/www.metagenscope.com.conf
$ sudo service nginx reload
```

```
server {
    server_name metagenscope.com www.metagenscope.com;

    client_body_buffer_size     32K;
    client_max_body_size        100M;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate /etc/letsencrypt/live/www.metagenscope.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.metagenscope.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

}

server {
    listen 80;
    listen [::]:80;

    server_name metagenscope.com www.metagenscope.com;

    if ($host = metagenscope.com) {
        return 301 https://$host$request_uri;
    }

    if ($host = www.metagenscope.com) {
        return 301 https://$host$request_uri;
    }

    return 404;

}
```
