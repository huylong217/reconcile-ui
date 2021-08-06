import { RequestBuilder } from "@/api/request-builder";
import { ReconcileResult } from "@/api/reconcile/reconcile-result";

export class ReconcileApi {
  reconcile(form: FormData): Promise<ReconcileResult> {
    return new RequestBuilder<ReconcileResult>()
      .url("/reconcile")
      .data(form)
      .post();
  }
}

export const reconcileApi = new ReconcileApi();
