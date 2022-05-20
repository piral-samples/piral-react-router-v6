import * as React from "react";
import * as ReactRouter from "react-router";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { RouteSwitchProps } from "piral-core";

// this is an ugly hack; the DebugTracker uses useHistory directly which
// is not part of ReactRouter.
(ReactRouter as any).useHistory = () => {
  const push = useNavigate();

  // this is not a complete shim; we'd only require "push" for the DebugTracker
  return {
    push,
    replace: (path: string) => push(path, { replace: true }),
    goBack: () => push(-1),
    goForward: () => push(-1),
    go: (n: number) => push(n),
  };
};

export const RouteSwitch: React.FC<RouteSwitchProps> = ({
  paths,
  NotFound,
  ...props
}) => {
  return (
    <Routes {...props}>
      {paths.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route element={<NotFound />} />
    </Routes>
  );
};

export const Router = BrowserRouter;
