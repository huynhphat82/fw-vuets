<!-- Using Composition API: <script setup>
  The `setup` attribute is a hint that makes Vue perform compile-time transforms
  that allow us to use Composition API with less boilerplate
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
  msg: string;
}>();

// reactive state
const count = ref(0);

// functions that mutate state and trigger updates
function increment() {
  count.value++;
}

const rawHtml = '<h1>Raw Html&amp;</h1>';

const dynamicAttrs = {
  id: 'container',
  class: 'wrapper',
};
const attributeName = 'href';
const url = 'http://google.com';
const eventName = 'click';

function callDynamicEvent() {
  alert('This is dynamic event.');
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
  increment();
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div>
      <button @click="increment">Count is: {{ count }}</button>
      <p>Using v-html directive: <span v-html="rawHtml"></span></p>
      <div :id="'dynamicId'">Attributes Binding</div>
      <div v-bind="dynamicAttrs">Dynamic Attributes Binding</div>
      <div>
        <a :[attributeName]="url" target="_blank">Dynamic Arguments</a>
      </div>
      <div>
        <a @[eventName]="callDynamicEvent">Dynamic Event</a>
      </div>
    </div>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>
      +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
