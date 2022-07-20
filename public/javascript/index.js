const app = Vue.createApp({
    data() {
        return {
            posts: [],
            postUrl: "updatePost.html?id="
        }
    },
    methods: {
        getPosts() {
            axios.get("/getAllPosts").then((response) => {
                this.posts = response.data;
            });
            
        },
    },
    beforeMount() {
        this.getPosts()
    },
}).mount("#app");