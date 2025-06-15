import React from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./features/SequenceComparison/components/Main";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<Main />);
