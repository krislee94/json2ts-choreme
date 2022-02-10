<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="inputvalue"
        name="inputvalue"
        label="待转换json"
        placeholder="请输入"
        autosize
        rows="8"
        type="textarea"
        id="bcpy"
      />
      <!-- <van-field
        v-model="changeValue"
        name="value"
        label="转换后的interface"
        autosize
        rows="8"
        type="textarea"
        class="cpy"
      /> -->
      <div id="cpyf" class="monca-editor" />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          转化
        </van-button>
      </div>
    </van-form>
    <div style="margin-top: 16px; padding: 16px">
      <van-button round block type="primary" @click="onCopy">复制</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import { defineComponent } from "vue";
import { Json2Ts } from "../lib/json2ts";
import { Dialog } from "vant";
import * as monaco from "monaco-editor";

export default defineComponent({
  name: "HelloWord",
  // props: {},
  setup: () => {
    // const state = reactive({});
    const inputvalue = ref("");
    const show = ref(false);
    const jsonvalue = ref("");
    const changeValue = ref("");

    //初始化
    let editor: any = null;
    onMounted(() => {
      //@ts-ignore
      editor = monaco.editor.create(document.getElementById("cpyf"), {
        language: "typescript",
        theme: "vs-dark",
        readOnly: false,
        minimap: { enabled: true },
        autoDetectHighContrast: true,
      });
    });
    const onSubmit = (values: any) => {
      console.log("submit", values);
      let json2ts = new Json2Ts();
      let result = null;
      try {
        result = json2ts.convert(values.inputvalue);
      } catch (error) {
        Dialog.alert({
          title: "失败",
          message: "翻译失败",
        });
      }
      if (result) {
        console.log(result);

        jsonvalue.value = result;

        changeValue.value = result;

        editor.setValue(result);

        console.log(editor);
      } else {
      }
    };

    const onCopy = (e: any) => {
      // let data = changeValue.value;
      let data = editor.getValue();
      let oinput = document.createElement("input");
      oinput.value = data;
      document.body.appendChild(oinput);
      oinput.select();
      document.execCommand("Copy");
      Dialog({
        message: "复制成功",
      });
      oinput.remove();
    };

    return {
      inputvalue,
      onSubmit,
      show,
      jsonvalue,
      changeValue,
      onCopy,
    };
  },
});
</script>



<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.monca-editor {
  height: 300px;
  padding-left: 60px;
}
</style>
