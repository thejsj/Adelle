import os
import subprocess
import shlex
from lib.slugify import slugify

settings = {
    'low' : {
        'video_width' : '120',
        'video_height' : '80',
        'frame_rate' : '12'
    }, 
    'medium' : {
        'video_width' : '240',
        'video_height' : '160',
        'frame_rate' : '12'
    },
    'high' : {
        'video_width' : '360',
        'video_height' : '240',
        'frame_rate' : '24'
    }
}

class Video:

    def __init__(self, raw_videos_directory, converted_videos_directory, file):

        self.file_extension = file[-4:]
        self.filename = file[:-4]
        self.converted_videos_directory = converted_videos_directory
        self.slug = slugify(self.filename)
        self.thumbnails_directory = os.path.join( converted_videos_directory, self.slug )

        # Video Files
        self.original_absolute_filename = os.path.join(raw_videos_directory, self.filename + self.file_extension)
        self.new_absolute_filename   = os.path.join(raw_videos_directory, self.slug + self.file_extension)

        # Thumbnails Direcotry
        self.absolute_filename =  self.original_absolute_filename

        # Rename File
        self.rename_file()

        # Convert File
        self.convert_video()

    def rename_file(self):
        os.rename(self.original_absolute_filename, self.new_absolute_filename)
        self.absolute_filename = self.new_absolute_filename

    def revert_filename(self):
        os.rename(self.new_absolute_filename, self.original_absolute_filename)
        self.absolute_filename = self.original_absolute_filename

    def get_converted_filename(self, size, file_extension):
        return os.path.join(self.converted_videos_directory, self.slug + "-" + size + file_extension)

    def convert_video(self):
        print "* Convert Video"
        for key,setting in settings.iteritems():
            # MP4
            cmd = "ffmpeg -i " + self.absolute_filename + " -threads 0 -vf \"scale="+setting['video_width']+":"+setting['video_height']+",crop="+setting['video_height']+":"+setting['video_height']+"\" -t 30 -an -r "+setting['frame_rate']+" " + self.get_converted_filename(key, '.mp4')
            args = shlex.split(cmd)
            pp = subprocess.call(args)
            # WebM
            cmd = "ffmpeg -i " + self.absolute_filename + " -threads 0 -vf \"scale="+setting['video_width']+":"+setting['video_height']+",crop="+setting['video_height']+":"+setting['video_height']+"\" -t 30 -an -r "+setting['frame_rate']+" -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis " + self.get_converted_filename(key, '.webm')
            args = shlex.split(cmd)
            pp = subprocess.call(args)
            # Ogg
            cmd = "ffmpeg2theora -o " + self.get_converted_filename(key, '.ogv') + " " + self.get_converted_filename(key, '.mp4')
            args = shlex.split(cmd)
            pp = subprocess.call(args)


        print "* Generating Thumbnails"
        # Make Direcotry
        cmd = "mkdir " + self.thumbnails_directory
        args = shlex.split(cmd)
        pp = subprocess.call(args)

        cmd = "ffmpeg -i " + self.absolute_filename + " -f image2 -vf fps=fps=1/5 " + self.thumbnails_directory + "/" + self.slug + "_%d.png"
        args = shlex.split(cmd)
        pp = subprocess.call(args)
        

