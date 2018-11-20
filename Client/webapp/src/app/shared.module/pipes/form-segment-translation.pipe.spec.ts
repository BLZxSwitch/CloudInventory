import { TranslateService } from "@ngx-translate/core";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { FormSegmentTranslationPipe } from "./form-segment-translation.pipe";
import { InputFeedbackPipe } from "./input-feedback.pipe";

describe("FormSegmentTranslationPipe", () => {
  beforeEach(() => {
    createInjector(FormSegmentTranslationPipe);
  });

  it("Returns translation", () => {
    const translation = "translation";
    const type = "type";
    const segment = "segment";
    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.instant("FORM.SEGMENT.TYPE"))
      .returns(translation);

    const pipe = get<InputFeedbackPipe>();
    const actual = pipe.transform(segment, type);

    expect(actual).toBe(translation);
  });
});
