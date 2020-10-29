<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <ul>
      <li v-for="number in numbers" :key="number">
        {{ number }}
      </li>
    </ul>
    <h1>{{ person.name }}</h1>
    <button @click="increase">+1</button>
    <button @click="updateGreeting">updateGreeting</button>
  </div>
</template>

<script lang="ts">
import {
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTracked,
  ref,
  watch,
} from 'vue'
interface DataProps {
  count: number
  increase: () => void
  double: number
  numbers: number[]
  person: { name?: string }
}
export default {
  name: 'App',
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }

    onMounted(() => {
      console.log('onMounted')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onRenderTracked((event) => {
      // console.log(event)
    })

    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {},
    })
    data.numbers[0] = 5
    data.person.name = 'hello'

    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'hello'
    }
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)
      document.title = 'updated' + greetings.value + data.count
    })
    const refData = toRefs(data)
    return {
      ...refData,
      updateGreeting,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
