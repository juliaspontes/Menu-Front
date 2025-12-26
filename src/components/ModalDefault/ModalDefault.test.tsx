import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalDefault from "./ModalDefault";

describe("<ModalDefault />", () => {
  test("it should mount", () => {
    render(<ModalDefault title="" show showFooter children />);

    const modalDefault = screen.getByTestId("ModalDefault");

    expect(modalDefault).toBeInTheDocument();
  });
});
