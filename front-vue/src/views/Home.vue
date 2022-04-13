<template>
  <div class="home">apllo GeaphQL 테스트</div>
  <h2>Qeury</h2>
  <div v-if="queryData">
    {{ queryData.getArgsName.name }} 'V'
    {{ queryData.getArgsName.NewField.str }}
    <br />
    {{ queryData.getHello.name }} 'V'
    {{ queryData.getHello.NewField.str }}
  </div>
  <h2>Mutation</h2>
  <div v-if="muationData">
    {{ muationData.data.getArgsType.name }}
    {{ muationData.data.getInputType.name }}
  </div>
</template>

<script lang="ts">
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, defineComponent, onMounted, ref, toRaw, watch } from "vue";

export default defineComponent({
  setup() {
    const {
      result: queryResult,
      loading,
      error,
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
    const muationData = ref();

    watch(queryResult, () => {
      console.log(queryData.value);
    });

    const { mutate: sendMutation, onDone } = useMutation(
      gql`
        mutation testMutation($inputType: GRinputType!, $argsType: String!) {
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
      argsType: "ㅋㅋ",
    });

    onDone((result) => {
      console.log(result);
      muationData.value = result;
    });
    return { queryData, muationData };
  },
});
</script>

<style scoped></style>
