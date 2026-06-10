chat_history = []

def save_message(role, text):

    chat_history.append({
        "role": role,
        "content": text
    })

def get_history():

    return chat_history[-10:]