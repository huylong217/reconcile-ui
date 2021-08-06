<template>
  <el-card class="box-card">
    <div>
      <el-table
          :data="transReportRows"
          style="width: 100%"
          border
          max-height="700"
      >
        <el-table-column
            type="index"
            width="50"
            label="#"
            fixed
        ></el-table-column>

        <el-table-column width="80" fixed>
          <template slot-scope="{ row }">
            <reconcile-report-show-diff
                :transactionReportRow="row"
                :fileList="fileList"
            >
              <el-button type="text" size="small">Show Diffs</el-button>
            </reconcile-report-show-diff>
          </template>
        </el-table-column>

        <!--   transaction 1     -->
        <el-table-column :label="fileName1">
          <reconcile-report-table-column
              :field="'profileName'"
              :index="0"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionDate'"
              :index="0"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionAmount'"
              :index="0"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionNarrative'"
              :index="0"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionDescription'"
              :index="0"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionID'"
              :index="0"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionType'"
              :index="0"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'walletReference'"
              :index="0"
          ></reconcile-report-table-column>
        </el-table-column>
        <!--   transaction 1:end     -->

        <!--   transaction 2     -->
        <el-table-column :label="fileName2">
          <reconcile-report-table-column
              :field="'profileName'"
              :index="1"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionDate'"
              :index="1"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionAmount'"
              :index="1"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionNarrative'"
              :index="1"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionDescription'"
              :index="1"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionID'"
              :index="1"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'transactionType'"
              :index="1"
          ></reconcile-report-table-column>

          <reconcile-report-table-column
              :field="'walletReference'"
              :index="1"
          ></reconcile-report-table-column>
        </el-table-column>
        <!--   transaction 2:end     -->
      </el-table>
    </div>
  </el-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {ReconcileResult} from "@/api/reconcile/reconcile-result";
import {TransactionReportRow} from "@/views/reconcile/transaction-report-row";
import {CustomTransaction} from "@/api/reconcile/custom-transaction";
import {customTransactionComparator} from "@/views/reconcile/custom-transaction-comparator";
import ReconcileReportTableCell from "@/views/reconcile/reconcile-report-table-cell.vue";
import ReconcileReportTableColumn from "@/views/reconcile/reconcile-report-table-column.vue";
import ReconcileReportShowDiff from "@/views/reconcile/reconcile-report-show-diff.vue";

@Component({
  components: {
    ReconcileReportShowDiff,
    ReconcileReportTableColumn,
    ReconcileReportTableCell,
  },
})
export default class ReconcileReportTableComponent extends Vue {
  @Prop({required: true})
  reconcileResult!: ReconcileResult;
  @Prop({required: true})
  fileList!: File[];

  transReportRows: TransactionReportRow[] = [];
  private fileName1: string = "";
  private fileName2: string = "";

  created() {
    this.fileName1 = this.fileList[0].name || "-";
    this.fileName2 = this.fileList[1].name || "-";
    this.populateTransReportRows();
  }

  populateTransReportRows() {
    this.transReportRows = [];
    const unmatchedTrans1 = (this.reconcileResult.unmatchedTrans1 || []).sort(
        (o1, o2) => customTransactionComparator.compare(o1, o2)
    );
    const unmatchedTrans2 = (this.reconcileResult.unmatchedTrans2 || []).sort(
        (o1, o2) => customTransactionComparator.compare(o1, o2)
    );
    let index1 = -1;
    let index2 = -1;
    const length1 = unmatchedTrans1.length;
    const length2 = unmatchedTrans2.length;
    let trans1: CustomTransaction | null = null;
    let trans2: CustomTransaction | null = null;
    while (index1 < length1 - 1 && index2 < length2 - 1) {
      if (!trans1) trans1 = unmatchedTrans1[++index1];
      if (!trans2) trans2 = unmatchedTrans2[++index2];
      const compareResult = customTransactionComparator.compare(trans1, trans2);
      if (compareResult === 0) {
        this.transReportRows.push(new TransactionReportRow(trans1, trans2));
        trans1 = trans2 = null;
      } else if (compareResult < 0) {
        this.transReportRows.push(new TransactionReportRow(trans1, null));
        trans1 = null;
      } else {
        this.transReportRows.push(new TransactionReportRow(null, trans2));
        trans2 = null;
      }
    }
    if (trans1) this.transReportRows.push(new TransactionReportRow(trans1, null));
    if (trans2) this.transReportRows.push(new TransactionReportRow(null, trans2));
    while (index1 < length1 - 1) {
      trans1 = unmatchedTrans1[++index1];
      this.transReportRows.push(new TransactionReportRow(trans1, null));
    }
    while (index2 < length2 - 1) {
      trans2 = unmatchedTrans2[++index2];
      this.transReportRows.push(new TransactionReportRow(null, trans2));
    }
  }
}
</script>

<style scoped lang="scss">
.reconcile-report-table {
}
</style>
