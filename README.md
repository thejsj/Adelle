# Adelle's website

A combination of plain html tests and a WordPress instalation.

# Insstructions Video Conversion In MacOS

## Install Homebrew

Make sure you install all requirements, and follow the instructions below (This can take a while, espcially because of XCode):

https://github.com/Homebrew/homebrew/wiki/Installation

Install homebrew to install packages for video conversion.

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

## Install FFMPEG

Make sure brew is installed correclty and working correctly:
```
brew doctor
```

Install ffmpeg to convert videos to mp4 and webm and generate thumbnails. This may go smoothly or it may not (you've been warned!):

```
brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-openjpeg --with-theora --with-tools --with-libvpx
```

To make sure this is working, try:

```
ffmpeg -v
```

# Install FFMPEG2THEORA

Install ffmpeg2theora in order to convert mp4s to ogv for Firefox.

```
brew install ffmpeg2theora
```

# Converting Videos

Put all the videos you want to convert in:
```
converted-videos/raw-videos/un-converted
```

Run the following script (you shouldn't need to install any Python libraries):

```
python converted-videos/convert_video.py
```

When done, move all videos in ```un-converted``` to ```covnerted```.
