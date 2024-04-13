# <h1 align="center">AI Platforms: A CRUD-ton!</h1>
#### <h3 align="center"><a href="https://ai-platforms-list-crud-64ab4f9bb249.herokuapp.com/platforms">Play on Heroku!</a></h3>

<div align="center">
 <a href="https://www.linkedin.com/in/nicholas-dimartino/" target="_blank">
      <img src="https://img.shields.io/badge/-linkedin.com/in/ndimartino-blue?style=flat&logo=Linkedin&logoColor=white">
 </a> 
  <a href="mailto:nick.l.dimartino@gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/-nick.l.dimartino@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white">
 </a>
</div>

## 📝Description
This is a CRUD (Create, Replace, Update, Delete) app centered around popular AI Platforms as of March 2024. Using MongoDB, OAuth, and Passport with Google Strategy, users can sign-in and add or remove AI Platforms from their favorites list.  Only the app creator can permanently remove AI Platforms from the overarching list.  Jest tests and Postman were used to verify working CRUD functionality of HTTP requests.  As a bonus, users can visit the AI Chatbots page to utilize the Groq API and OpenAI API to try out AI chatbots.  The OpenAI API was used for image generation and Langchain was used to personalize the chatbot to respond as a personalized person.  LlamaIndex can be configured to utilize Retrieval-Augmented Generation (RAG) if needed.

## 🖼️ Screenshots
<details>
 <summary> 📊 Browser Pages</summary>
 
 | Description | Screenshot |
 |------------ | ------------|
 | <h3 align="center">Home Page</h3> | <img src="./imgs/front-page.png" width="500">
 | <h3 align="center">AI Chatbots Page</h3> | <img src="./imgs/chatbot-page.png" width="500">
 | <h3 align="center">Favorites List</h3> | <img src="./imgs/favorites-page.png" width="500">
 
</details>

## 💻 Technologies Used

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)

## 💻 AI Technologies Used
- Groq
- OpenAI
- LangChain
- LlamaIndex
- Retrieval-Augmented Generation (RAG)

## ⚛️ Getting Started
### 📲 Instructions
<details>
<summary>How to View AI Platforms</summary>
1. Open app entry, a list of platforms are visible.  The list can be sorted in ascending or descending order by name and industry.
 
2. Click a star on an AI platform to add it to your favorites list.
 
3. Click the i icon on an AI platform to view more details about that AI platform.

4. AI platforms that have been favorites will show up in your favorites list on the "Favorites" Page.
</details>
<details>
<summary>Using the AI Chatbots</summary>
1. Navigate to the nav bar on top of the screen and click "AI Chatbots".
 
2. Four API's have been implemented using OpenAI, Groq, LLamaIndex, and LangChain.
 
3. Enter prompts into the fields to generate AI prompts based on your entry.
</details>

<details>
<summary>Deployed Link (Heroku)</summary>
<a href="https://ai-platforms-list-crud-64ab4f9bb249.herokuapp.com/platforms">https://ai-platforms-list-crud-64ab4f9bb249.herokuapp.com/platforms</a>
</details>

<details>
<summary>Trello Board</summary>
<a href="https://trello.com/invite/b/wxJJovTM/ATTIe2671fe1c19bf987e8e016b85b7b29e5F84E9127/ai-program-list">https://trello.com/invite/b/wxJJovTM/ATTIe2671fe1c19bf987e8e016b85b7b29e5F84E9127/ai-program-list</a>
</details>

# Next Steps

- [ ] Find and fix possible bugs
- [ ] Refactor code
