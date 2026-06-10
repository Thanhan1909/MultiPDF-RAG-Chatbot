import torch
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

from config import *

device = "cuda" if torch.cuda.is_available() else "cpu"

embedding = HuggingFaceEmbeddings(
    model_name=EMBEDDING_MODEL,
    model_kwargs={'device': device}
)

vectordb = Chroma(
    persist_directory=CHROMA_PATH,
    embedding_function=embedding
)