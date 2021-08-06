import { CustomTransaction } from "@/api/reconcile/custom-transaction";

export class TransactionReportRow {
  trans1?: CustomTransaction | null;
  trans2?: CustomTransaction | null;

  constructor(trans1: CustomTransaction | null, trans2: CustomTransaction | null) {
    this.trans1 = trans1;
    this.trans2 = trans2;
  }
}
