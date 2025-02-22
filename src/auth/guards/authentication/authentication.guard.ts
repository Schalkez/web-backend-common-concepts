import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from '@/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '@/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes =
      this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthenticationGuard.defaultAuthType;

    const guards = authTypes
      .map((authType) => this.authTypeGuardMap[authType])
      .flat();

    // const error = new UnauthorizedException();

    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);
        return canActivate;
      } catch (error) {
        // do nothing
        console.log(error);
      }

      return await guard.canActivate(context);
    }

    return true;
  }
}
