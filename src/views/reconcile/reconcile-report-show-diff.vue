<template>
  <el-popover placement="right" trigger="click">
    <el-table :data="fields" border>
      <el-table-column width="200" label="Field">
        <template slot-scope="{ row }">
          <span style="font-weight: bolder"> {{ getFieldLabel(row) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" :label="fileName1">
        <template slot-scope="{ row }">
          <reconcile-report-table-cell
            :row="transactionReportRow"
            :field="row"
            :index="0"
          ></reconcile-report-table-cell>
        </template>
      </el-table-column>

      <el-table-column width="200" :label="fileName2">
        <template slot-scope="{ row }">
          <reconcile-report-table-cell
            :row="transactionReportRow"
            :field="row"
            :index="1"
          ></reconcile-report-table-cell>
        </template>
      </el-table-column>
    </el-table>
    <template slot="reference">
      <slot />
    </template>
  </el-popover>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { TransactionReportRow } from "@/views/reconcile/transaction-report-row";
  import ReconcileReportTableCell from "@/views/reconcile/reconcile-report-table-cell.vue";
  @Component({
    components: { ReconcileReportTableCell },
  })
  export default class ReconcileReportShowDiffComponent extends Vue {
    @Prop({ required: true })
    transactionReportRow!: TransactionReportRow;
    @Prop({ required: true })
    fileList!: File[];
    private fileName1: string = "";
    private fileName2: string = "";
    private fields: string[] = [
      "profileName",
      "transactionDate",
      "transactionAmount",
      "transactionNarrative",
      "transactionDescription",
      "transactionID",
      "transactionType",
      "walletReference",
    ];
    created() {
      this.fileName1 = this.fileList[0].name || "-";
      this.fileName2 = this.fileList[1].name || "-";
    }
    getFieldLabel(field) {
      return this.$t(`reconcile.label.${field}`).toString();
    }
  }
</script>

<style scoped lang="scss">
  .reconcile-report-show-diff {
  }
</style>
