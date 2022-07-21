<template>
  <div>
    <h2>GraphQL - codegen 라이브러리를 이용한 사용</h2>
    <h2>Query</h2>
    <div v-if="queryData">
      {{ queryData.getHello.name }} | {{ queryData.getHello.NewField.str }}
      <br />
      {{ queryData.getArgsName.name }} |
      {{ queryData.getArgsName.NewField.str }}
    </div>
    <h2>Mutation</h2>
    <div v-if="mutateData">
      {{ mutateData.getArgsType.name }} '|'
      {{ mutateData.getArgsType.NewField.str }} <br />
      {{ mutateData.getInputType.name }} '|'
      {{ mutateData.getInputType.NewField.str }}
    </div>
    <button @click="getMutation">가져오기</button>

    <h2>Subcription</h2>
    <label for="">수신할 ID : </label>
    <input type="text" v-model="subVariables.subID" placeholder="수신할 ID" />
    <br />
    <input type="text" v-model="subPost.str" placeholder="보낼 데이터" />
    <input
      type="text"
      v-model="subPost.postSub"
      placeholder="보낼 수신중인 ID"
    />
    <button @click="subMutation">보내기</button>
    {{ subArray }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  useArgsTypeMutation,
  usePostSubMutation,
  useQueryTestQuery,
  useSubTestSubscription,
} from "@/graphql/graphql-codegen";

export default defineComponent({
  async setup() {
    // query
    const { data: queryData } = useQueryTestQuery({
      variables: { argsName: "codegen 타입이야" },
    });
    console.log(queryData);
    // mutation
    const { data: mutateData, executeMutation } = useArgsTypeMutation();

    const getMutation = async () => {
      await executeMutation({
        inputType: {
          name: "inputName",
        },
        argsType: "argName",
      });
    };

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
      getMutation,
      subArray,
      subPost,
      subVariables,
      subMutation,
    };
  },
});
</script>

<style></style>
