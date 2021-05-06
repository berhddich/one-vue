<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1>{{ user.username }}</h1>
      <div class="user-profile__admin-badge" v-if="user.isAdmin">
        Admin
      </div>

      <div class="user-profile__admin-badge" v-else>
        Not admin
      </div>
      <div class="user-profile__user-panel-count">
        <strong>Followers:</strong>{{ followers }}
      </div>
      <form class="user-profile__create-twoot" @submit.prevent="createNewTwoot" :class="{'--exceeded':newTwootCharacterCount>180}">
        <label for="newTwoot"><strong>New Twoot</strong>({{newTwootCharacterCount}}/180)</label>
        <br />
        <textarea id="newTwoot" rows="4" v-model="newTwootContent" />

        <div class="user-profile__create-twoot-type">
          <label for="newTwootType"><strong>Type :</strong></label>
          <select id="newTwooType" v-model="selectedTwootType">
            <option
              :value="option.value"
              v-for="(option, index) in twootTypes"
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
        v-for="(twoot, index) in user.twoots"
        :key="index"
        :username="user.username"
        :twoot="twoot"
        @favourite="toggleFavourite"
      />
    </div>
  </div>
</template>
<script>
import TwootItem from "./TwootItem.vue";
export default {
  name: "UserProfile",
  components: { TwootItem },
  data() {
    return {
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
    };
  },

  computed: {
    fulName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },

    newTwootCharacterCount()
    {
      return this.newTwootContent.length;
    }
  },

  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavourite(id) {
      console.log(`Favourite tw #${id}`);
    },
    createNewTwoot() {
      if (this.newTwootContent && this.selectedTwootType !== "draft") {
        this.user.twoots.unshift({
          id: this.user.twoots.length + 1,
          content: this.newTwootContent,
        });
      }
      this.newTwootContent = "";
    },
  },

  mounted() {
    this.followUser();
  },
  watch: {
    followers() {},
  },
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
