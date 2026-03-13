import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategis extends PassportStrategy(Strategy) {
    constructor(private readonly authservice: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string) {
        if (!email || !password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authservice.ValidateUser(email, password);
    }
}