<template>
  <div class="wrapper">
    <div
      v-for="entry in entries"
      v-bind:key="entry.key"
      v-bind:entry="entry"
      class="card"
    >
      <h2>{{entry.date}}</h2>
      <div
        v-for="el in entry.entries"
        v-bind:key="el.title"
        class="entry"
      >
        <h3>{{el.title}}</h3>
        <div>
          <div v-for="t in el.text" :key="t">{{t}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import entries from "../static/data.json";
// import Event from "../components/Event.vue";

export default {
  head: {
    title: "Giardino di Cate"
  },
  components: {
    // Event
  },
  data() {
    return {
      entries
    };
  }
};
</script>

<style>
body {
  background-color: #9b59b6;
}

h2 {
  margin-bottom: 30px;
  text-align: center;
  padding: 20px;
  background-color: rgba(127, 127, 127, 0.1);
}

.wrapper {
  max-width: 500px;
  margin: auto;
}

.card {
  background-color: #fff;
  margin: 20px;
  border-radius: 7px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
}

.entry {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 10px 20px;
  line-height: 1.4;
}

.entry div::first-letter {
  text-transform: capitalize;
}

h3 {
  font-size: 50px;
}
</style>
