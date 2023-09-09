const express = require("express");
require("dotenv").config();
const {auth} = require("../middlewares/auth.middleware")

const { Configuration, OpenAIApi } = require("openai");

const apiRouter = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

apiRouter.use(auth)

apiRouter.post("/summary", async (req, res) => {
  try {
    const { text } = req.body;

    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this:\n${text}`,
      max_tokens: 1000, // Setting the word limit
      temperature: 0.5,
    });

    if (data && data.choices && data.choices[0].text) {
      return res.status(200).json(data.choices[0].text);
    } else {
      return res.status(404).json({ msg: "No response from the AI model." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

apiRouter.post("/paragraph", async (req, res) => {
  try {
    const { text } = req.body;

    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a detail paragraph about:\n${text}`,
      max_tokens: 1000, // Setting the word limit
      temperature: 0.5,
    });

    if (data && data.choices && data.choices[0].text) {
      return res.status(200).json(data.choices[0].text);
    } else {
      return res.status(404).json({ msg: "No response from the AI model." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

apiRouter.post("/chatbot", async (req, res) => {
  try {
    const { text } = req.body;

    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `give the answer of this quiestion \n${text}`,
      max_tokens: 1000, // Setting the word limit
      temperature: 0.7,
    });

    if (data && data.choices && data.choices[0].text) {
      return res.status(200).json(data.choices[0].text);
    } else {
      return res.status(404).json({ msg: "No response from the AI model." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

apiRouter.post("/converter", async (req, res) => {
  try {
    const { text } = req.body;

    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `/* convert these instructions into javascript code \n${text}`,
      max_tokens: 1000, // Setting the word limit
      temperature: 0.7,
    });

    if (data && data.choices && data.choices[0].text) {
      return res.status(200).json(data.choices[0].text);
    } else {
      return res.status(404).json({ msg: "No response from the AI model." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

apiRouter.post("/scifiimage", async (req, res) => {
  try {
    const { text } = req.body;

    const { data } = await openai.createImage({
      // model: "text-davinci-003",
      // model: "image-alpha-001",
      prompt: `Generate a Scifi image of ${text}`,
      n:1,
      size:"512x512"
    });

    if (data && data.data && data.data[0].url) {
      // console.log("found")
      return res.status(200).json(data.data[0].url);
    } else {
      return res.status(404).json({ msg: "No response from the AI model." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

module.exports = {
  apiRouter,
};

