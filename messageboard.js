const SECURITY_CODE = "PEBBLE-183";

const messageForm = document.getElementById("message-form");
const messageList = document.getElementById("message-list");
const formResponse = document.getElementById("form-response");

const startingMessages = [
    {
        title: "Official Government Portal Established",
        author: "Office of Public Communications",
        date: "July 21, 2026",
        body: "The Government announces the establishment of its official online communications portal."
    },
    {
        title: "Puddle Monitoring Continues",
        author: "Department of Puddle Ecology",
        date: "July 21, 2026",
        body: "The national puddle remains present. Further developments will be reported as circumstances become wetter."
    }
];

let messages = loadMessages();

function loadMessages() {
    const savedMessages = localStorage.getItem("rohoecopudoffcaliMessages");

    if (savedMessages) {
        return JSON.parse(savedMessages);
    }

    return startingMessages;
}

function saveMessages() {
    localStorage.setItem(
        "rohoecopudoffcaliMessages",
        JSON.stringify(messages)
    );
}

function displayMessages() {
    messageList.innerHTML = "";

    if (messages.length === 0) {
        messageList.textContent = "No official notices are currently available.";
        return;
    }

    [...messages].reverse().forEach((message, index) => {
        const article = document.createElement("article");

        const heading = document.createElement("h3");
        heading.textContent = message.title;

        const details = document.createElement("p");
        details.textContent =
            `Issued by ${message.author} on ${message.date}`;

        const body = document.createElement("p");
        body.textContent = message.body;

        const reference = document.createElement("p");
        reference.textContent =
            `Notice Reference: RHC-${String(messages.length - index).padStart(4, "0")}`;

        article.appendChild(heading);
        article.appendChild(details);
        article.appendChild(body);
        article.appendChild(reference);
        article.appendChild(document.createElement("hr"));

        messageList.appendChild(article);
    });
}

messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const author = document
        .getElementById("official-name")
        .value
        .trim();

    const title = document
        .getElementById("message-title")
        .value
        .trim();

    const body = document
        .getElementById("message-body")
        .value
        .trim();

    const submittedCode = document
        .getElementById("security-code")
        .value;

    if (submittedCode !== SECURITY_CODE) {
        formResponse.textContent =
            "ACCESS DENIED. This incident has been recorded by the Office of Incorrect Codes.";
        return;
    }

    const newMessage = {
        author: author,
        title: title,
        body: body,
        date: new Date().toLocaleDateString()
    };

    messages.push(newMessage);
    saveMessages();
    displayMessages();

    messageForm.reset();

    formResponse.textContent =
        "Official notice accepted. Administrative processing is complete.";
});

displayMessages();
