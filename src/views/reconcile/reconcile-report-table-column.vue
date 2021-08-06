<template>
  <el-table-column
    :label="getColumnLabel()"
    :width="getWidth()"
    :align="getAlign()"
  >
    <template slot-scope="{ row }">
      <reconcile-report-table-cell
        :row="row"
        :field="field"
        :index="index"
      ></reconcile-report-table-cell>
    </template>
  </el-table-column>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ReconcileReportTableCell from "@/views/reconcile/reconcile-report-table-cell.vue";
import { Prop } from "vue-property-decorator";

@Component({
  components: { ReconcileReportTableCell },
})
export default class ReconcileReportTableColumnComponent extends Vue {
  @Prop({ required: true })
  field!: string;
  @Prop({ required: true })
  index!: number;

  getWidth() {
    switch (this.field) {
      case "profileName":
        return 150;
      case "transactionDate":
        return 160;
      case "transactionAmount":
        return 100;
      case "transactionNarrative":
        return 200;
      case "transactionDescription":
        return 200;
      case "transactionID":
        return 150;
      case "transactionType":
        return 100;
      case "walletReference":
        return 320;
      default:
        return 300;
    }
  }

  getAlign() {
    switch (this.field) {
      case "transactionAmount":
        return "right";
      case "profileName":
      case "transactionDate":
      case "transactionNarrative":
      case "transactionDescription":
      case "transactionID":
      case "transactionType":
      case "walletReference":
      default:
        return "left";
    }
  }

  getColumnLabel() {
    return this.$t(`reconcile.label.${this.field}`).toString();
  }
}
</script>

<style scoped lang="scss">
.reconcile-report-table-column {
}
</style>
