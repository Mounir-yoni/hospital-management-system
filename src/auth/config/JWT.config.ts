import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";


export default registerAs('jwt', (): JwtModuleOptions => ({
    secret: 'Trello-mini-project',
    signOptions: {
        expiresIn: '30h'
    }
}))