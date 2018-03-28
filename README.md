# Pi Garden
![alt text](https://slack-imgs.com/?c=1&url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FQhLi1PvRCMxsQ%2Fgiphy.gif)

Status: In progress

This app will allow you to monitor your plants using a Raspberri PI.

# Current Features
 - Time lapse photography

# Future Enhancements
 - Record temperature
 - Record humidity
 - Turn on power
 - Turn off power
 - Allow options for different times(i.e. I want to record temp and humidity
every minute but only take a picture every 5 minutes)
 - Allow scheduling of power
 - Save data to postgres DB
 - Display chart of humidity and/or temperature
 - Generate time lapse image given a specified range of time

# Functionality
Use template to generate node script which runs functions based on parameters
 - Take a picture(only when power is on)

Edit crontab file and schedule node script to run at specific time

# TODO
Allow for multiple commands in one task id
If task exists, prompt user to update or create new?
