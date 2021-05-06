<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1>{{ state.user.username }}</h1>
      <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
        Admin
      </div>

      <div class="user-profile__admin-badge" v-else>
        Not admin
      </div>
      <div class="user-profile__user-panel-count">
        <strong>Followers:</strong>{{ state.followers }}
      </div>
      <form class="user-profile__create-twoot" @submit.prevent="createNewTwoot" :class="{'--exceeded':newTwootCharacterCount>180}">
        <label for="newTwoot"><strong>New Twoot</strong>({{newTwootCharacterCount}}/180)</label>
        <br />
        <textarea id="newTwoot" rows="4" v-model="state.newTwootContent" />

        <div class="user-profile__create-twoot-type">
          <label for="newTwootType"><strong>Type :</strong></label>
          <select id="newTwooType" v-model="state.selectedTwootType">
            <option
              :value="option.value"
              v-for="(option, index) in state.twootTypes"
              :key="index"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <button>Twoot !</button>
      </form>
    </div>
    <div class="user-profile__twoots-wrapper">
      <TwootItem
        v-for="(twoot, index) in state.user.twoots"
        :key="index"
        :username="state.user.username"
        :twoot="twoot"
        @favourite="toggleFavourite"
      />
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue';
import TwootItem from "./TwootItem.vue";
export default {
  name: "UserProfile",
  components: { TwootItem },
  setup()
  {
   
   const state = reactive({
  newTwootContent: "",
      selectedTwootType: "instant",
      twootTypes: [
        {
          value: "draft",
          name: "Draft",
        },
        {
          value: "instant",
          name: "Instant Twoot",
        },
      ],
      followers: 0,
      user: {
        id: 1,
        username: "@_abdou",
        firstName: "abderrahim",
        lastName: "berhiddich",
        email: "abdou@gmail.com",
        isAdmin: true,
        twoots: [
          {
            id: 1,
            content: "Twotter is Amazing",
          },

          {
            id: 2,
            content: "Don 't forget to subscriber to Earth is Square !",
          },
        ],
      },

    })
    
    const newTwootCharacterCount= computed(()=>state.newTwootContent.length)
    const  fulName= computed(()=>  `${state.user.firstName} ${state.user.lastName}`)

   function followUser() {
      this.state.followers++;
    }

   function toggleFavourite(id) {
      console.log(`Favourite tw #${id}`);
    }
    function  createNewTwoot() {
      if (this.state.newTwootContent && this.state.selectedTwootType !== "draft") {
        this.state.user.twoots.unshift({
          id: this.state.user.twoots.length + 1,
          content: this.state.newTwootContent,
        });
      }
      this.state.newTwootContent = "";
    }

    return { state ,newTwootCharacterCount,fulName, followUser,toggleFavourite , createNewTwoot}

  } ,

 
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
    h1 {
      margin: 0;

    };
    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin: auto;
      padding: 0 10px;
      font-weight: bold;
      margin-left: 3px;
      margin-bottom: 5px;
      margin-top: 5px;
    };

    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin: auto;
      padding: 0 10px;
      font-weight: bold;
      margin-left: 3px;
      margin-bottom: 5px;
      margin-top: 5px;
    };
    .user-profile__create-twoot {
      border-top: 1px solid #dfe3e8;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      margin-top: 5px;
      &.--exceeded{
color: red;
border-color: red;
button {
background-color: red;
border: none;

}



      }
    };
  };
}
</style>
