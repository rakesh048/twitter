# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class userinfo(models.Model):
	username = models.CharField(max_length=100,unique=True,blank=False)
	email = models.CharField(max_length=100)
	age = models.IntegerField(blank=True)
	gender = models.CharField(max_length = 32,blank=True)
	following = models.ManyToManyField("self",symmetrical=False)
	mobile = models.CharField(max_length=17, blank=True)		
	last_updated = models.DateTimeField(auto_now_add=True)


	def __str__(self):
		return self.username

class tweet(models.Model):
	from tweetapp.models import userinfo as userinfo
	description = models.TextField(max_length=200)
	like = models.ManyToManyField(userinfo)
	createby = models.ForeignKey(userinfo,related_name="createby")		
	created_time = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.description



