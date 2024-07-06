from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser

# from django.core.mail import EmailMultiAlternatives
from django.db import models

# from django.dispatch import receiver
# from django.template.loader import render_to_string
# from django.urls import reverse
# from django.utils.html import strip_tags
# from django_rest_passwordreset.signals import reset_password_token_created


class CustomUser(AbstractUser):
    email = models.EmailField(max_length=200, unique=True)
    birthday = models.DateField(null=True, blank=True)
    # username = models.CharField(max_length=200, null=True, blank=True)

    # objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class ProjectManager(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Employees(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(unique=True, max_length=100)
    employees = models.ManyToManyField(Employees)
    projectmanager = models.ForeignKey(
        ProjectManager, on_delete=models.CASCADE, blank=True, null=True
    )
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
