const app = Vue.createApp({
    data() {
        return {
            title: "",
            message: "",
            author: ""
        }
    },
    methods: {
        onSubmit() {
            if(title == "" || message == "") return;

            axios.post("/addPost", {
                title: this.title,
                message: this.message,
                author: this.author
            }).then((res) => {
                console.log(res.data);
                window.location.replace(res.data);
            });
        }
    },
}).mount("#app");