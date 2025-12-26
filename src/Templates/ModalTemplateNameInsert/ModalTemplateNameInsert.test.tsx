import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { ExampleProvider } from "../../providers/ExampleProvider";
import ModalTemplateNameInsert from "./ModalTemplateNameInsert";

describe("<ModalTemplateNameInsert />", () => {
  test("it should mount", () => {
    render(
      <Router>
        <ExampleProvider>
          <ModalTemplateNameInsert show onClose={() => {}} />
        </ExampleProvider>
      </Router>
    );

    const modalTemplateNameInsert = screen.getByTestId(
      "ModalTemplateNameInsert"
    );

    expect(modalTemplateNameInsert).toBeInTheDocument();
  });
});
