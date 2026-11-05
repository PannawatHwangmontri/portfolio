import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const user = await this.supabaseService.verifyToken(token);

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Google sign-up is open in Supabase: restrict to allowlist, else only the legacy email/password admin.
    const allowed = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const isAdmin = allowed.length
      ? allowed.includes(user.email?.toLowerCase() ?? '')
      : user.app_metadata?.provider === 'email';
    if (!isAdmin) {
      throw new ForbiddenException('Not an admin account');
    }

    request.user = user;
    request.token = token;
    return true;
  }
}
