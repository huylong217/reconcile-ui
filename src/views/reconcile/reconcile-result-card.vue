<template>
  <div class="reconcile-result-card">
    <h2>
      {{ file.name }}
    </h2>
    <table>
      <tr>
        <td>Total Records</td>
        <td>
          <el-tag class="reconcile-indicator">{{ total }}</el-tag>
        </td>
      </tr>
      <tr>
        <td>Matching Records</td>
        <td>
          <el-tag type="success" class="reconcile-indicator">{{
            matchingCount
          }}</el-tag>
        </td>
      </tr>
      <tr>
        <td>Unmatched Records</td>
        <td>
          <el-tag type="warning" class="reconcile-indicator"
            >{{ unMatchedCount }}
          </el-tag>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ReconcileResult } from "@/api/reconcile/reconcile-result";

@Component({})
export default class ReconcileResultCardComponent extends Vue {
  @Prop({ required: true })
  file!: File;
  @Prop({ required: true })
  reconcileResult!: ReconcileResult;
  @Prop({ required: true })
  index!: number;

  private total = 0;
  private matchingCount = 0;
  private unMatchedCount = 0;

  created() {
    this.matchingCount = this.reconcileResult?.matchedTransCount || 0;
    this.unMatchedCount =
      (this.index === 0
        ? this.reconcileResult.unmatchedTrans1.length
        : this.reconcileResult.unmatchedTrans2.length) || 0;
    this.total = this.matchingCount + this.unMatchedCount;
  }
}
</script>

<style scoped lang="scss">
.reconcile-result-card {
  padding: 5px;
  border-radius: 4px;
  border: 2px;
}

.reconcile-indicator {
  font-size: larger;
  font-weight: bolder;
  width: 100%;
  text-align: center;
}
</style>
