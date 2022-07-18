const app = Vue.createApp({
    data() {
        return {
            posts: []
        }
    },
    methods: {
        getPosts() {
            let posts;
            axios.post("/getAllPosts").then((response) => {
                this.posts = response.data;
            });

        }
    },
    beforeMount() {
        this.getPosts()
    },
}).mount("#app");