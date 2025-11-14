import { Controller } from '@nestjs/common';
import { BudgetFlowService } from './budget-flow.service';

@Controller('budget-flow')
export class BudgetFlowController {
  constructor(private readonly budgetFlowService: BudgetFlowService) {}
}
