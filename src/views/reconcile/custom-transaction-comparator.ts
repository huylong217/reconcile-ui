import { CustomTransaction } from "@/api/reconcile/custom-transaction";
import { stringUtils } from "@/utils/string-utils";

export class CustomTransactionComparator {
  compare(o1: CustomTransaction, o2: CustomTransaction): number {
    return this.compareString(o1.transactionID, o2.transactionID);
  }

  compareNumber(number1: number, number2: number) {
    if (number1 === number2) return 0;
    else if (number1 < number2) return -1;
    else return 1;
  }

  compareString(value1: string | undefined, value2: string | undefined) {
    return (value1 || "").localeCompare(value2 || "");
  }
}

export const customTransactionComparator = new CustomTransactionComparator();
