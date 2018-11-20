import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { add, clear } from "../../../shared/map-to-bad-requests/map-to-bad-request.registrations";
import { UnspecifiedBadRequestError } from "../../errors/unspecified-bad-request.error";
import { BadRequestMapper } from "./bad-request.mapper";

describe("Bad request mapper", () => {

  beforeEach(() => {
    createInjector(BadRequestMapper);
    clear();
  });

  afterAll(() => {
    clear();
  });

  it("Should be resolved", () => {
    const actual = get<BadRequestMapper>();
    expect(actual).toEqual(jasmine.any(BadRequestMapper));
  });

  it("Returns instance of mapped type", () => {
    class Test {
    }

    const badRequestKey = "key";
    add(Test, badRequestKey);

    const provider = get<BadRequestMapper>();
    const actual = provider.get(badRequestKey);

    expect(actual).toEqual(jasmine.any(Test));
  });

  it("Returns common bad request error when map is not registered", () => {
    const badRequestKey = "key";

    const provider = get<BadRequestMapper>();
    const actual = provider.get(badRequestKey);

    expect(actual).toEqual(new UnspecifiedBadRequestError());
  });
});
