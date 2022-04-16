<template>
  <h2>GraphQL - codegen 라이브러리를 이용한 사용</h2>
  <h2>Query</h2>
  <div v-if="queryData">
    <div v-for="item in queryData" :key="item.id">
      {{ item.name }} '|' {{ item.NewField.str }}
    </div>
  </div>
  <h2>Mutation</h2>
  <div v-if="mutateData">
    <div v-for="item in mutateData" :key="item.id">
      {{ item.name }} '|' {{ item.NewField.str }}
    </div>
  </div>
  <h2>Subcription</h2>
  <label for="">수신할 ID : </label>
  <input type="text" v-model="subVariables.subID" placeholder="수신할 ID" />
  <br />
  <input type="text" v-model="subPost.str" placeholder="보낼 데이터" />
  <input type="text" v-model="subPost.postSub" placeholder="보낼 수신중인 ID" />
  <button @click="subMutation">보내기</button>
  {{ subArray }}
</template>

<script lang="ts">
import {
  useArgsTypeMutation,
  usePostSubMutation,
  useQueryTestQuery,
  useSubTestSubscription,
} from "@/graphql/graphql-codegen";
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  setup() {
    // query
    const { data: queryData } = useQueryTestQuery({
      variables: { argsName: "codegen 타입이야" },
    });

    watch(queryData, () => {
      console.log(queryData.value?.getHello);
    });

    // mutation
    const { data: mutateData, executeMutation } = useArgsTypeMutation();

    executeMutation({
      inputType: {
        name: "inputName",
      },
      argsType: "argName",
    });
    watch(mutateData, () => {
      console.log(mutateData.value);
    });

    // subscription
    const subArray = ref<any[]>([]);
    const subVariables = reactive({
      subID: "",
    });

    const { data: subData } = useSubTestSubscription({
      variables: subVariables,
    });

    watch(subData, () => {
      subArray.value.push(subData.value?.subTest);
      console.log(subData.value);
    });

    const subPost = reactive({
      str: "",
      postSub: "",
    });
    const { executeMutation: sendmutation } = usePostSubMutation();
    const subMutation = () => {
      sendmutation({
        str: subPost.str,
        postSub: subPost.postSub,
      });
    };

    return {
      queryData,
      mutateData,
      subArray,
      subPost,
      subVariables,
      subMutation,
    };
  },
});
</script>

<style scoped></style>
