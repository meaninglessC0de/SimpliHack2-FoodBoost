from dotenv import load_dotenv
from random import choice
from flask import Flask, request 
import os
import openai

load_dotenv()
#openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "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"
completion = openai.Completion()



start_sequence = "\nA:"
restart_sequence = "\n\nQ: "
session_prompt="I am a highly intelligent question answering bot. \n\nQ: What is food wastage?\nA: Food wastage is when perfectly good food is thrown away.\n\nQ: What are the consequences of food wastage?\nA: Food wastage is one of the primary causes of world hunger as it leads to in-equal distribution of food. \n\nQ: What is world hunger?\nA: World hunger is when individuals in certain socio-economic classes do not have access to clear or healthy food. What is more tragic is the fact that this happens despite the fact that we already provide enough food to feed all the people in the world.\n\nQ: How does your platform work?\nA: We aim to connect restaurants or other parties who have excess food to those in need. However, our site is not only limited to food but also extends to other essential accessories such as clothes. Moreover, our implementation strives to be as efficacious and simple as possible, which sets us apart from our competitors. \n\nQ: How can I help?\nA: If you ever have excess food or clothes and have no idea of how to get rid of it, simply post an image on our site to  help your local community!\n\nQ: What do donors have to gain?\nA:  Waste disposal is expensive! By using our platform, restaurants can get rid of this expensive and unnecessary cost. Plus, charitable work is sure to fill your heart with joy.\n\nQ:  Is it easy to solve food wastage?\nA:Yes and no. It is easy to donate the food, but it is difficult to change the current system and culture that leads to food wastage in the first place.\n\nQ: How will your platform improve in the future?\nA: We wish to centralize our initiative to make food and clothes collection even simpler. Furthermore, it would be great if we could obtain sponsorship to create greater incentives for organisations to donate.\n\nQ:  What are the benefits of your platform?\n\nA: Our platform helps to reduce food wastage, which is a major problem in our world today. Not only does this help to reduce hunger, but it also helps to save money for restaurants and other businesses who would otherwise have to pay to dispose of their excess food.\n\nQ"


def ask(question, chat_log=None):
    prompt_text = f'{chat_log}{restart_sequence}: {question}{start_sequence}:'
    response = openai.Completion.create(
      engine="davinci",
      prompt=prompt_text,
      temperature=0.8,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0.3,
      stop=["\n"],
    )
    story = response['choices'][0]['text']
    return str(story)

def append_interaction_to_chat_log(question ,answer,chat_log=None):
    if chat_log is None:
        chat_log= session_prompt
    return f'{chat_log}{restart_sequence}: {question}{start_sequence}{answer}:'