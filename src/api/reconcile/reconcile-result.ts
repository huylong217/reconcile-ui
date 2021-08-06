import { CustomTransaction } from "@/api/reconcile/custom-transaction";

export class ReconcileResult {
  matchedTransCount = 0;
  unmatchedTrans1: CustomTransaction[] = [];
  unmatchedTrans2: CustomTransaction[] = [];
}
