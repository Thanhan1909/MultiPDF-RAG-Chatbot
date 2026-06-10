import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    pipeline
)

from config import *

tokenizer = AutoTokenizer.from_pretrained(
    LLM_MODEL
)

model = AutoModelForCausalLM.from_pretrained(
    LLM_MODEL,
    device_map="auto",
    torch_dtype=torch.float16
)

generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer
)

def ask_llm(question, docs, history):

    context = "\n\n".join(
        [d.page_content for d in docs]
    )

    system_prompt = f"""You are a helpful assistant. Answer using ONLY the context provided below.

Context:
{context}"""

    messages = [
        {"role": "system", "content": system_prompt}
    ]
    messages.extend(history)
    messages.append({"role": "user", "content": question})

    prompt = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )

    output = generator(
        prompt,
        max_new_tokens=512,
        return_full_text=False
    )

    return output[0]["generated_text"].strip()