import i18n from "@/lang";
import { AxiosResponse } from "axios";
import { BusinessError } from "@/api/business-error";
import { Message } from "element-ui";

export class RequestErrorDefaultHandler {
  error: any;
  private businessErrorHandler_?: (
    requestErrorDefaultHandler: RequestErrorDefaultHandler,
    error: BusinessError[]
  ) => void;

  constructor(error: any) {
    this.error = error;
  }

  businessErrorHandler(
    handler: (
      requestErrorDefaultHandler: RequestErrorDefaultHandler,
      error: BusinessError[]
    ) => void
  ) {
    this.businessErrorHandler_ = handler;
    return this;
  }

  handleError() {
    const error = this.error;
    if (error.response) {
      const error_ = error.response as AxiosResponse;
      if (
        error_.status === 400 &&
        error_.data &&
        error_.data.message === "businessError"
      ) {
        const businessErrors: BusinessError[] = JSON.parse(error_.data.errors);
        this.businessErrorHandler_
          ? this.businessErrorHandler_(this, businessErrors)
          : this.handleForBusinessError(businessErrors);
      }
    } else {
      Message({
        message: error.message,
        type: "error",
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  }

  handleForBusinessError(businessErrors: BusinessError[]) {
    if (businessErrors && businessErrors.length) {
      businessErrors.forEach((businessError) => {
        Message({
          message: i18n.t(`error.${businessError.errorCode}`).toString(),
          type: "error",
          duration: 5 * 1000,
        });
      });
    }
  }

  // Message({
  //   message: error.message,
  //   type: "error",
  //   duration: 5 * 1000,
  // });
}
