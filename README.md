# Journalism

## Table of contents

1. [Visuals](#Visuals)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [TO-DO](#TO-DO)
5. [Contributing](#Contributing)
6. [Authors and acknowledgment](#Authors-and-acknowledgment)
7. [License](#License)

## Visuals

### Project Architecture

<img
    src="./docs/img/architecture.jpg"
    alt="RT Dashboard Architecture"
/>

### Micro-services

There are 5 containers running on the Docker cluster:

1. Postgres database
2. PgAdmin4 Web server for postgres administration
3. The DAO (Data Access Object), API to interact with the database
4. The the Next.js server (Node.js) rendering UI for the readers
5. Nginx web server used to host the Journalist Web App (Portal) and do reverse proxy.

## Installation

To install the project first download [Docker Desktop](https://www.docker.com/products/docker-desktop). \
Docker Desktop is an application for MacOS and Windows machines for the building and sharing of containerized applications and micro-services.

### Start

```bash
docker-compose up
```

### Stop

```bash
docker-compose down
```

### Build

```bash
docker-compose build
```

Note: "docker-compose up --build" automatically builds/rebuilds the project

## Usage

Open your web browser @ <http://localhost:80/>

## TO-DO

### Server

- Page: 404
- Page: Post
- Page: Author

### UI

- User: profile
- User: update

### Nginx

- DAO Reverse Proxy using subdomain
- Subdomain for React.js compiled WebApp

### Docs

- Word
- README: installation + usage

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment

Made by Clément Stauner, 2020.

## License

[© Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
