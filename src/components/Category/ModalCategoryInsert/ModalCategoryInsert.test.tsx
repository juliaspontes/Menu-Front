import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ExampleProvider } from "../../../providers/ExampleProvider";
import ModalCategoryInsert from "./ModalCategoryInsert";

describe("<ModalCategoryInsert />", () => {
  test("it should mount", () => {
    render(
      <Router>
        <ExampleProvider>
          <ModalCategoryInsert show onClose={() => {}} />
        </ExampleProvider>
      </Router>
    );

    const modalCategoryInsert = screen.getByTestId(
      "ModalCategoryInsert"
    );

    expect(modalCategoryInsert).toBeInTheDocument();
  });
});
