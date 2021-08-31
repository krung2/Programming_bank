import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RemittanceService } from './remittance.service';

@ApiTags('remittance')
@Controller('remittance')
export class RemittanceController {

  constructor(
    private readonly remittanceService: RemittanceService,
  ) { }
}
