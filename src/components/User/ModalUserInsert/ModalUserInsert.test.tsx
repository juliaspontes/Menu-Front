import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ExampleProvider } from "../../../providers/ExampleProvider";
import ModalUserInsert from "./ModalUserInsert";

describe("<ModalUserInsert />", () => {
  test("it should mount", () => {
    render(
      <Router>
        <ExampleProvider>
          <ModalUserInsert show onClose={() => {}} />
        </ExampleProvider>
      </Router>
    );

    const modalUserInsert = screen.getByTestId(
      "ModalUserInsert"
    );

    expect(modalUserInsert).toBeInTheDocument();
  });
});
