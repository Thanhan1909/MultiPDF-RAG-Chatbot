import os
from flask import (
    Flask,
    request,
    jsonify
)
from flask_cors import CORS

from rag.retriever import retrieve
from rag.reranker import rerank
from rag.llm import ask_llm
from rag.memory import get_history, save_message

from utils.citation import (
    build_sources
)

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])

def chat():
    try:
        question = request.json["question"]

        docs = retrieve(question)

        docs = rerank(
            question,
            docs
        )

        history = get_history()

        answer = ask_llm(
            question,
            docs,
            history
        )

        save_message("user", question)
        save_message("assistant", answer)

        return jsonify({
            "answer": answer,
            "sources": build_sources(docs)
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 500

from rag.upload import add_pdf

@app.route(
    "/upload",
    methods=["POST"]
)

def upload():
    try:
        file = request.files["file"]

        os.makedirs("uploads", exist_ok=True)
        path = f"uploads/{file.filename}"

        file.save(path)

        chunks = add_pdf(path)

        return jsonify({
            "status":"success",
            "chunks": chunks
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )