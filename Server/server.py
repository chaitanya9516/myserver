from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
# from operator import index recently comment in case of any error remove it
import os
import json
from pytube import YouTube
from werkzeug.utils import secure_filename

folder_path = 'C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate'

app = Flask(__name__)
app.config['UPLOAD_PATH'] = folder_path
app.config['MAX_CONTENT_PATH'] = 1024
CORS(app)


@app.route("/mnamesloc", methods=["GET", "POST"])
def mnames():
    if request.method == "POST":
        # jsondata = request.args.get('url') this is used to get the query string data in flask
        jsondata = request.form.get('url') 
        data = jsondata
        dirContentName = os.listdir(data)  #get names with extensions
        print(dirContentName)
        jsonn = json.dumps(dirContentName)
        return jsonn
        
    else:
        location = 'C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate'
        dirContentName = os.listdir(location)  #will get names with extensions
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

@app.route("/createFolder", methods=["GET", "POST"])
def createFolder():
    data = request.get_data()
    
    # decode method is used to convert byte to str 
    folderName = data.decode()
    
    try:
        if not os.path.exists(folderName):
            os.makedirs('C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\' + folderName)
            return "{\"msg\":\"success\"}"
        
    except OSError:
        print ('Error: Creating directory. ' +  data)
        return "Failed To Create"

#createFolder(f'./{data}/')  #fstring is used here
# @app.route("/utubelink", methods=["POST"])
# def url():   
#     try:
#        aurl = request.data 
#        a#print(type(con))
#        ayt = YouTube(url.decode("utf-8"))
#        astream = yt.streams.get_highest_resolution()
#        stream.download()
#        return True,200
             
#     except Exception as e:
#         print(str(e))
#         return "error"

# @app.route('/')
# def home():
#    return render_template("home.html");
    
if __name__ == "__main__":
    app.run(debug=True)
