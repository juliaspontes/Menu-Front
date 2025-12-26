import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { ExampleProvider } from "../../../providers/ExampleProvider";
import ModalProductInsert from "./ModalProductInsert";

describe("<ModalProductInsert />", () => {
  test("it should mount", () => {
    render(
      <Router>
        <ExampleProvider>
          <ModalProductInsert show onClose={() => {}} />
        </ExampleProvider>
      </Router>
    );

    const modalProductInsert = screen.getByTestId("ModalProductInsert");

    expect(modalProductInsert).toBeInTheDocument();
  });
});
