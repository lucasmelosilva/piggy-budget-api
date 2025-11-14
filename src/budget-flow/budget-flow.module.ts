import { Module } from '@nestjs/common';
import { BudgetFlowService } from './budget-flow.service';
import { BudgetFlowController } from './budget-flow.controller';

@Module({
  controllers: [BudgetFlowController],
  providers: [BudgetFlowService],
})
export class BudgetFlowModule {}
