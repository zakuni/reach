Reach
=====

Reach informations, to all in need.

## Development

prerequisites
- docker

### Build

Create `.env` based on `.env.sample`
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

### Test

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml run --rm web yarn test
```
