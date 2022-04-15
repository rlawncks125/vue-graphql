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
  <h2>Subcription</h2>
  <label for="">수신할 ID : </label>
  <input type="text" v-model="subVariables.subID" placeholder="수신할 ID" />

  <br />
  <input type="text" v-model="subPost.str" placeholder="보낼 데이터" />
  <input type="text" v-model="subPost.postSub" placeholder="보낼 수신중인 ID" />
  <button @click="subMutation">보내기</button>
  <div>{{ subArray }}</div>
</template>

<script lang="ts">
import {
  useMutation,
  useQuery,
  useResult,
  useSubscription,
} from "@vue/apollo-composable";
import gql from "graphql-tag";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  watch,
} from "vue";

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

    // subscription
    const subArray = ref<any[]>([]);
    const subVariables = reactive({
      subID: "",
    });
    const { result: subResult } = useSubscription(
      gql`
        subscription ($subID: String!) {
          subTest(subID: $subID)
        }
      `,
      subVariables
    );

    watch(subResult, (data) => {
      console.log("new Data", data);
      subArray.value.push(data.subTest);
    });

    const subPost = reactive({
      str: "",
      postSub: "",
    });

    const { mutate: subMutation } = useMutation(
      gql`
        mutation ($str: String!, $postSub: String!) {
          postSub(str: $str, postSub: $postSub)
        }
      `,
      () => ({
        variables: {
          ...subPost,
        },
      })
    );

    //
    return {
      queryData,
      muationData,
      subArray,
      subMutation,
      subVariables,
      subPost,
    };
  },
});
</script>

<style scoped></style>
