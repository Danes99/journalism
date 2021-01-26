# Data Access Object (DAO)

This is an [Node.js](https://nodejs.org/en/) API which makes the link between an app and a database.

In computer software, a [data access object (DAO)](https://en.wikipedia.org/wiki/Data_access_object) is a pattern that provides an abstract interface to some type of database or other persistence mechanism. By mapping application calls to the persistence layer, the DAO provides some specific data operations without exposing details of the database. This isolation supports the single responsibility principle. It separates what data access the application needs, in terms of domain-specific objects and data types (the public interface of the DAO), from how these needs can be satisfied with a specific DBMS, database schema, etc. (the implementation of the DAO).

## Table of contents

1. [Visuals](#Visuals)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [Contributing](#Contributing)
5. [Authors and acknowledgment](#Authors-and-acknowledgment)
6. [License](#License)

## Visuals

### Project Architecture

<img
    src="../docs/img/architecture.png"
    alt="RT Dashboard Architecture"
/>

## Installation

Use the node package manager [npm](https://www.npmjs.com/) to install the app.

```bash
npm install
```

## Usage

### Vanilla

```bash
npm start
```

Run in developer mode:

```bash
npm run dev
```

### Docker

First, build the Docker image :

```docker
docker build -t dao .
```

Then, run the Docker container :

```docker
docker run \
  --name=dao \
  --rm \
  -d \
  --network=$NETWORK_NAME \
  -p 81:81 \
  --env-file ./config/dev.env \
  dao
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment

Made by Clément STAUNER January 2021.

## License

[© Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
