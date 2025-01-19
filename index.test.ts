import { expect, it, vi } from "vitest";
import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";

export const worker = setupWorker(
  http.get("https://example.com/user", () => {
    return HttpResponse.text("ok");
  })
);

it("should work with msw", async () => {
  await worker.start();
  vi.mock("empty-npm-package");

  const resp = await fetch("https://example.com/user");
  expect(resp.ok).toBeTruthy();
});
