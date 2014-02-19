import os
import subprocess
import shlex
from lib.slugify import slugify

settings = {
    'video_width' : '120',
    'video_height' : '80',
    'frame_rate' : '12'
}

class Video:

    def __init__(self, raw_videos_directory, converted_videos_directory, file):

        self.file_extension = file[-4:]
        self.filename = file[:-4]

        self.slug = slugify(self.filename)
        self.original_absolute_filename = os.path.join(raw_videos_directory, self.filename + self.file_extension)
        self.new_absolute_filename = os.path.join(raw_videos_directory, self.slug + self.file_extension)
        self.converted_filename_mp4 = os.path.join(converted_videos_directory, self.slug + self.file_extension)
        self.converted_filename_webm = os.path.join(converted_videos_directory, self.slug + '.webm')

        self.absolute_filename =  self.original_absolute_filename

        # Convert File
        self.convert_video()

    def rename_file(self):
        os.rename(self.original_absolute_filename, self.new_absolute_filename)
        self.absolute_filename = self.new_absolute_filename

    def revert_filename(self):
        os.rename(self.new_absolute_filename, self.original_absolute_filename)
        self.absolute_filename = self.original_absolute_filename

    def convert_video(self):
        print "* Convert Video"
        cmd = "ffmpeg -i " + self.absolute_filename + " -threads 0 -vf scale="+settings['video_width']+":"+settings['video_height']+" -t 30 -an -r "+settings['frame_rate']+" " + self.converted_filename_mp4
        args = shlex.split(cmd)
        pp = subprocess.call(args)
        # print "* Converting To WebM"
        # cmd = "ffmpeg -i " + self.converted_filename_mp4 + " -threads 0 -acodec libvorbis -f webm -y " + self.converted_filename_webm
        # args = shlex.split(cmd)
        # pp = subprocess.call(args)