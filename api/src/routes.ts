import { Router } from 'express';
import { LoanController } from './controllers/LoanController';

const router = Router();

const loanController = new LoanController();

//Loan
router.get("/loan", loanController.index);
router.post("/loan/simulate", loanController.simulate);
router.post("/loan", loanController.create);

export { router };