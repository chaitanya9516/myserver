from flask import Flask, request
from operator import index
import os
import json
from pytube import YouTube
import time

app = Flask(__name__)

@app.route("/mnamesloc")
def mnames():
    location = 'C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate'
    dirContentName = os.listdir(location)
    jsonData = []
    # print(len(dirContentName))
    count = len(dirContentName)
    for id in range(count):
        movieName = dirContentName[id]
    #print(id) 
    # print(movieName)
    # time.sleep(2)
        id = "id:" + str(id)
        path = "location:" + location
        mname = "\\" + movieName 
        jsonData.append(id + "," + path + "," + mname)

    jsonn = json.dumps(jsonData)
    return jsonn

@app.route("/utubelink", methods=["POST"])
def url():
    # url = requests.json['url']
    try:
       url = request.json["url"]
       print(url, "*** hi somethinghggg ***")
       yt = YouTube(url)
       # print(yt)
       # print(yt.streams)
       stream = yt.streams.get_highest_resolution()
       stream.download()
    except Exception as e:
	    return(str(e))
    
if __name__ == "__main__":
    app.run(debug=True)
