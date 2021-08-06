<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :auto-upload="false"
          :multiple="true"
          :http-request="(e) => customUpload(e)"
          accept=".csv"
      >
        <el-button slot="trigger" size="small" type="">Select files</el-button>
        <el-button
            style="margin-left: 10px"
            size="small"
            type="primary"
            @click="submitUpload"
        >Compare
        </el-button>
      </el-upload>
    </el-card>

    <transition name="el-fade-in-linear">
      <el-card class="box-card" v-if="isShowResultCard" style="margin-top: 20px">
        <el-row :gutter="24">
          <el-col :span="12">
            <reconcile-result-card
                :file="fileList[0]"
                :reconcileResult="reconcileResult"
                :index="0"
            ></reconcile-result-card>
          </el-col>
          <el-col :span="12">
            <reconcile-result-card
                :file="fileList[1]"
                :reconcileResult="reconcileResult"
                :index="1"
            ></reconcile-result-card>
          </el-col>
          <el-col :span="12">
            <div style="padding-top: 10px">
              <el-button size="small" type="primary" @click="showReport"
              >Unmatched Report
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </transition>

    <transition name="el-fade-in-linear">
      <reconcile-report-table
          style="margin-top: 20px"
          v-if="isShowReport"
          :key="reconcileReportTableKey"
          :reconcileResult="reconcileResult"
          :fileList="fileList"
      ></reconcile-report-table>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {ElUpload} from "element-ui/types/upload";
import {reconcileApi} from "@/api/reconcile/reconcile-api";
import ReconcileResultCard from "@/views/reconcile/reconcile-result-card.vue";
import {ReconcileResult} from "@/api/reconcile/reconcile-result";
import ReconcileReportTable from "@/views/reconcile/reconcile-report-table.vue";
import {RequestErrorDefaultHandler} from "@/api/request-error-default-handler";

@Component({
  components: {ReconcileReportTable, ReconcileResultCard},
})
export default class ReconcileIndexComponent extends Vue {
  fileList_: File[] = [];
  fileList: File[] = [];
  reconcileResult?: ReconcileResult;

  isShowResultCard = false;
  isShowReport = false;
  reconcileReportTableKey = 0;

  customUpload(e: any) {
    this.fileList_.push(e.file);
  }

  validateForm() {
    return new Promise((resolve) => {
      const filesCount = !this.fileList_ ? 0 : this.fileList_.length;
      if (filesCount !== 2) {
        this.$message.error(
            this.$t("error.reconcile.onlySelect2Files").toString()
        );
        return;
      }
      resolve(true);
    });
  }

  collectFileList() {
    this.fileList_ = [];
    (this.$refs.upload as ElUpload).submit();
  }

  submitUpload() {
    this.collectFileList();
    this.validateForm().then((_) => {
      this.fileList = [];
      this.fileList.push(...this.fileList_);
      const formData = new FormData();
      let index = 0;
      this.fileList.forEach((file) => {
        formData.append(`csv${++index}`, file);
      });
      this.isShowResultCard = false;
      this.isShowReport = false;
      return reconcileApi
          .reconcile(formData)
          .then((reconcileResult) => {
            this.reconcileResult = reconcileResult;
            this.isShowResultCard = true;
          })
          .catch((error) => {
            new RequestErrorDefaultHandler(error).handleError();
          });
    });
  }

  showReport() {
    this.isShowReport = true;
    this.reconcileReportTableKey++;
  }
}
</script>

<style scoped lang="scss">
.reconcile-index {
}
</style>
