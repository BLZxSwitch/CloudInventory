import { MapToBadRequest } from "./map-to-bad-request.decorator";
import { get } from "./map-to-bad-request.registrations";

describe("Map to a bad request decorator", () => {

  it("Registers map", () => {
    class Test {
    }

    const badRequestKey = "LOGIN_FAILED";

    MapToBadRequest(badRequestKey)(Test);

    expect(get()).toContain({type: Test, key: badRequestKey});
  });
});
