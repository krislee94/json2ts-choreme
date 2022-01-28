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
      />
      <van-field
        v-model="changeValue"
        name="value"
        label="转换后的json"
        autosize
        rows="8"
        type="textarea"
        class="cpy"
      />

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div style="margin-top: 16px; padding: 16px">
      <van-button round block type="primary" @click="onCopy">复制</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { Json2Ts } from "../lib/json2ts";
import { Dialog } from "vant";

export default defineComponent({
  name: "HelloWord",
  // props: {},
  setup: () => {
    // const state = reactive({});
    const inputvalue = ref("");
    const show = ref(false);
    const jsonvalue = ref("");
    const changeValue = ref("");

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
        //复制
      } else {
      }
    };

    const onCopy = (e: any) => {
      // copyDomText(".cpy");
      let data = changeValue.value;
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
</style>
