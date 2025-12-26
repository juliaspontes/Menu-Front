import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ExampleProvider } from "../../../providers/ExampleProvider";
import ModalPaperInsert from "./ModalPaperInsert";

describe("<ModalPaperInsert />", () => {
  test("it should mount", () => {
    render(
      <Router>
        <ExampleProvider>
          <ModalPaperInsert show onClose={() => {}} />
        </ExampleProvider>
      </Router>
    );

    const modalPaperInsert = screen.getByTestId(
      "ModalPaperInsert"
    );

    expect(modalPaperInsert).toBeInTheDocument();
  });
});
