from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from rag.loader import (
    vectordb,
    embedding
)

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

def add_pdf(path):

    pages = PyPDFLoader(path).load()

    chunks = splitter.split_documents(
        pages
    )

    if chunks:
        vectordb.add_documents(
            chunks
        )

    return len(chunks)