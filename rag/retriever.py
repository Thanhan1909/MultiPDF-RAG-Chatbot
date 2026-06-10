from rag.loader import vectordb
from config import *

retriever = vectordb.as_retriever(
    search_kwargs={
        "k": TOP_K
    }
)

def retrieve(question):

    docs = retriever.invoke(question)

    return docs