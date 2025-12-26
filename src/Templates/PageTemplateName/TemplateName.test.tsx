import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { ExampleProvider } from "../../providers/ExampleProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TemplateName from "./TemplateName";

describe("<TemplateName />", () => {
  const queryClient = new QueryClient();

  test("it should mount", () => {
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <ExampleProvider>
            <TemplateName />
          </ExampleProvider>
        </QueryClientProvider>
      </Router>
    );

    const templateName = screen.getByTestId("TemplateName");

    expect(templateName).toBeInTheDocument();
  });
});
