import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ExampleProvider } from "../../../providers/ExampleProvider";
import ModalTableInsert from "./ModalTableInsert";

describe("<ModalTableInsert />", () => {
  test("it should mount", () => {
    render(
      <Router>
        <ExampleProvider>
          <ModalTableInsert show onClose={() => {}} />
        </ExampleProvider>
      </Router>
    );

    const modalTableInsert = screen.getByTestId(
      "ModalTableInsert"
    );

    expect(modalTableInsert).toBeInTheDocument();
  });
});
