<template>
  <div class="home">apllo GeaphQL 테스트</div>
  <h2>Qeury</h2>
  <div v-if="queryData">
    <div v-for="item in queryData" :key="item.id">
      {{ item.name }} '|' {{ item.NewField.str }}
    </div>
  </div>
  <h2>Mutation</h2>
  <div v-if="muationData">
    <div v-for="item in muationData" :key="item.id">
      {{ item.name }} '|' {{ item.NewField.str }}
    </div>
  </div>
</template>

<script lang="ts">
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, defineComponent, onMounted, ref, toRaw, watch } from "vue";

export default defineComponent({
  setup() {
    // Query
    const {
      result: queryResult,
      loading,
      error,
      fetchMore,
    } = useQuery(
      gql`
        query testQuery($argsName: String!) {
          getHello {
            name
            NewField {
              str
            }
          }
          getArgsName(name: $argsName) {
            name
            NewField {
              str
            }
          }
        }
      `,
      {
        argsName: "가나",
      }
    );

    const queryData = computed(() => queryResult.value);

    watch(queryResult, () => {
      console.log(queryData.value);
    });

    // Mutation
    const muationData = ref();

    const { mutate: sendMutation, onDone: mutationDone } = useMutation(
      gql`
        mutation ($inputType: GRinputType!, $argsType: String!) {
          getArgsType(name: $argsType) {
            name
            NewField {
              str
            }
          }
          getInputType(argsStr: $inputType) {
            name
            NewField {
              str
            }
          }
        }
      `
    );
    sendMutation({
      inputType: {
        name: "inputType",
      },
      argsType: "argsType",
    });

    mutationDone((result) => {
      console.log(result);
      muationData.value = result.data;
    });

    //
    return { queryData, muationData };
  },
});
</script>

<style scoped></style>
