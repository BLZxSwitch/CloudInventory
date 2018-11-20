import { Router } from "@angular/router";
import { cold, hot } from "jasmine-marbles";
import { It, Times } from "moq.ts";
import { AuthService } from "ng2-ui-auth";
import { createInjectorWithActions, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { AuthProtectedRouteActivated } from "../../core/actions/app.actions";
import { RoutesService } from "../../core/services/routes.service";
import {
  AuthServiceProxy,
  ForgotPasswordRequest, OtpSignInRequest,
  ResetPasswordRequest, SetPasswordRequest,
  SignInRequest, SignInResponse,
  UserDTO, UserServiceProxy} from "../../core/services/service-proxies";
import * as fromAuth from "../actions/auth.actions";
import { MeRequestSuccess, ResetPasswordSuccess, SetPasswordSuccess } from "../actions/auth.actions";
import { AuthEffects } from "./auth.effects";

describe("AuthEffects", () => {
  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActions(AuthEffects);
  });

  describe("meRequest$", () => {
    it("should return a MeRequestSuccess when user have valid token and success api request on AuthProtectedRouteActivated", () => {
      const effects = get<AuthEffects>();

      actions$.stream = hot("-a", {
        a: new AuthProtectedRouteActivated()
      });

      const user = new UserDTO();
      const response = cold("-b", {b: user});
      const completion = new MeRequestSuccess({user});

      resolve<UserServiceProxy>(UserServiceProxy)
        .setup(instance => instance.me())
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.meRequest$).toBeObservable(expected);
    });

    it("should return a EMPTY when calling api fails on AuthProtectedRouteActivated", () => {
      const effects = get<AuthEffects>();

      actions$.stream = hot("-a", {
        a: new AuthProtectedRouteActivated()
      });

      const response = cold("-#", undefined, "Error!");

      resolve<UserServiceProxy>(UserServiceProxy)
        .setup(instance => instance.me())
        .returns(response);

      const expected = cold("---");

      expect(effects.meRequest$).toBeObservable(expected);
    });

    it("should return MeRequestSuccess only on the first AuthProtectedRouteActivated", () => {
      const effects = get<AuthEffects>();

      actions$.stream = hot("-a----b----c", {
        a: new AuthProtectedRouteActivated(),
        b: new AuthProtectedRouteActivated(),
        c: new AuthProtectedRouteActivated(),
      });

      const user = new UserDTO();
      const response = cold("-d", {d: user});
      const completion = new MeRequestSuccess({user});

      resolve<UserServiceProxy>(UserServiceProxy)
        .setup(instance => instance.me())
        .returns(response);

      const expected = cold("--e", {e: completion});

      expect(effects.meRequest$).toBeObservable(expected);
    });
  });

  describe("login$", () => {
    it("should return a LoginFailure when user fails to authenticates on Login", () => {
      const effects = get<AuthEffects>();

      const signInRequest = new SignInRequest();
      const error = "Error!";

      actions$.stream = hot("-a", {
        a: new fromAuth.Login(signInRequest)
      });

      const user = new UserDTO();
      const response = cold("-#", undefined, error);
      const completion = new fromAuth.LoginFailure(error);

      resolve<AuthService>(AuthService)
        .setup(instance => instance.isAuthenticated())
        .returns(true);

      resolve<AuthService>(AuthService)
        .setup(instance => instance.login(signInRequest))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe("otpLogin$", () => {
    it("should return a LoginSuccess when user successfully authenticates on otpLogin", () => {
      const effects = get<AuthEffects>();

      const otpSignInRequest = new OtpSignInRequest();

      actions$.stream = hot("-a", {
        a: new fromAuth.OtpLogin(otpSignInRequest)
      });

      const user = new UserDTO();

      const response = cold("-b", {b: {user}});
      const completion = new fromAuth.LoginSuccess({user});

      resolve<AuthService>(AuthService)
        .setup(instance => instance.isAuthenticated())
        .returns(true);

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.otpSignIn(otpSignInRequest))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.otpLogin$).toBeObservable(expected);
    });

    it("should return a LoginFailure when user fails to authenticates on otpLogin$", () => {
      const effects = get<AuthEffects>();

      const otpSignInRequest = new OtpSignInRequest();
      const error = "Error!";

      actions$.stream = hot("-a", {
        a: new fromAuth.OtpLogin(otpSignInRequest)
      });

      const user = new UserDTO();
      const response = cold("-#", undefined, error);
      const completion = new fromAuth.LoginFailure(error);

      resolve<AuthService>(AuthService)
        .setup(instance => instance.isAuthenticated())
        .returns(true);

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.otpSignIn(otpSignInRequest))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.otpLogin$).toBeObservable(expected);
    });
  });

  describe("forgotPasswordRequest$", () => {
    it("should return a ForgotPasswordSuccess when user successfully requests password recovery", () => {
      const effects = get<AuthEffects>();

      const forgotPasswordRequest = new ForgotPasswordRequest();

      actions$.stream = hot("-a", {
        a: new fromAuth.ForgotPasswordRequest(forgotPasswordRequest)
      });

      const response = cold("-b");
      const completion = new fromAuth.ForgotPasswordSuccess();

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.forgotPassword(forgotPasswordRequest))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.forgotPasswordRequest$).toBeObservable(expected);
    });

    it("should return a ForgotPasswordFailure when user fails to requests password recovery", () => {
      const effects = get<AuthEffects>();

      const forgotPasswordRequest = new ForgotPasswordRequest();
      const error = "Error!";

      actions$.stream = hot("-a", {
        a: new fromAuth.ForgotPasswordRequest(forgotPasswordRequest)
      });

      const response = cold("-#", undefined, error);
      const completion = new fromAuth.ForgotPasswordFailure(error);

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.forgotPassword(forgotPasswordRequest))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.forgotPasswordRequest$).toBeObservable(expected);
    });
  });

  describe("resetPasswordRequest$", () => {
    it("should return a ResetPasswordSuccess when user successfully performs password recovery", () => {
      const effects = get<AuthEffects>();
      const resetPasswordRequest = new ResetPasswordRequest();

      const token = "token";
      const user = new UserDTO();

      const signInResponse = new SignInResponse({
        token,
        user,
      });

      actions$.stream = hot("-a", {
        a: new fromAuth.ResetPasswordRequest({...resetPasswordRequest})
      });

      const response = cold("-b", {b: signInResponse});
      const completion = new fromAuth.ResetPasswordSuccess({user, token});

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.resetPassword(It.IsAny()))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.resetPasswordRequest$).toBeObservable(expected);
    });

    it("should return a ResetPasswordFailure when user fails to performs password recovery", () => {
      const effects = get<AuthEffects>();

      const resetPasswordRequest = new ResetPasswordRequest();
      const error = "Error!";

      actions$.stream = hot("-a", {
        a: new fromAuth.ResetPasswordRequest({...resetPasswordRequest})
      });

      const response = cold("-#", undefined, error);
      const completion = new fromAuth.ResetPasswordFailure(error);

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.resetPassword(It.IsAny()))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.resetPasswordRequest$).toBeObservable(expected);
    });
  });

  describe("setPasswordRequest$", () => {
    it("should return a SetPasswordSuccess when user successfully performs password recovery", () => {
      const effects = get<AuthEffects>();
      const setPasswordRequest = new SetPasswordRequest();

      const token = "token";
      const user = new UserDTO();

      const signInResponse = new SignInResponse({
        token,
        user,
      });

      actions$.stream = hot("-a", {
        a: new fromAuth.SetPasswordRequest({...setPasswordRequest})
      });

      const response = cold("-b", {b: signInResponse});
      const completion = new fromAuth.SetPasswordSuccess({user, token});

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.setPassword(It.IsAny()))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.setPasswordRequest$).toBeObservable(expected);
    });

    it("should return a SetPasswordFailure when user fails to performs password recovery", () => {
      const effects = get<AuthEffects>();

      const setPasswordRequest = new SetPasswordRequest();
      const error = "Error!";

      actions$.stream = hot("-a", {
        a: new fromAuth.SetPasswordRequest({...setPasswordRequest})
      });

      const response = cold("-#", undefined, error);
      const completion = new fromAuth.SetPasswordFailure(error);

      resolve<AuthServiceProxy>(AuthServiceProxy)
        .setup(instance => instance.setPassword(It.IsAny()))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.setPasswordRequest$).toBeObservable(expected);
    });
  });

  describe("changePasswordSuccess$", () => {
    it("should return a LoginSuccess and perform setToken", () => {
      const effects = get<AuthEffects>();

      const token = "token";
      const user = new UserDTO();

      actions$.stream = hot("-a", {
        a: new ResetPasswordSuccess({user, token})
      });

      const completion = new fromAuth.LoginSuccess({user});

      const expected = cold("-b", {b: completion});

      expect(effects.changePasswordSuccess$).toBeObservable(expected);

      effects.changePasswordSuccess$.subscribe(() => {
        resolve<AuthService>(AuthService)
          .verify(instance => instance.setToken(token), Times.Once());
      });
    });
  });

  describe("changePasswordSuccess$", () => {
    it("should return a LoginSuccess and perform setToken", () => {
      const effects = get<AuthEffects>();

      const token = "token";
      const user = new UserDTO();

      actions$.stream = hot("-a", {
        a: new SetPasswordSuccess({user, token})
      });

      const completion = new fromAuth.LoginSuccess({user});

      const expected = cold("-b", {b: completion});

      expect(effects.changePasswordSuccess$).toBeObservable(expected);

      effects.changePasswordSuccess$.subscribe(() => {
        resolve<AuthService>(AuthService)
          .verify(instance => instance.setToken(token), Times.Once());
      });
    });
  });

  describe("loginSuccess$", () => {
    it("should navigate to homepage on LoginSuccess", () => {
      const effects = get<AuthEffects>();

      actions$.stream = hot("-a", {
        a: new fromAuth.LoginSuccess({user: new UserDTO()})
      });

      effects.loginSuccess$.subscribe(() => {
        resolve<Router>(Router)
          .verify(instance => instance.navigate(It.Is((value: string[]) => JSON.stringify(value) === JSON.stringify(["/"]))), Times.Once());
      });
    });
  });

  describe("otpRequest$", () => {
    it("should navigate to otp enter code page on otpRequest", () => {
      const effects = get<AuthEffects>();

      actions$.stream = hot("-a", {
        a: new fromAuth.OtpRedirect(new OtpSignInRequest())
      });

      const commands = ["URL"];

      resolve<RoutesService>(RoutesService)
        .setup(instance => instance.authOtpEnterCode())
        .returns(commands);

      effects.loginSuccess$.subscribe(() => {
        resolve<Router>(Router)
          .verify(instance => instance.navigate(commands), Times.Once());
      });
    });
  });

  describe("logout$", () => {
    it("should call logout method of AuthService", () => {

      const effects = get<AuthEffects>();

      actions$.stream = hot("-a", {
        a: new fromAuth.Logout()
      });

      const response = cold("-b");

      const expected = cold("--b");

      resolve<AuthService>(AuthService)
        .setup(instance => instance.logout())
        .returns(response);

      expect(effects.logout$).toBeObservable(expected);

      effects.logout$.subscribe(() => {
        resolve<AuthService>(AuthService)
          .verify(instance => instance.logout(), Times.Once());
      });
    });
  });

  describe("loginRedirect$", () => {

    function redirectOnActionCase(stream) {
      const effects = get<AuthEffects>();

      actions$.stream = stream;

      const commands = ["SOME_URL"];

      resolve<RoutesService>(RoutesService)
        .setup(instance => instance.authLogin())
        .returns(commands);

      effects.loginRedirect$.subscribe(() => {
        resolve<Router>(Router)
          .verify(instance => instance.navigate(commands), Times.Once());
      });
    }

    it("should navigate to logout on LoginRedirect", () => {
      redirectOnActionCase(hot("-a", {
        a: new fromAuth.LoginRedirect()
      }));
    });

    it("should navigate to logout on Logout", () => {
      redirectOnActionCase(hot("-a", {
        a: new fromAuth.Logout()
      }));
    });
  });
});
