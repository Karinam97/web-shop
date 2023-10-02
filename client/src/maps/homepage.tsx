import React from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "../components/Homepage";

const domNode: HTMLElement | null = document.getElementById("root");
if (domNode) {
  const root = createRoot(domNode);

  root.render(<HomePage />);
}
