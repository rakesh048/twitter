A simplified version of Twitter with following features:

·         User is able to log in and logout.

·         User is able to follow/unfollow other users.

·         User is able to see tweets made by other users whom user is following.

·         User is able to favorite/unfavorite tweets.

To setup this application, Follow these steps(for ubuntu OS):
  
  1. Create virtualenv using virtualenv venv (here venv is name of virtual environment , we just created)
  2. Now activate that venv using this command: source venv/bin/activate (Note: don't change any directory)
  3. Now go to twitter main directory, and check whether there is requirements.txt file is there or not, if not than you are in twitter/twitter, so go back to parent directory
  4. Now if you can see requirements.txt, do pip install -r requirements.txt (Note: if you are getting error, it means you have not installed other packages properly)
  5. After successful installation, do pip freeze, and you will see same output as what is written in requirements.txt
  6. Now go to your local mysql,login there, create db name "twitter" or change setting according to your configuration in file twitter/twitter/settings.py
     This is setting which has to be modified: 
      DATABASES = {
      'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'twitter',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'USER': 'root',
        'PASSWORD': 'password',
       }}
  
  7.  Now after changing settings.py, go one directory back, there you will see manage.py file in main twitter directory
  8.  Now execute this command: python manage.py makemigrations
  9.  After this, execute python manage.py migrate
  10. Now create superuser using python manage.py createsuperuser {Note: This command is for creating admin user, so remember username, password}
  11. Now start your server using this command python manage.py runserver, this will run server at port 8000 at localhost
  12. Go to your web browser using http://127.0.0.1:8000, and explore more about our twitter app :)


  
