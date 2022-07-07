from operator import index
import os
import json
import time

location = 'C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate'
dirContentName = os.listdir(location)
jsonData = []
# print(len(dirContentName))
count = len(dirContentName)
for id in range(count):
    movieName = dirContentName[id]
    #print(id) 
    print(movieName)
    # time.sleep(2)
    x = { "id": id, "location": location + "\\" + movieName }
    jsonData.append(x)
    print(jsonData)
    time.sleep(1)

filename = 'location.json'
with open(filename, "w") as file:
    # file.seek(0)
    json.dump(jsonData, file)
    time.sleep(1)
    print("successfull")   
