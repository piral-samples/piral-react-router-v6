[![Piral Logo](https://github.com/smapiot/piral/raw/develop/docs/assets/logo.png)](https://piral.io)

# [Piral Sample](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

> Sample project to illustrate how a Piral instance using Piral v0.14 can be migrated to use React Router v6.

:zap: Exchange the router and establish the required compatibility level.

## Getting Started

Install the dependencies:

```sh
npm i
```

Now run the application:

```sh
npm start
```

It uses the sample pilets. Some of the sample pilets are not supposed to show something since the Pilet API surface was trimmed down to the core level (i.e., no further Piral plugins have been used for this demo).

## More Information

The sample has been scaffolded with:

```sh
npm init piral-instance --framework piral-core --bundler webpack5 --defaults
```

Then the `react-router` and `react-router-dom` dependencies have been changed to `^6`. The `@types/react-router` and `@types/react-router-dom` packages have been removed. Types are now part of the Router packages.

Since the new router does not rely on `path-to-regexp` the external dependency has been removed. Alternatively, you may want to explicitly add it in the *package.json*. The removal of a core dependency is done via:

```json
{
  // ...
  "pilets": {
    "externals": [
      "!path-to-regexp"
    ],
    // ...
  },
  // ...
}
```

Finally, the `src/routerV6.tsx` file contains everything that was done to establish compatibility. The new parts have been integrated via:

```js
const instance = createInstance({
  state: {
    components: {
      Router,
      RouteSwitch,
    },
  },
});
```

When running / building some warnings / errors should be shown, e.g.:

```plain
WARNING in ./src/routerV6.tsx 7:0-22
export 'useHistory' (imported as 'ReactRouter') was not found in 'react-router' (possible exports: MemoryRouter, Navigate, NavigationType, Outlet, Route, Router, Routes, UNSAFE_LocationContext, UNSAFE_NavigationContext, UNSAFE_RouteContext, createPath, createRoutesFromChildren, generatePath, matchPath, matchRoutes, parsePath, renderMatches, resolvePath, useHref, useInRouterContext, useLocation, useMatch, useNavigate, useNavigationType, useOutlet, useOutletContext, useParams, useResolvedPath, useRoutes)
 @ ./src/index.tsx 4:0-49 34:14-20 35:19-30
```

Right now these references are still there, but do not matter. Most of them should not be used. For instance, the `./node_modules/piral-core/esm/components/DefaultRouteSwitch.js` is not used as we've explicitly overwritten the route switch.

## Outlook

With Piral v0.15 the detection of the router will be done automatically. This way you'll be able to just migrate by installing the package that you'd like to use. We detect what version is installed and try to pick the right API.

## License

Piral and this sample code is released using the MIT license. For more information see the [license file](./LICENSE).
