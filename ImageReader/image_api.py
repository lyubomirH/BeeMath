from flask import Flask, request, jsonify
import requests
import base64
import os
from PIL import Image
import io

app = Flask(__name__)

DEEPSEEK_API_KEY = "sk-b415c8e5a3f24486b6c1f079d26e2f03"

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']

    img = Image.open(image_file)
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format=img.format)
    img_byte_arr = img_byte_arr.getvalue()
    base64_image = base64.b64encode(img_byte_arr).decode('utf-8')

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
    }
    
    data = {
        "model": "deepseek-vision",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Разчети математическата задача от тази снимка."
                    },
                    {
                        "type": "image_url",
                        "image_url": f"data:image/jpeg;base64,{base64_image}"
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            json=data,
            headers=headers
        )
        
        if response.status_code == 200:
            result = response.json()
            return jsonify({
                'text': result['choices'][0]['message']['content']
            })
        else:
            return jsonify({'error': 'API Error'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/solve_problem', methods=['POST'])
def solve_problem():
    data = request.json
    problem = data.get('problem')
    
    if not problem:
        return jsonify({'error': 'No problem provided'}), 400

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
    }
    
    data = {
        "model": "deepseek-chat",
        "messages": [
            {
                "role": "user", 
                "content": f"Реши следната математическа задача стъпка по стъпка: {problem}"
            }
        ]
    }

    try:
        response = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            json=data,
            headers=headers
        )
        
        if response.status_code == 200:
            result = response.json()
            return jsonify({
                'solution': result['choices'][0]['message']['content']
            })
        else:
            return jsonify({'error': 'API Error'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)