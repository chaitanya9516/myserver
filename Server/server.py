from flask import Flask, request, render_template, send_from_directory, render_template, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
# from werkzeug.serving import make_ssl_devcert
import json
import subprocess
import os
from dotenv import load_dotenv

load_dotenv()

folder_path = os.getenv('FOLDER_PATH')
app = Flask(__name__)
app.config['UPLOAD_PATH'] = folder_path
# app.config['MAX_CONTENT_PATH'] = 1024
app.config['MAX_CONTENT_LENGTH'] = 1024

mnamesloc = {
    "origins": ["http://192.168.0.67:5000", "http://192.168.0.68:5000", "http://localhost:5000", "http://10.77.71.61:5000", "http://10.77.24.105:5000"]
}

CORS(app, resources={r"/*": mnamesloc})
# CORS(app)


@app.route('/favicon.png')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.png', mimetype='image/png')


@app.after_request
def add_headers(res):
    # res.headers.add('Access-Control-Allow-Origin', '*')
    res.headers.add('Access-Control-Allow-Headers',
                    'Content-Type, Authorization')
    res.headers.add('Access-Control-Allow-Methods',
                    'PUT, GET, POST, DELETE, OPTIONS')
    res.headers.add('Access-Control-Expose-Headers',
                    'Content-Type, Content-Length, Authorization, X-Pagination')
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
    processed_data = request.args.get('processed_data')
    print(type(processed_data))
    html_redirect = redirect(url_for('dir2'))

    # You can return both the JSON response and perform the redirection
    return json_response, html_redirect
    # return render_template('dir.html', processed_data=processed_data)
    # return render_template("dir.html")


@app.route('/vide0')
def video():
    processed_data = request.args.get('processed_data')
    return render_template('videoplayer.html', jsonify(processed_data=processed_data))
    # return render_template('videoplayer.html')


@app.route('/play_video')
def play_video():
    file_name = request.args.get('file_name')
    return send_from_directory(folder_path, file_name, mimetype='video/mp4')


@app.route('/files')
def files():

    # absPath = safe_join(folder_path, url)

    # Change the extension to match the actual file type
    # file_path = '/path/to/your/file.html'
    # Determine the mimetype based on the file extension
    # mimetype = 'text/html'
    # return send_file(absPath, mimetype=mimetype)

    return render_template('files.html')


@app.route('/cmd')
def cmd():
    return render_template('cmd.html')

#######################################################################


@app.route("/navfunc", methods=["POST"])
def nav():
    if request.method == "POST":
        # this is used to get the query string data in flask
        data_from_ajax = request.get_json()
        video_extensions = (".mp4", ".mkv", ".flv", ".avi",
                            ".mov", ".mpeg", ".mpg")
        if any(ext in data_from_ajax for ext in video_extensions):
            # get names with extensions
            dirContentName = os.listdir(data_from_ajax)
            jsonn = json.dumps(dirContentName)
            return redirect(url_for('vide0', processed_data=jsonn))

        elif "." not in data_from_ajax:
            # get names with extensions
            dirContentName = os.listdir(data_from_ajax)
            jsonn = json.dumps(dirContentName)
            return redirect(url_for('dir2', processed_data=jsonn))


@app.route("/mnamesloc", methods=["GET", "POST"])
def mnames():
    if request.method == "POST":
        # jsondata = request.args.get('url') this is used to get the query string data in flask
        data = request.form.get('url')
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
            delType = type(f)
            length = len(f)
            if (delType == list):
                for i in range(length):
                    if f[i] != ".":
                        os.rmdir(f[i])

                    else:
                        os.remove(f[i])

                return "{\"msg\":\"successfully deleted folder\"}"

            else:
                if "." not in f:
                    os.rmdir(f)

                else:
                    os.remove(f)

                return "{\"msg\":\"successfully deleted folder\"}"

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
    app.run(host='0.0.0.0', port=5000, debug=True)
