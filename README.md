# Adelle's website

A combination of plain html tests and a WordPress instalation.

## Insstructions Video Conversion In MacOS

### Install Homebrew

Make sure you install all requirements, and follow the instructions below (This can take a while, espcially because of XCode):

https://github.com/Homebrew/homebrew/wiki/Installation

Install homebrew to install packages for video conversion.

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

### Install FFMPEG

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

### Install FFMPEG2THEORA

Install ffmpeg2theora in order to convert mp4s to ogv for Firefox.

```
brew install ffmpeg2theora
```

## Converting Videos

Put all the videos you want to convert in:
```
converted-videos/raw-videos/un-converted
```

Run the following script (you shouldn't need to install any Python libraries):

```
python converted-videos/convert_video.py
```

When done, move all videos in ```un-converted``` to ```covnerted```.

## Deploying Site on MacOS

In order to deploy code, restart the server or restart mysql you need Fabric.

To install Fabric, first install PIP. 

```
sudo easy_install pip
```

You can also install PIP through Homebrew's python instalation.

```
brew install python
```

Then install Fabric.

```
pip install fabric
```

To actually deploy the site, make sure you have a copy of the repo and that you're in it:

```
git clone git@github.com:thejsj/Adelle.git
```

Then go to that directory and run the fabric command: 

```
cd ./Adelle
fab deploy:environment=NAME_OF_YOUR_ENVIRONMENT
```

For this a config.py file is need that has the following structure:

```python
class AttrDict(dict):
    def __init__(self, *args, **kwargs):
        super(AttrDict, self).__init__(*args, **kwargs)
        self.__dict__ = self

servers = {
    # Statging
    'NAME_OF_YOUR_ENVIRONMENT' : AttrDict({
        'host_string' : 'IP_ADDRESS',
        'user': 'USER',
        'password' : 'PASSWORD',
        'main_path' : '/var/www/NAME_OF_YOUR_SITE/public_html/',
        'theme_path' : '/var/www/NAME_OF_YOUR_SITE/public_html/content/themes/adelle-theme/'
    }),
}
```