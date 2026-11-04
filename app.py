from flask import Flask, render_template, jsonify, request
import sqlite3
import random
from datetime import datetime

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('dados.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS leituras (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        paciente TEXT,
                        temperatura REAL,
                        data_hora TEXT)''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def painel():
    return render_template('painel.html')

@app.route('/dados', methods=['POST'])
def receber_dados():
    dados = request.json
    paciente = dados['qr_code']
    temperatura = dados['temperatura']
    data_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect('dados.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO leituras (paciente, temperatura, data_hora) VALUES (?, ?, ?)",
                   (paciente, temperatura, data_hora))
    conn.commit()
    conn.close()
    return jsonify({"status": "ok"})

@app.route('/api/leituras')
def listar_leituras():
    conn = sqlite3.connect('dados.db')
    cursor = conn.cursor()
    cursor.execute("SELECT paciente, temperatura, data_hora FROM leituras ORDER BY id DESC LIMIT 10")
    rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/simular')
def simular():
    movimentos = ["frente", "trás", "esquerda", "direita", "caminhar", "parar"]
    movimento = random.choice(movimentos)
    temperatura = round(random.uniform(36.0, 39.0), 1)
    return jsonify({"movimento": movimento, "temperatura": temperatura})

if __name__ == '__main__':
    app.run(debug=True)
