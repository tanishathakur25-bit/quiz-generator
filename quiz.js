const btn = document.getElementById("generateBtn");
const topicInput = document.getElementById("topicInput");
const result = document.getElementById("result");

btn.addEventListener("click", generateQuiz);

async function generateQuiz(){

const topic = topicInput.value.trim();

if(!topic){
result.innerText = "Please enter a topic.";
return;
}

result.innerText = "Generating question...";

const API_KEY = "AIzaSyAgzBZ7FylOeu40Oq7CwWmlP4tQALkX8qs";

const prompt = `Create one simple quiz question and answer about ${topic}.
Format:
Question: ...
Answer: ...`;

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[{text:prompt}]
}
]
})
}
);

const data = await response.json();

console.log(data);

if(data.error){
result.innerText = data.error.message;
return;
}

if(data.candidates && data.candidates.length > 0){

const text = data.candidates[0].content.parts[0].text;

result.innerText = text;

}else{

result.innerText = "No question generated.";

}

}catch(error){

console.error(error);
result.innerText = "Request failed.";

}

}