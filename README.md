# Sodos

The Social Todos App

## Development

1. Clone repository `git clone https://gitlab.com/dashahello/sodos`
2. Go to cloned directory in terminal `cd sodos`

### Server

1. Go to backend directory `cd backend`
2. Install the app with `npm install`
3. Create `.env` file according to `.env.example`
4. Run `npm run start:dev`, which starts the server on the port specified in
   `.env`
5. Query away :)

### Client

1. Go to frontend directory `cd frontend`
2. Install the app with `npm install`
3. Optional: edit `pacakage.json` `start` script to change the `PORT` of the
   react development server
4. Run `npm start`
5. Browse to `http://localhost:{port_from_package.json}`
6. Click away :)

## Production

Will be here soon :)

## Dependencies

Sodos requires the following to run:

- `node.js` version `16.13.0`
- `npm` (comes with node) version `8.1.0`
- `mysql` version `8.0.27-0`, specifically `8.0.27-0ubuntu0.20.04.1` is used

Sodos is being build on `lubuntu`, using `ubuntu` version `20.04.1` but should
be able to run everywhere where the above dependencies are supported.
