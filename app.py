from flask import Flask
from flask import render_template
import pandas as pd

app = Flask(__name__)

@app.route("/")
@app.route("/index.html")
def index():
	data = pd.read_csv('Data/crypto-markets.csv') 	# read csv dataset file into a pandas dataframe
	ndays = len(data[data['name']=='Bitcoin']) 		# number of days data in the dataset
	nrows = len(data) 								# number of rows of data in the dataset
	ncrypts = len(data['name'].unique()) 					# number of crypto-currency's data in the dataset
	nOne = data[data['ranknow']==1]['name'].unique()[0] 	# the number one crypto currency name
	onePrice = data[data['ranknow']==1].iloc[-1]['close']	# the price of the number one crypto currency
	oneVol = data[data['ranknow']==1].iloc[-1]['volume']	# the volume of the number on crypto currency
	del data												# delete the dataframe
	return render_template("index.html", ndays=ndays, nrows=nrows, ncrypts=ncrypts, nOne=nOne, onePrice=onePrice, oneVol=oneVol) # return the calculated values to be displayed in the index.html page

	
@app.route("/visualize.html")
def crypto_projects():
	return render_template("visualize.html") # render the visualize.html page

if __name__ == "__main__":
    app.run(host='127.0.0.1',port=80,debug=True)