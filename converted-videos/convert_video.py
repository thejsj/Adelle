import os
from lib.video import Video

raw_videos_directory = os.path.join(os.getcwd(), "raw-videos/un-converted")
converted_videos_directory = os.path.join(os.getcwd(), "converted-videos")

for root, dirs, files in os.walk(raw_videos_directory):
    for file in files:
    	print file
        this_video = Video(raw_videos_directory, converted_videos_directory, file) 