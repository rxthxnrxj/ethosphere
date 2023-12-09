from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    embeddings = models.BinaryField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.user.username} - {self.content[:10]}"


class Group(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(User)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Message(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.sender.username} in {self.group.name}: {self.content}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add any additional user profile fields as needed

    def __str__(self):
        return self.user.username