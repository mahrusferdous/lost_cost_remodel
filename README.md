# Lost Cost

Under construction 🚧

## Getting started

Backend:

```bash
cd lostcost-backend
mvn clean install -U ; mvn package
mvn spring-boot:run
```

Frontend:

```bash
cd lostcost-frontend
yarn install
npm start
npm start -- --reset-cache
```

Build:

```bash
npx eas build --platform android
```

Expo build:

```bash
npx eas build --profile development --platform android
```
