<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="Ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (TAB to save)</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase/init'

export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title.length > 0) {
        if(this.smoothie.ingredients.length > 0) {
          db.collection('smoothies').doc(this.smoothie.id).update(this.smoothie)
          .then(() => {
            this.$router.push('/');
          })
        } else {
          this.feedback = 'Must have at least 1 ingredient'
        }
      } else {
        this.feedback = 'Please add a title'
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient != ing;
      })
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(another)
        this.feedback = null;
      } else {
        this.feedback = 'Cannot add empty ingredient'
      }
    }
  },
  created() {
    let ref = db.collection('smoothies').doc(this.$route.params.id).get()
    .then(snapshot => {
      this.smoothie = snapshot.data();
    })
  }
}
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>