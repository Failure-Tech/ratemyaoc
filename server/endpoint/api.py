import os
import sys

from flask import Flask
from flask_cors import CORS

current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
sys.path.insert(0, project_root)

from scrape.department import find_departments
from scrape.faculty import find_faculty

app = Flask(__name__)
CORS(app)

@app.route("/health")
def health_check():
    return "<p>All Clear </p>"

@app.route("/departments")
def current_coc_departments():
    return find_departments("https://www.canyons.edu/academics/")

@app.route("/faculty")
def curr_coc_faculty():
    return find_faculty("https://www.canyons.edu/directory/")

if __name__ == "__main__":
    app.run(host="localhost", port=8080)