from django.db import models
from django.contrib.auth.models import User

class Statistic(models.Model):
    user = models.ForeignKey(User)

    num_errors = models.IntegerField(default=0)
    num_characters = models.IntegerField(default=0)
    max_speed_learning = models.IntegerField(default=0)
    max_speed_text = models.IntegerField(default=0)

    def __str__(self):
        return self.user.get_username()
