from flask_cors import CORS
from flask import Flask, request, render_template
from operator import index
import os
import json
from pytube import YouTube
from werkzeug.utils import secure_filename
import uuid

folder_path = 'C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate'

app = Flask(__name__)
app.config['UPLOAD_PATH'] = folder_path
app.config['MAX_CONTENT_PATH'] = 1024
CORS(app)


@app.route("/mnamesloc", methods=["GET"])
def mnames():
    location = 'C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate'
    dirContentName = os.listdir(location)
    # jsonData = []
    # print(len(dirContentName))
    # count = len(dirContentName)
    
    # for id in range(count):
    #     movieName = dirContentName[id]
    # #print(id) 
    # # print(movieName)
    # # time.sleep(2)
    #     id = "id:" + str(id)
    #     path = "location:" + location
    #     mname = "\\" + movieName 
    #     jsonData.append(id + "," + path + "," + mname)
    # jsonn = json.dumps(jsonData)
    jsonn = json.dumps(dirContentName)
    return jsonn

@app.route("/upload", methods=["GET", "POST"])
def upload():
    
    try:
      if request.method == 'POST':
        f = request.files['file']
        f.save(os.path.join(app.config['UPLOAD_PATH'], secure_filename(f.filename)))
        return 'file uploaded successfully'
           
    except Exception as e:
        print(str(e))
  
    
@app.route("/utubelink", methods=["POST"])
def url():   
    try:
       url = request.data 
       #print(type(con))
       yt = YouTube(url.decode("utf-8"))
       stream = yt.streams.get_highest_resolution()
       stream.download()
       return True,200
             
    except Exception as e:
        print(str(e))
        return "error"

# @app.route('/')
# def home():
#    return render_template("home.html");
    
if __name__ == "__main__":
    app.run(debug=True)
