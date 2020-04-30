# pemap-webapp

Aplicación Web React para consumir el API REST [pemap-api](https://github.com/colcodev/pemap-api).

## Requerimientos

- NodeJS LTS (v12)

## Stack

El código está escrito en **ES6** y luego es transpilado utilizando **Babel**.

Para el diseño decidí implementar el framework **tailwindcss** ya que se integra facilmenta a React y me permite maquetar rapidamente mobile-first y en bloques, utilizando sus clases predefinidas.

Utilicé **FontAwesome** como fuente de íconos desde un cdn, por comodidad y gusto personal.

Para correr los tests preferí utilizar **Jest** + **Enzime**, debido a que el primero viene integrado a este stack y Enzime permite testear la salida de componentes de forma mas simple.

> Nota: Para elegir las librerías extras tuve en cuenta la seguridad, el soporte de comunidad y popularidad de los paquetes.

## Instalación

Una vez clonado el repositorio, se deben instalar las dependencias con el siguiente comando:

```bash
yarn install
```

## Puesta en marcha

Para levantar el servicio, primero se debe crear el archivo `.env` a partir de `.env.example` y editarlo con los valores correspondientes para las variables `REACT_APP_API_URL` y `REACT_APP_GOOGLE_MAPS_API_KEY` (se pueden usar las actuales).

Al haber sido iniciada con **create-react-app**, la documentación de abajo es la original y totalmente válida para la puesta en marcha, test y build.

## Puntos faltantes

Creo que lo que falta es completar los test y mejorar la covertura. Por ahora tiene escritos un par de smoke-tests, pero se podría implementar mocks de context y requests para testear los componentes que lo utilizan. Además deberíamos utilizar un framework como [cypress](https://www.cypress.io) para correr test de integración.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
