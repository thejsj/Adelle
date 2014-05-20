import os
import json
images = {}

for root, dirs, files in os.walk( os.path.join( os.getcwd(), 'converted-videos' ) ):
    for file in files:
        if file.endswith(".png"):
        	root_name = root.split('/')[-1:][0]
        	if root_name not in images:
        		images[ root_name ] = []
        	file_number = file.split('.')[0].split('_')[1]
        	if int( file_number ) < 10:
        		images[ root_name ].append( file )
for key in images:
	images[ key ].sort()
json_string = json.dumps( images )

f = open( os.path.join( os.getcwd(), 'js/fallback-images.json' ) , 'w')
f.write( json_string )
f.close()