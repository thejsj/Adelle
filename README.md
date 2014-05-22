# Adelle's website

A combination of plain html tests and a WordPress instalation.

# Insstructions For Mac

## Install Homebrew

Install homebrew to install packages for video conversion.

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

## Install FFMPEG

Install ffmpeg to convert videos to mp4 and webm and generate thumbnails.

```
brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-openjpeg --with-theora --with-tools --with-libvpx
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

Run the following script:

```
python converted-videos/convert_video.py
```

When done, move all videos in ```un-converted``` to ```covnerted```.
