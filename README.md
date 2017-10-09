Reach
=====

Reach informations, to all in need.

## Development

prerequisites
- docker

### Build

```
docker-compose build
```

### Run

```sh
# in production
docker-compose up

# in development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

open http://localhost:3000
