from fabric.api import *
from fabric.colors import green, red
from fabric.contrib.project import rsync_project

def deploy_thejsj(): 
	"""This pushes to staging in thejsj.com""" 
	env.host_string = '107.170.18.175'
	env.user = 'root'
	env.password = 'ioiyuohbsqot'
	with cd('/var/www/thejsj.com/public_html/2013/adelle/'):
		run('pwd')
		run('git stash')
		run('git fetch --all')
		run('git reset --hard origin/master')
		run('composer install')
		run('service apache2 restart')
	with cd('/var/www/thejsj.com/public_html/2013/adelle/wp-content/themes/adelle-theme/'):
		run('npm install')
		run('bower install --allow-root')
		run('grunt staging')

def deploy_staging(): 
	"""This pushes to staging""" 
	env.host_string = '162.243.11.38'
	env.user = 'root'
	env.password = 'jhionastoxch'
	with cd('/var/www/staging.adelleninja.com/public_html/'):
		run('pwd')
		run('git stash')
		run('git fetch --all')
		run('git reset --hard origin/master')
		run('composer install')
		run('service apache2 restart')
	with cd('/var/www/staging.adelleninja.com/public_html/content/themes/adelle-theme/'):
		run('npm install')
		run('bower install --allow-root')
		run('grunt production')

def deploy_production(): 
	"""This pushes to production""" 
	env.host_string = '162.243.11.38'
	env.user = 'root'
	env.password = 'jhionastoxch'
	with cd('/var/www/adelleninja.com/public_html/'):
		run('pwd')
		run('git stash')
		run('git fetch --all')
		run('git reset --hard origin/master')
		run('composer install')
		run('service apache2 restart')
	with cd('/var/www/adelleninja.com/public_html/content/themes/adelle-theme/'):
		run('npm install')
		run('bower install --allow-root')
		run('grunt production')

def restart_mysql():
	"""Restart Mysql""" 
	env.host_string = '162.243.11.38'
	env.user = 'root'
	env.password = 'jhionastoxch'
	with cd('/'):
		run('/etc/init.d/mysql restart')

def install_dependencies():
	"""Install Nodejs""" 
	env.host_string = '162.243.11.38'
	env.user = 'root'
	env.password = 'jhionastoxch'
	with cd('/'):
		sudo('apt-get install python-software-properties')
		sudo('apt-add-repository ppa:chris-lea/node.js')
		sudo('apt-get update')
		sudo('apt-get install nodejs')
		sudo('apt-get install git') # you have to config your username and email afterwards
		sudo('apt-get install php5-json')
		sudo('apt-get install libmagickwand-dev imagemagick')
		run('npm install -g grunt-cli bower')
		run('curl -sS https://getcomposer.org/installer | php')
		run('mv composer.phar /usr/local/bin/composer')
	with cd('var/www/adelleninja.com/public_html/'):
		run('git clone git@github.com:thejsj/Adelle.git')
	with cd('var/www/staging.adelleninja.com/public_html/'):
		run('git clone git@github.com:thejsj/Adelle.git')

	