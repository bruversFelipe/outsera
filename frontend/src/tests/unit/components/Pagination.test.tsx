import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Pagination from "../../../components/Pagination";
import { renderWithTheme } from "../../testUtils";

describe("Pagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = renderWithTheme(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders one button per page and marks the current page as active", () => {
    renderWithTheme(<Pagination currentPage={2} totalPages={3} onPageChange={vi.fn()} />);

    const currentPageButton = screen.getByRole("button", { name: "2" });
    expect(currentPageButton).toHaveClass("active");
    expect(currentPageButton).toBeDisabled();

    expect(screen.getByRole("button", { name: "1" })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "3" })).not.toBeDisabled();
  });

  it("calls onPageChange with the clicked page number", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables the previous button on the first page and the next button on the last page", () => {
    renderWithTheme(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "<" })).toBeDisabled();
    expect(screen.getByRole("button", { name: ">" })).not.toBeDisabled();
  });

  it("next/previous buttons move one page in the right direction", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: ">" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);

    await user.click(screen.getByRole("button", { name: "<" }));
    expect(onPageChange).toHaveBeenLastCalledWith(1);
  });
});
