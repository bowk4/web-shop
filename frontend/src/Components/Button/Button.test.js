import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Button from "./Button";

describe("Button tests", () => {
  test("matches snapshot", () => {
    const { asFragment } = render(<Button>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
