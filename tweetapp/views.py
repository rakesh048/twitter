# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout,views
from .models import *
from django.contrib.auth.decorators import login_required
import hashlib

@csrf_exempt 
def loginn(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		username = data.get('username')
		password = data.get('password')
		try:
			user = authenticate(username = username, password = password)
			if user:
			    auth_login(request, user)
			    dict_response = json.dumps({"data":{"username":username,"password":password},"success":"true"})
			    return HttpResponse(dict_response)
			else:
				dict_response = json.dumps({"data":"User not registered!! Please register first!","success":"false"})
				return HttpResponse(dict_response) 
		except:
			dict_response = json.dumps({"data":"Server Error","success":"false"})
			return HttpResponse(dict_response)


@csrf_exempt
def registeration(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		username = data.get('username')
		password = data.get('password')
		email = data.get('email')
		age = data.get('age')
		gender = data.get('gender')
		mobile = data.get('mobile')
	try:
		if username:
			user = User.objects.filter(username=username)
			if user:
				dict_response = json.dumps({"data":"User already registered!!","success":"false"})
				return HttpResponse(dict_response)
			else:
			    User.objects.create_user(username, email, password)
			    userinfo.objects.create(username=username, email=email,age=int(age),gender=gender,mobile=mobile)
			    dict_response = json.dumps({"data":"User registered successfully.. !!","success":"true"})
			    return HttpResponse(dict_response)
		else:
			dict_response = json.dumps({"data":"Username mendatory!!","success":"false"})
			return HttpResponse(dict_response)
	except:
		dict_response = json.dumps({"data":"Server Error","success":"false"})
		return HttpResponse(dict_response)

@login_required
@csrf_exempt
def follow(request,pk):
	if request.method == 'GET':
		user_to_follow = userinfo.objects.get(pk=pk)
		user_obj = userinfo.objects.get(username=request.user)
		creation = user_obj.following.add(user_to_follow)
		dict_response = json.dumps({"data":"You Follow the user","success":"true"})
		return HttpResponse(dict_response)


@login_required
@csrf_exempt
def userunfollow(request,pk):
	if request.method == 'GET':
		user_to_follow = userinfo.objects.get(pk=pk)
		user_obj = userinfo.objects.get(username=request.user)
		creation = user_obj.following.remove(user_to_follow)
		dict_response = json.dumps({"data":"You unFollow the user","success":"true"})
		return HttpResponse(dict_response)


@login_required
@csrf_exempt
def logout_view(request):
	if request.method == 'GET':
		logout(request)
		dict_response = json.dumps({"data":"User Logout !!","success":"true"})
		return HttpResponse(dict_response)

@login_required
@csrf_exempt
def create_tweet(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		description = data.get('description')
		user = data.get('user')
		if description and user:
			try:
				user_obj = userinfo.objects.get(username=user)
				tweet.objects.create(description=description,createby=user_obj)
				dict_response = json.dumps({"data":"Created Succesfully","success":"true"})
				return HttpResponse(dict_response)
			except:
				dict_response = json.dumps({"data":"User not valid","success":"false"})
				return HttpResponse(dict_response)
		else:
			dict_response = json.dumps({"data":"No Tweet Found Please create tweet!!","success":"false"})
			return HttpResponse(dict_response)


@login_required
@csrf_exempt
def suggestion(request):
	if request.method == 'GET':
		user_obj = userinfo.objects.filter(username=request.user)
		following_user = []
		f = user_obj[0].following.all()
		for i in f:	
			user_flw = userinfo.objects.filter(username=i)
			following_user.append({"user":str(user_flw[0].username),"pk":str(user_flw[0].id),"age":str(user_flw[0].age),"email":str(user_flw[0].email)})
		unfollowing_user,following_user_list,all_user_list = [],[],[]
		all_user = userinfo.objects.all()
		all_user_list,following_user_list = list(all_user),list(f)+list(user_obj)
		for i in all_user:
			if i not in following_user_list:
			    unfollowing_user.append({"user":str(i),"pk":str(i.id),"age":str(i.age),"email":str(i.email)})
		dict_response = json.dumps({"data":{"follow":following_user,"unfollow":unfollowing_user},"success":"true"})					
		return HttpResponse(dict_response)


@login_required
@csrf_exempt
def get_tweet(request):
	if request.method == 'GET':
		dict_response = {}
		user_obj = userinfo.objects.get(username=request.user)
		user_tweet = tweet.objects.filter(createby__username=request.user).select_related()
		if user_tweet[0]:
			try:
				following = user_obj.following.all()
				list_tweet = []
				for j in following:
					if j:
						following_tweet = tweet.objects.filter(createby__username=j).select_related()
						for i in following_tweet:
							following_user = {"user":str(j),"tweet":str(i),"pk":str(i.id),"count":str(i.like.count()),"like":str((True if user_obj in i.like.all() else False)).lower()}
							list_tweet.append(following_user)
							following_user={}
				for i in user_tweet:
					tweet_user = {"user":str(user_obj),"tweet":str(i),"pk":str(i.id),"count":str(i.like.count()),"like":str((True if user_obj in i.like.all() else False)).lower()}
					list_tweet.append(tweet_user)
					tweet_user = {}
				
				dict_response = json.dumps({"data":list_tweet,"success":"true"})					
				return HttpResponse(dict_response)
			except:
				list_of_tweet = []
				for i in user_tweet:
					tweet_user = {"user":str(user_obj),"tweet":str(i),"pk":str(user_obj.id)}
					list_of_tweet.append(tweet_user)
					tweet_user = {}
				
				dict_response = json.dumps({"data":list_of_tweet,"success":"true"})
				return HttpResponse(dict_response) 
		else:
			dict_response = json.dumps({"data":"No Tweet Found","success":"false"})
			return HttpResponse(dict_response)

@login_required
@csrf_exempt
def like(request,pk):
	if request.method == 'GET':
		tweet_obj = tweet.objects.get(pk=pk)
		user_obj = userinfo.objects.filter(username=request.user)
		if user_obj[0] in tweet_obj.like.all():
			tweet_obj.like.remove(user_obj[0])
		else:	
			tweet_obj.like.add(user_obj[0])
		return HttpResponse('success')
