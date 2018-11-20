import { createInjector, get } from "../../../unit-tests.components/mocks/createInjector";
import { RoutesService } from "./routes.service";

describe("RoutesService", () => {
  beforeEach(() => {
    createInjector(RoutesService);
  });

  it("should return same cached object every call", () => {
    const service = get<RoutesService>();

    expect(service.authLogin()).toBe(service.authLogin());
  });
});
