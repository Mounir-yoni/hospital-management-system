import { PartialType } from '@nestjs/swagger';
import { CreateRadiologistDto } from './create-radiologist.dto';

export class UpdateRadiologistDto extends PartialType(CreateRadiologistDto) {}
