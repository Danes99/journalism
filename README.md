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

## Installation

To install the project first download [Docker Desktop](https://www.docker.com/products/docker-desktop).

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

- Footer
- Header
- Page: 404
- Page: Home
- Page: Post
- Page: Author

### UI

- Create + Update: Number of character limit
- Read article
- Strong Password validation
- User: sign out
- User: profile
- User: update

### Nginx

- DAO Reverse Proxy using subdomain
- Subdomain for React.js compiled WebApp

### Docs

- Word
- Screenshots
- PowerPoint
- README: installation + usage

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment

Made by Clément Stauner & Mathis Truchet, 2020.

## License

[© Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
