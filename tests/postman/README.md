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

Download [Postman](https://www.postman.com/) to test the endpoints of the DAO (Data Access Object).\
Test the two main API endpoints : /user & /article.  

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment

Made by Clément Stauner, 2020.

## License

[© Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
