import { cold, hot } from "jasmine-marbles";
import { It } from "moq.ts";
import { of } from "rxjs/internal/observable/of";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { StrictMock } from "../../../unit-tests.components/moq/strict-mock";
import { BreakpointsService } from "./breakpoints.service";
import { WindowProvider } from "./window-provider.provider";

describe("BreakpointsService", () => {

  let windowMock: StrictMock<Window>;

  beforeEach(() => {
    createInjector(BreakpointsService);

    windowMock = new StrictMock<Window>();
  });

  function setDevice(innerWidth) {
    const window = windowMock
      .setup(instance => instance.innerWidth)
      .returns(innerWidth)
      .object();

    resolve<WindowProvider>(WindowProvider)
      .setup(instance => instance.getInstance())
      .returns(window);
  }

  function setMobile() {
    setDevice(375);
  }

  function setTablet() {
    setDevice(768);
  }

  function setDesktop() {
    setDevice(1440);
  }

  it("isMobile should return true for mobile", () => {
    const service = get<BreakpointsService>();

    setMobile();

    expect(service.isMobile).toBe(true);
  });

  it("isMobile should return false for tablet", () => {
    const service = get<BreakpointsService>();

    setTablet();

    expect(service.isMobile).toBe(false);
  });

  it("isMobile should return false for desktop", () => {
    const service = get<BreakpointsService>();

    setDesktop();

    expect(service.isMobile).toBe(false);
  });

  it("isTablet should return false for mobile", () => {
    const service = get<BreakpointsService>();

    setMobile();

    expect(service.isTablet).toBe(false);
  });

  it("isTablet should return true for tablet", () => {
    const service = get<BreakpointsService>();

    setTablet();

    expect(service.isTablet).toBe(true);
  });

  it("isTablet should return false for desktop", () => {
    const service = get<BreakpointsService>();

    setDesktop();

    expect(service.isTablet).toBe(false);
  });

  it("isDesktop should return false for mobile", () => {
    const service = get<BreakpointsService>();

    setMobile();

    expect(service.isDesktop).toBe(false);
  });

  it("isDesktop should return false for tablet", () => {
    const service = get<BreakpointsService>();

    setTablet();

    expect(service.isDesktop).toBe(false);
  });

  it("isDesktop should return true for desktop", () => {
    const service = get<BreakpointsService>();

    setDesktop();

    expect(service.isDesktop).toBe(true);
  });
});
