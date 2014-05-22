#!/bin/bash

# Input Vars
LOCAL_MYSQL_PASSWORD=$1 

# Input Vars
REMOTE_MYSQL_PASSWORD=$2 

read -p "Backup Local And Remote Databases? [Y/N] : " yn
if [ $yn = "y" -o $yn = "Y" ]; then

	timestamp_date=$(date +'%Y-%m-%d_%H-%M-%S')

	# Backbup Local Database
	mysqldump -u root -p${LOCAL_MYSQL_PASSWORD} Adelle > database-backups/local-database-backup-${timestamp_date}.sql

	# Backbup Remote Database
	mysqldump -u thejsj_adelle -h 107.170.18.175 -p${REMOTE_MYSQL_PASSWORD} thejsj_adelle > database-backups/remote-database-backup-${timestamp_date}.sql

	read -p "Push Local Database Or Pull Remote Database To Local? [push/pull] : " pupu
	if [ $pupu = "push" -o $pupu = "push" ]; then
		mysql -u thejsj_adelle -h 107.170.18.175 -p${REMOTE_MYSQL_PASSWORD} thejsj_adelle < database-backups/local-database-backup-${timestamp_date}.sql
	elif [ $pupu = "pull" -o $pupu = "pull" ]; then
		mysql -u root -p${LOCAL_MYSQL_PASSWORD} Adelle < database-backups/remote-database-backup-${timestamp_date}.sql
	fi
fi

