from flask import Flask, request, render_template, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import json
import subprocess
import os

folder_path = 'C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate'
app = Flask(__name__)
app.config['UPLOAD_PATH'] = folder_path
# app.config['MAX_CONTENT_PATH'] = 1024
app.config['MAX_CONTENT_LENGTH'] = 1024
CORS(app, origins="*")


@app.route('/favicon.png')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.png', mimetype='image/png')


@app.after_request
def add_headers(res):
    res.headers["Cache-Control"] = 'no-cache, no-store, must-revalidate'
    res.headers["Pragma"] = 'no-cache'
    res.headers["Expires"] = '0'
    return res


@app.route('/')
@app.route('/home')
def home():
    return render_template("home.html")


@app.route('/dir2')
def dir2():
    return render_template("dir.html")


@app.route('/vide0')
def video():
    return render_template('videoplayer.html')


@app.route('/play_video/<file_name>')
def play_video(file_name):
    return send_from_directory(folder_path, file_name)


@app.route('/files')
def files():
    return render_template('files.html')


@app.route('/cmd')
def cmd():
    return render_template('cmd.html')

#######################################################################


@app.route("/mnamesloc", methods=["GET", "POST"])
def mnames():
    if request.method == "POST":
        # jsondata = request.args.get('url') this is used to get the query string data in flask
        jsondata = request.form.get('url')
        data = jsondata
        dirContentName = os.listdir(data)  # get names with extensions
        jsonn = json.dumps(dirContentName)
        return jsonn

    else:
        dirContentName = os.listdir(folder_path)
        jsonn = json.dumps(dirContentName)
        return jsonn


@app.route("/upload", methods=["GET", "POST"])
def upload():
    try:
        if request.method == 'POST':
            f = request.files['file']
            f.save(os.path.join(
                app.config['UPLOAD_PATH'], secure_filename(f.filename)))
            return 'file uploaded successfully'

    except Exception as e:
        print(str(e))


@app.route("/delete", methods=["GET", "POST"])
def delete():
    try:
        if request.method == 'POST':
            f = request.get_json()
            # print(type(f))
            delType = type(f)
            length = len(f)
            # print(length)

            if (delType == list):
                for i in range(length):
                    if f[i] != ".":
                        os.rmdir(f[i])
                    else:
                        os.remove(f[i])
                return 'file deleted successfully'
            else:
                if "." not in f:
                    os.rmdir(f)

                else:
                    os.remove(f)
            return 'file deleted successfully'

    except Exception as e:
        print(str(e))


@app.route("/createFolder", methods=["GET", "POST"])
def createFolder():
    try:
        if request.method == 'POST':
            data = request.get_data()
            # decode method is used to convert byte to str
            folderName = data.decode()
            os.makedirs(folderName)
            return "{\"msg\":\"success\"}"

    except OSError:
        print('Error: Creating directory. ' + data)
        return "Failed To Create"


@app.route("/cmdProc", methods=["GET", "POST"])
def cmdProcess():
    try:
        if request.method == "POST":
            data = request.get_json()
            received_data = data['data']
            cmdOp = subprocess.run(
                received_data, shell=True, capture_output=True)
            if cmdOp.returncode == 0:
                # Command executed successfully
                output = cmdOp.stdout
                return output
            else:
                # An error occurred
                error = cmdOp.stderr
                return error

    except Exception as e:
        print(str(e))
        return "server error" + e


# createFolder(f'./{data}/')  #fstring is used here
# @app.route("/utube", methods=["POST"])
# def url():
#     try:
#        aurl = request.data
#        #print(type(con))
#        ayt = YouTube(url.decode("utf-8"))
#        astream = yt.streams.get_highest_resolution()
#        stream.download()
#        return True,200

#     except Exception as e:
#         print(str(e))
#         return "error"


if __name__ == "__main__":
    app.run(port=5000, debug=True)
