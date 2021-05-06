<template>
  <div class="twoot-item" @click="favouritrTwoot(twoot.id)">
    <div class="user-profile__twoot">

      <div class="twoot-item__user">@{{ username }}</div>
      <div class="twoot-item__content">{{ twoot.content }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TwootItem",
  props: {
    username: {
      type: String,
      required: true,
    },
    twoot: {
      type: Object,
      required: true,
    },
  },
  setup(pr,ctx){

 function  favouritrTwoot(id)
{
    ctx.emit('favourite',id)

}
return{favouritrTwoot}

  },
 
};
</script>

<style  lang="scss"  scoped  >
.twoot-item {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1p solid #dfe3e8;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-bottom: 10px;

      &:hover {
  transform: scale(1.1, 1.1);
};
.twoot-item__user{
    font-weight: bold;
}
}


</style>
