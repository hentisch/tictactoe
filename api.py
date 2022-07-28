from flask import Flask, jsonify, request
from flask import request
  
app = Flask(__name__)
  
@app.route('/', methods = ['GET', 'POST'])
def home():
    if(request.method == 'GET'):
        data = "hello world"
        print(request.headers)
        return jsonify({'data': data})
  
@app.route('/home/<int:num>', methods = ['GET'])
def disp(num):
    return jsonify({'data': num**2})
  
# driver function
if __name__ == '__main__':
    app.run(debug = True)