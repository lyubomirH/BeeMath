from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

DEEPSEEK_API_KEY = "sk-b415c8e5a3f24486b6c1f079d26e2f03"  # ⚠️ НЕ БЕЗОПАСНО!
DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("question", "")
    try:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
        }
        
        data = {
            "model": "deepseek-chat",
            "messages": [{"role": "user", "content": user_input}],
            "temperature": 0.3
        }

        response = requests.post(DEEPSEEK_URL, json=data, headers=headers)
        response_data = response.json()
        
        if response.status_code != 200:
            return jsonify({"error": response_data.get("message", "API грешка")}), 500
            
        return jsonify({"response": response_data["choices"][0]["message"]["content"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate_problem', methods=['POST'])
def generate_problem():
    data = request.json
    difficulty = data.get('difficulty', 'easy')
    problem_type = data.get('problemType', 'arithmetic')

    prompt = f"Генерирай {difficulty} математическа задача от тип {problem_type}."

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
    }
    
    api_data = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}]
    }

    try:
        response = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            json=api_data,
            headers=headers
        )
        
        if response.status_code == 200:
            result = response.json()
            return jsonify({
                'problem': result['choices'][0]['message']['content']
            })
        else:
            return jsonify({'error': 'API Error'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)