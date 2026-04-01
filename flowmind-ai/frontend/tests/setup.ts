import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", { href: typeof href === "string" ? href : "#", ...props }, children)
}));

vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<unknown>) => {
    let Component: React.ComponentType | null = null;
    loader().then((mod) => {
      Component = (mod as { default?: React.ComponentType }).default || null;
    });
    return (props: Record<string, unknown>) =>
      Component ? React.createElement(Component, props) : null;
  }
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  })
});
