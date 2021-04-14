var postCreateBtn = document.getElementById("postCreateBtn");

var postCreateForm = document.querySelector(".postCreate-form");

postCreateBtn.addEventListener("click", function () {
    postCreateForm.classList.remove("hide");
});

const postCreateFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title-postCreate").value.trim();
    const content = document.querySelector("#content-postCreate").value.trim();

    console.log(title, content);

    if (title && content) {

        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        };
    };
};

document
    .querySelector(".postCreate-form")
    .addEventListener("submit", postCreateFormHandler);