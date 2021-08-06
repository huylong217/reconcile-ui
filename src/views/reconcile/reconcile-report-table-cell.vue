<template>
  <span :class="[isDiff ? 'color-danger' : '']">
    {{ getTransValue(index) }}
  </span>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {TransactionReportRow} from "@/views/reconcile/transaction-report-row";
import {Prop} from "vue-property-decorator";
import {stringUtils} from "@/utils/string-utils";

@Component({
  components: {},
})
export default class ReconcileReportTableCell extends Vue {
  @Prop({required: true})
  row!: TransactionReportRow;
  @Prop({required: true})
  index!: number;
  @Prop({required: true})
  field!: string;

  isDiff = false;

  created() {
    this.isDiff = stringUtils.compareString(
        this.getTransValue(0),
        this.getTransValue(1)
    ) !== 0;
  }

  getTransValue(index: number) {
    const trans = index === 0 ? this.row.trans1 : this.row.trans2;
    switch (this.field) {
      case "profileName":
        return trans?.profileName;
      case "transactionDate":
        return trans?.transactionDate;
      case "transactionAmount":
        return trans?.transactionAmount;
      case "transactionNarrative":
        return trans?.transactionNarrative;
      case "transactionDescription":
        return trans?.transactionDescription;
      case "transactionID":
        return trans?.transactionID;
      case "transactionType":
        return trans?.transactionType;
      case "walletReference":
        return trans?.walletReference;
      default:
        return "";
    }
  }
}
</script>

<style scoped lang="scss">
.color-danger {
  color: red;
}
</style>
