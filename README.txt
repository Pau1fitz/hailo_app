Please find my submission attached.

To begin with please navigate to the project directory, then type 'npm install'
and 'bower install'.

Following this you can begin running the server from the command line by navigating
to the project directory and typing 'node server'. Provided you have included
the followingentry in your machine’s hosts file:
$ echo '127.0.0.1 localhost.hailoweb.com' >> /etc/hosts
If permissions is denied follow 'sudo nano /etc/hosts' and manually enter this
to the hosts file.

Then you can view in the browser by navigating to the following link -
http://localhost.hailoweb.com:3000/

I built this application using Angular.js, and to implement the map
functionality I used angular-google-maps.

The program has also been tested using protractor. To run these tests enter the
command 'grunt --force' from the command line. You need to '--force' this command
due to jshint errors associated with the google maps API.

Overall, I really enjoyed this tech test, however there are certain things I know
could be improved upon.

First and foremost, I think the hailoApp controller is too fat and should be refactored
by utilising angular factories. Also, as a next step I need to add unit testing using
karma-jasmine. I am aware that I haven't developed this application whilst conforming
with TDD, however as I had never used the google maps API before, I felt for the purposes
of this tech test it was essential to focus on delivering the application.