const API_KEY = "PASTE_YOUR_API_KEY_HERE";
let currentQuestion = "";
let difficulty = "easy";

async function generateQuestion() {
    document.getElementById("feedback").innerText = "Thinking...";

    const prompt = `
Generate ONE ${difficulty} level question related to JavaScript.
Return only the question text.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    currentQuestion = data.choices[0].message.content;

    document.getElementById("questionBox").innerText = currentQuestion;
    document.getElementById("feedback").innerText = "";
}

async function submitAnswer() {
    const userAnswer = document.getElementById("answerInput").value;
    if (!userAnswer) return;

    document.getElementById("feedback").innerText = "Evaluating...";

    const prompt = `
Question: ${currentQuestion}
Student Answer: ${userAnswer}

Check if the answer is correct.
Respond with:
- "Correct" or "Incorrect"
- Short explanation
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    const result = data.choices[0].message.content;

    document.getElementById("feedback").innerText = result;

    // Simple adaptive difficulty
    if (result.toLowerCase().includes("correct")) {
        difficulty = difficulty === "easy" ? "medium" :
                     difficulty === "medium" ? "hard" : "hard";
    } else {
        difficulty = "easy";
    }
}
