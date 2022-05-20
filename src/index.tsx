import * as React from "react";
import { render } from "react-dom";
import { createInstance, Piral, PiralPlugin } from "piral-core";
import { RouteSwitch, Router } from "./routerV6";
import { Home, Layout, Subpage } from "./content";

// Just a simple mock to establish compatibility to the sample pilets, which
// assume an app shell containing APIs such as registerMenu; we just mock these
// to make them "work" (except, e.g., photos, which requires a working connector -> we always return null, i.e., no rendering here)
function createMockApis(): PiralPlugin<any> {
  return () => (api) => ({
    registerMenu(Component) {
      api.registerExtension("menu-items", Component);
    },
    registerTile() {},
    registerModal() {},
    createConnector() {
      return () => () => null;
    },
  });
}

const instance = createInstance({
  state: {
    components: {
      // this is the important part - we install the new components
      Router,
      RouteSwitch,
      // just to get some layout - not required
      Layout,
    },
    routes: {
      // some fixed routes to show.
      "/": Home,
      "/foo": Subpage,
    },
  },
  plugins: [createMockApis()],
  requestPilets() {
    return fetch("https://feed.piral.cloud/api/v1/pilet/sample")
      .then((res) => res.json())
      .then((res) => res.items);
  },
});

render(<Piral instance={instance} />, document.querySelector("#app"));
