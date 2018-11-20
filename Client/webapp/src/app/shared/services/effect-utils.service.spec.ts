import { MatDialog, MatSnackBar } from "@angular/material";
import { MatDialogRef } from "@angular/material/dialog/typings/dialog-ref";
import { TranslateService } from "@ngx-translate/core";
import { cold, hot } from "jasmine-marbles";
import { It, Mock, Times } from "moq.ts";
import { createInjectorWithActions, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { ResetPasswordSuccess } from "../../auth/actions/auth.actions";
import { DescriptionProvider } from "../../core/services/description.provider/description.provider";
import { EmployeeDTO, IUserDTO } from "../../core/services/service-proxies";
import { TranslatableService } from "../../core/services/translate/translatable.service";
import { EmployeeDeleteFailure, EmployeeEditSuccess, EmployeesActionTypes } from "../../data/actions/employees.actions";
import { EmployeeDialogClosed, EmployeeEdit, StaffActionTypes } from "../../staff.module/actions/staff.actions";
import { EmployeeInfoDialogComponent } from "../../staff.module/containers/employee-info-dialog/employee-info-dialog.component";
import { EffectUtilsService } from "./effect-utils.service";

describe("EffectUtilsService", () => {
  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActions(EffectUtilsService);
  });

  describe("createSuccessSnackEffect", () => {
    it("should open snackbar when corresponding action is dispatched with messageTranslationKey as string", () => {
      const service = get<EffectUtilsService>();

      actions$.stream = hot("-a", {
        a: new EmployeeEditSuccess({employee: new EmployeeDTO()})
      });

      resolve<TranslateService>(TranslateService)
        .setup(instance => instance.get("KEY"))
        .returns(cold("-b", {b: "KEY"}));

      service.createSuccessSnackEffect(EmployeesActionTypes.EmployeeEditSuccess, "KEY", 1000)
        .subscribe(() => {
          resolve<MatSnackBar>(MatSnackBar)
            .verify(instance => instance.open("KEY", undefined, It.Is(({duration}) => duration === 1000)), Times.Once());
        });
    });

    it("should open snackbar when corresponding action is dispatched with messageTranslationKey as function", () => {
      const service = get<EffectUtilsService>();

      actions$.stream = hot("-a", {
        a: new ResetPasswordSuccess({user: {} as IUserDTO, token: "token"})
      });

      resolve<TranslateService>(TranslateService)
        .setup(instance => instance.get("KEY"))
        .returns(cold("-b", {b: "KEY"}));

      service.createSuccessSnackEffect(EmployeesActionTypes.EmployeeEditSuccess, ({localizationKeySegment}) => localizationKeySegment, 1000)
        .subscribe(() => {
          resolve<MatSnackBar>(MatSnackBar)
            .verify(instance => instance.open("KEY", undefined, It.Is(({duration}) => duration === 1000)), Times.Once());
        });
    });

    it("should open snackbar when corresponding action is dispatched with messageTranslationKey as function", () => {
      const service = get<EffectUtilsService>();

      actions$.stream = hot("-a", {
        a: new ResetPasswordSuccess({user: {} as IUserDTO, token: "token"})
      });

      resolve<TranslateService>(TranslateService)
        .setup(instance => instance.get("KEY"))
        .returns(cold("-b", {b: "KEY"}));

      service.createSuccessSnackEffect(EmployeesActionTypes.EmployeeEditSuccess, ({localizationKeySegment}) => localizationKeySegment, 1000)
        .subscribe(() => {
          resolve<MatSnackBar>(MatSnackBar)
            .verify(instance => instance.open("KEY", undefined, It.Is(({duration}) => duration === 1000)), Times.Once());
        });
    });
  });

  describe("createOpenDialogEffect", () => {

    it("should open dialog, close it and return a EmployeeDialogClosed on EmployeeEdit with EmployeeEditSuccess", () => {
      const employee = new EmployeeDTO();

      const stream = hot("-a-b", {
          a: new EmployeeEdit({employeeId: ""}),
          b: new EmployeeEditSuccess({employee})
        }
      );

      const service = get<EffectUtilsService>();

      const afterClosed = cold("---");

      const matDialogRef = new Mock<MatDialogRef<any, any>>()
        .setup(instance => instance.afterClosed())
        .returns(afterClosed)
        .setup(instance => instance.close())
        .returns(undefined);

      resolve<MatDialog>(MatDialog)
        .setup(instance => instance.open(EmployeeInfoDialogComponent, It.IsAny()))
        .returns(matDialogRef.object());

      const completion = new EmployeeDialogClosed();

      actions$.stream = stream;
      const expected = cold("---c", {c: completion});

      expect(service.createOpenDialogEffect([StaffActionTypes.EmployeeEdit],
        [EmployeesActionTypes.EmployeeEditSuccess],
        EmployeeInfoDialogComponent,
        EmployeeDialogClosed)).toBeObservable(expected);
    });

    it("should open dialog and return a EmployeeDialogClosed when dialog closed on EmployeeEdit", () => {
      const service = get<EffectUtilsService>();

      const stream = hot("-b", {
          b: new EmployeeEdit({employeeId: ""})
        }
      );

      const afterClosed = cold("---a", {a: {}});

      const matDialogRef = new Mock<MatDialogRef<any, any>>()
        .setup(instance => instance.afterClosed())
        .returns(afterClosed)
        .setup(instance => instance.close())
        .returns(undefined);

      resolve<MatDialog>(MatDialog)
        .setup(instance => instance.open(EmployeeInfoDialogComponent, It.IsAny()))
        .returns(matDialogRef.object());

      const completion = new EmployeeDialogClosed();

      actions$.stream = stream;
      const expected = cold("----c", {c: completion});

      expect(service.createOpenDialogEffect([StaffActionTypes.EmployeeEdit],
        [EmployeesActionTypes.EmployeeEditSuccess],
        EmployeeInfoDialogComponent,
        EmployeeDialogClosed)).toBeObservable(expected);
    });
  });

  describe("createErrorSnackEffect", () => {
    it("should return dialogConfirmActionToDispatch on dialogOpenAction when confirm dialog is confirmed", () => {
      const service = get<EffectUtilsService>();
      const error = "error";
      const description = "description";
      const translated = "TRANSLATION";

      const stream = hot("-a", {
          a: new EmployeeDeleteFailure(error)
        }
      );

      resolve<DescriptionProvider>(DescriptionProvider)
        .setup(instance => instance.get(error))
        .returns(description);

      resolve<TranslatableService>(TranslatableService)
        .setup(instance => instance.get(description))
        .returns(cold("s", {s: translated}));

      actions$.stream = stream;

      service.createErrorSnackEffect(EmployeesActionTypes.EmployeeDeleteFailure, 1000).subscribe(() => {
        resolve<MatSnackBar>(MatSnackBar)
          .verify(instance => instance.open(translated, undefined, It.Is(({duration}) => duration === 1000)));
      });
    });
  });
});
