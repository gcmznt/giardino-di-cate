<template>
  <div class="wrapper">
    <img class="logo" src="/swing-ori.svg" alt="Swing" />
    <div
      v-for="day in days"
      v-bind:key="day.key"
      v-bind:day="day"
      class="card"
    >
      <h2>{{day.date}}</h2>
      <div
        v-for="el in day.entries"
        v-bind:key="el.title"
        class="day"
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
import days from "../static/data.json";
// import Event from "../components/Event.vue";

if (process.browser) {
  if ('serviceWorker' in window.navigator) {
    window.navigator.serviceWorker.register('/sw.js')
  }
}

export default {
  head: {
    title: "Giardino di Cate"
  },
  components: {
    // Event
  },
  data() {
    return {
      days: days.map(d => ({
        ...d,
        entries: d.entries.filter(e => e.title !== "Ha Mangiato?").map(e => ({
          title: e.title.replace("Ha Scaricato?", "🚽")
            .replace("Ha Dormito?", "😴")
            .replace("Ha Mangiato?", "🍽")
            .replace("Ha Fatto Merenda?", "🍭")
            .replace("Annotazioni Varie:", "📝")
            .replace("Attività Svolte?", "🎭")
            .replace("Patelli?", "💩")
            .replace("Ha avuto la Febbre?", "🌡")
            .replace("Menu del Giorno:", "🍱"),
          text: e.text
            .replace(/^si[\.\s]+/g, "")
            .replace(/^no/g, "❌")
            .trim()
            .split("\n")
            .map(e =>
              e
                .replace(/ no$/g, " ❌")
                .replace(/ quasi tutto$/g, " 👍")
                .replace(/ tutto$/g, " 🤤")
                .replace(/ si$/g, " ✅")
            )
            .filter(val => val)
        }))
      }))
    };
  }
};
</script>

<style>
body {
  background-color: #ff7979;
}

h2 {
  margin-bottom: 30px;
  text-align: center;
  padding: 20px;
  background-color: rgba(127, 127, 127, 0.1);
}

.logo {
  max-width: 200px;
  margin: 30px auto;
  display: block;
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

.day {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 10px 20px;
  line-height: 1.4;
}

.day div::first-letter {
  text-transform: capitalize;
}

h3 {
  font-size: 50px;
}
</style>
