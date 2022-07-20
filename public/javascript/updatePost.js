const app = Vue.createApp({
    data() {
        return {
            id: new URLSearchParams(window.location.search).get("id"),
            title: "",
            message: "",
            author: "",
            alert: document.getElementById("alert")
        }
    },
    methods: {
        getPost(){
            
            axios.get(`/getPost?id=${this.id}`).then((response) => {
                this.title = response.data.title;
                this.message = response.data.message;
                this.author = response.data.author;
            });
        },
        deletePost() {
            axios.delete(`/deletePost?id=${this.id}`).then((res) => {
                window.location.replace(res.data);
            });
        },
        updatePost() {
            if(title == "" || message == "") return;

            axios.post(`/changePost?id=${this.id}`, {
                id: this.id,
                title: this.title,
                message: this.message,
                author: this.author
            }).then((res) => {
                window.location.replace(res.data);
            });
        },
        showDelete() {
            this.alert.classList.remove("hide");
            console.log("show")
        },
        hideDelete() {
            this.alert.classList.add("hide");
            console.log("hide");
        }
    },
    beforeMount() {
        this.getPost();
    }
}).mount("#app");