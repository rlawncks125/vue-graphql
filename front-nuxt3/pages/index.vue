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
  <button @click="getMutation">가져오기</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  useArgsTypeMutation,
  useQueryTestQuery,
} from "@/graphql/graphql-codegen";

export default defineComponent({
  async setup() {
    // query
    const { data: queryData } = useQueryTestQuery({
      variables: { argsName: "codegen 타입이야" },
    });

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

    return {
      queryData,
      mutateData,
      getMutation,
    };
  },
});
</script>

<style></style>
