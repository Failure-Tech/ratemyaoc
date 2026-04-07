from flask import Flask
import RateMyProfessor_Database_APIs as rmpapi
import json

app = Flask(__name__)

@app.route("/health")
def health_check():
    return "<p>All Clear </p>"

@app.route("/ratemyprofessor")
def rmp():
    ex_school_id = "13708"
    all_profs = rmpapi.fetch_all_professors_from_a_school(ex_school_id)
    print(f"Fetched {len(all_profs)} professors")

#     with open("del.txt", "w") as f:
#         # json.dumps(all_profs)
#         f.write(str(all_profs))


if __name__ == "__main__":
    app.run(host="localhost", port=8080)