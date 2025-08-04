from flask import Flask, request, jsonify, render_template
import openai
import os

app = Flask(__name__)

# Replace with your actual OpenAI API key
openai.api_key = "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"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get', methods=['GET'])
def chat():
    user_input = request.args.get('msg')
    if not user_input:
        return jsonify({"response": "Please enter a message."})
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or use gpt-4 if you have access
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ],
            temperature=0.7,
            max_tokens=150
        )
        reply = response['choices'][0]['message']['content']
        return jsonify({"response": reply.strip()})
    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
