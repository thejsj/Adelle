from fabric.api import *
from fabric.colors import green, red
from fabric.contrib.project import rsync_project

from config import servers # A dictonary with all your enviornments

def set_environment(environment = False):
	if environment == False:
		print "You must specify and environment to push"
	else:
		env = servers[environment]
	return env

def deploy(environment = False): 
	"""This pushes to your environment""" 
	environment = set_environment(environment)
	__deploy__(environment)

def __deploy__(environment):
	env.host_string = environment.host_string
	env.user = environment.user
	env.password = environment.password
	with cd(environment.main_path):
		run('pwd')
		run('git stash')
		run('git fetch --all')
		run('git reset --hard origin/master')
		run('composer update')
		run('composer install')
		run('service apache2 restart')
	with cd(environment.theme_path):
		run('npm install')
		run('bower install --allow-root')
		run('grunt production')

def restart_mysql(environment = False): 
	"""This pushes to your environment""" 
	environment = set_environment(environment)
	__restart_mysql__(environment)

def __restart_mysql__(environment):
	"""Restart Mysql""" 
	env.host_string = environment.host_string
	env.user = environment.user
	env.password = environment.password
	with cd('/'):
		run('/etc/init.d/mysql restart')

def install_dependencies():
	environment = set_environment(environment)
	__install_dependencies__(environment)

def __install_dependencies__():
	"""Install Nodejs""" 
	env.host_string = environment.host_string
	env.user = environment.user
	env.password = environment.password
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

	