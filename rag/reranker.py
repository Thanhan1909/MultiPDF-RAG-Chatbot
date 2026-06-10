import torch
from FlagEmbedding import FlagReranker

from config import *

device = "cuda" if torch.cuda.is_available() else "cpu"

reranker = FlagReranker(
    RERANK_MODEL,
    use_fp16=True,
    device=device
)

def rerank(question, docs):

    if not docs:
        return []

    pairs = [
        [question, d.page_content]
        for d in docs
    ]

    scores = reranker.compute_score(
        pairs
    )

    ranked = sorted(
        zip(docs, scores),
        key=lambda x: x[1],
        reverse=True
    )

    return [
        d for d, s in ranked[:FINAL_K]
    ]