class AttrDict(dict):
    def __init__(self, *args, **kwargs):
        super(AttrDict, self).__init__(*args, **kwargs)
        self.__dict__ = self

servers = {
	# Thejsj
	'thejsj' : AttrDict({
		'host_string' : '107.170.18.175',
		'user': 'root',
		'password' : 'ioiyuohbsqot',
		'main_path' : '/var/www/thejsj.com/public_html/2013/adelle/',
		'theme_path' : '/var/www/thejsj.com/public_html/2013/adelle/wp-content/themes/adelle-theme/'
	}),

	# Statging
	'staging' : AttrDict({
		'host_string' : '162.243.11.38',
		'user': 'root',
		'password' : 'jhionastoxch',
		'main_path' : '/var/www/staging.adelleninja.com/public_html/',
		'theme_path' : '/var/www/staging.adelleninja.com/public_html/content/themes/adelle-theme/'
	}),

	# Production
	'production' : AttrDict({
		'host_string' : '162.243.11.38',
		'user': 'root',
		'password' : 'jhionastoxch',
		'main_path' : '/var/www/adelleninja.com/public_html/',
		'theme_path' : '/var/www/adelleninja.com/public_html/content/themes/adelle-theme/'
	})
}

