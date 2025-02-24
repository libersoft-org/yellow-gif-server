# Yellow - Gif Server - installation and configuration

These are the installation instructions of this software for the different Linux distributions.

## 1. Server installation

Log in as "root" on your server and run the following commands to download the necessary dependencies and the latest version of this software from GitHub:

### Debian / Ubuntu Linux

```sh
apt update
apt -y upgrade
packages=("curl" "unzip" "git" "screen" "certbot")
for package in "${packages[@]}"; do
 if ! dpkg -s "$package" >/dev/null 2>&1; then
  apt -y install "$package"
 fi
done
if ! command -v bun >/dev/null 2>&1; then
 curl -fsSL https://bun.sh/install | bash
 source /root/.bashrc
fi
git clone https://github.com/libersoft-org/yellow-gif-server.git
cd yellow-gif-server/src/
```

### CentOS / RHEL / Fedora Linux

```sh
dnf -y update
packages=("curl" "unzip" "git" "screen" "certbot")
for package in "${packages[@]}"; do
 if ! rpm -q "$package" >/dev/null 2>&1; then
  dnf -y install "$package"
 fi
done
if ! command -v bun >/dev/null 2>&1; then
 curl -fsSL https://bun.sh/install | bash
 source /root/.bashrc
fi
git clone https://github.com/libersoft-org/yellow-gif-server.git
cd yellow-gif-server/src/
```

## 3. Set up the server

### Create a new server settings file using:

```sh
./start.sh --create-settings
```

### Edit the configuration file "settings.json":

- **web** section:
  - **standalone** - true / false (**true** = run a standalone web server with a defined network ports, **false** = run it as a Unix socket and connect it through other web server's proxy)
  - **http_port** - your HTTP server's network port (ignored if you're not running a standalone server)
  - **https_port** - your HTTPS server's network port (ignored if you're not running a standalone server)
  - **certificates_path** - path to your HTTPS certificates (for standalone server only)
  - **socket_path** - path to a Unix socket file (ignored if you're running standalone server)
- **log** section:
  - **enabled** - if you'd like to log to console and log file (true) or to console only (false)
  - **file** - the path to your log file (ignored if log_to_file is false)
- **giphy** section:
  - **api_key** - your Giphy API key
  - **server** - optional, custom Giphy server

### Get your HTTPS certificate (for standalone server only):

```sh
./cert.sh
```

### Set up the certificate auto renewal:

Edit crontab using:

```sh
crontab -e
```

... and add this line at the end:

```sh
0 12 * * * /usr/bin/certbot renew --quiet
```

## 4. Start the server

a) to start the server in **console**:

```bash
./start.sh
```

b) to start the server in **console** in **hot reload** (dev) mode:

```bash
./start-hot.sh
```

c) to start the server in **screen**:

```bash
./start-screen.sh
```

d) to start the server in **screen** in **hot reload** (dev) mode:

```bash
./start-hot-screen.sh
```

To detach screen press **CTRL+A** and then **CTRL+D**.

To stop the server just press **CTRL+C**.

## 5. API

- https://YOUR_SERVER/api/search/ - search for gifs
