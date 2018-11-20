import { ControlContainer, FormControl, FormGroup } from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { cold } from "jasmine-marbles";
import { utc } from "moment";
import * as moment from "moment";
import { Mock } from "moq.ts";
import { ReplaySubject } from "rxjs/index";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { NavigatorLanguageProvider } from "../../../core/services/navigator.language.provider";
import { DateSelectorComponent } from "./date-selector.component";

describe("Date selector component", () => {

  beforeEach(() => {
    createInjector(DateSelectorComponent);
  });

  it("Should be resolved", () => {
    const actual = get<DateSelectorComponent>();
    expect(actual).toEqual(jasmine.any(DateSelectorComponent));
  });

  it("Exposes data form control", () => {
    const controlName = "ControlName";

    const formControl = new Mock<FormControl>()
      .setup(instance => instance.valueChanges)
      .returns(cold(""))
      .setup(instance => instance.statusChanges)
      .returns(cold(""))
      .object();

    const formGroup = new Mock<FormGroup>()
      .setup(instance => instance.get(controlName))
      .returns(formControl)
      .object();

    resolve<ControlContainer>(ControlContainer)
      .setup(instance => instance.control)
      .returns(formGroup);

    const component = get<DateSelectorComponent>();
    component.formControlName = controlName;
    component.ngOnInit();
    const actual = component.control;

    expect(actual).toEqual(formControl);
  });

  it("Updates date control with a new value", () => {
    const today = utc([2018, 5, 25]).valueOf();

    const controlName = "ControlName";

    const formControl = new Mock<FormControl>()
      .setup(instance => instance.valueChanges)
      .returns(cold(""))
      .setup(instance => instance.statusChanges)
      .returns(cold(""))
      .prototypeof(new FormControl());

    const formGroup = new Mock<FormGroup>()
      .setup(instance => instance.get(controlName))
      .returns(formControl.object())
      .object();

    resolve<ControlContainer>(ControlContainer)
      .setup(instance => instance.control)
      .returns(formGroup);

    const component = get<DateSelectorComponent>();
    component.date = formControl.object();
    component.formControlName = controlName;
    component.ngOnInit();
    component.writeValue(today);

    formControl.verify(instance => instance.setValue(Is.Eq(moment(today))));
  });

  it("Notifies when selected date has been changed", () => {
    const today = utc([2018, 5, 25]).valueOf();
    const controlName = "ControlName";

    const formControlMock = new Mock<FormControl>()
      .prototypeof(new FormControl())
      .setup(instance => instance.valueChanges)
      .returns(cold("-a", {a: today}))
      .setup(instance => instance.statusChanges)
      .returns(cold(""));

    const formGroup = new Mock<FormGroup>()
      .setup(instance => instance.get(controlName))
      .returns(formControlMock.object())
      .object();

    resolve<ControlContainer>(ControlContainer)
      .setup(instance => instance.control)
      .returns(formGroup);

    const component = get<DateSelectorComponent>();
    component.ngOnInit();
    component.registerOnChange(value => {
      expect(value).toEqual(today);
    });
  });

  it("Notifies when selected date has been cleared", () => {
    const today = null;
    const controlName = "ControlName";

    const formControlMock = new Mock<FormControl>()
      .prototypeof(new FormControl())
      .setup(instance => instance.valueChanges)
      .returns(cold("-a", {a: today}))
      .setup(instance => instance.statusChanges)
      .returns(cold(""));

    const formGroup = new Mock<FormGroup>()
      .setup(instance => instance.get(controlName))
      .returns(formControlMock.object())
      .object();

    resolve<ControlContainer>(ControlContainer)
      .setup(instance => instance.control)
      .returns(formGroup);

    const component = get<DateSelectorComponent>();
    component.ngOnInit();
    component.registerOnChange(value => {
      expect(value).toBeNull();
    });
  });

  it("Unsubscribes from date changed event on component destroy", () => {
    const today = utc([2018, 5, 25]).valueOf();
    const controlName = "ControlName";

    const formControlMock = new Mock<FormControl>()
      .prototypeof(new FormControl())
      .setup(instance => instance.valueChanges)
      .returns(cold("-a", {a: today}))
      .setup(instance => instance.statusChanges)
      .returns(cold(""));

    const formGroup = new Mock<FormGroup>()
      .setup(instance => instance.get(controlName))
      .returns(formControlMock.object())
      .object();

    resolve<ControlContainer>(ControlContainer)
      .setup(instance => instance.control)
      .returns(formGroup);

    const component = get<DateSelectorComponent>();
    component.ngOnInit();
    component.ngOnDestroy();

    const actual = new ReplaySubject(1);

    component.registerOnChange(value => {
      actual.next(value);
    });
    expect(actual).toBeObservable(cold(""));
  });

  it("Sets navigator current language as date adapter locale", () => {
    const language = "language key";

    resolve<NavigatorLanguageProvider>(NavigatorLanguageProvider)
      .setup(instance => instance.get())
      .returns(language);

    const component = get<DateSelectorComponent>();
    component.ngOnInit();

    resolve<DateAdapter<any>>(DateAdapter)
      .verify(instance => instance.setLocale(language));
  });
});
