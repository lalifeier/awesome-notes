<template>
  <div>
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <ul>
      <li v-for="number in numbers" :key="number">
        <h1>{{ number }}</h1>
      </li>
    </ul>
    <h1>{{ person.name }}</h1>
    <h1>{{ greetings }}</h1>
    <h1>x: {{ x }}, y: {{ y }}</h1>
    <h1 v-if="loading">loading</h1>
    <!-- <img v-if="loaded" :src="result.message" /> -->
    <img v-if="loaded" :src="result[0].url" />
    <button @click="openModal">Open Modal</button>
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose"> My Modal </modal>

    <Suspense>
      <template #default>
        <async-show></async-show>
        <DogShow></DogShow>
      </template>
      <template #fallback>
        <h1>loading</h1>
      </template>
    </Suspense>
    <p>{{ error }}</p>
    <button @click="increment">+1</button>
    <button @click="updateGreeting">Update Title</button>
  </div>
</template>

<script lang="ts">
import {
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTriggered,
  ref,
  watch,
  onUnmounted,
  defineComponent,
  onErrorCaptured,
} from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoaders from './hooks/useURLLoaders'
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'
interface DataProps {
  count: number
  double: number
  increment: () => void
  numbers: number[]
  person: { name?: string }
}
interface DogResult {
  message: string
  status: string
}
interface CatResult {
  breeds: []
  id: string
  url: string
  width: number
  height: number
}

const comonent = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      required: true,
      type: String,
    },
  },
  setup(props, context) {
    // props.msg
    // context.emit()
  },
})

export default {
  name: 'App',
  components: {
    Modal,
    AsyncShow,
    DogShow,
  },
  setup() {
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increment = () => {
    //   count.value++
    // }

    onMounted(() => {
      console.log('mounted')
    })
    onUpdated(() => {
      console.log('updated')
    })
    onRenderTriggered(event => {
      console.log(event)
    })

    const data: DataProps = reactive({
      count: 0,
      increment: () => {
        data.count++
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {},
    })
    data.numbers[0] = 5
    data.person.name = 'test'
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'hi'
    }
    const { x, y } = useMousePosition()
    // const { result, loading, loaded, error } = useURLLoaders<DogResult>(
    //   'https://dog.ceo/api/breeds/image/random'
    // )

    const { result, loading, loaded } = useURLLoaders<CatResult[]>(
      'https://api.thecatapi.comd/v1/images/search?limit=1'
    )
    watch([greetings, () => data.count, result], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)

      if (result.value) {
        console.log('value', result.value[0].url)
      }

      document.title = 'updated' + greetings.value + data.count
    })

    const refData = toRefs(data)

    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      console.log('--------')

      modalIsOpen.value = false
    }

    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      error,
    }
  },
}
</script>

<style lang="scss"></style>
