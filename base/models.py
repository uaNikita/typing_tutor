from django.db import models

class Profile(models.Model):
    user = models.OneToOneField('auth.User')

    text_average_number_errors = models.IntegerField(default=0)
    text_minimum_number_errors = models.IntegerField(default=0)
    text_maximum_number_errors = models.IntegerField(default=0)
    lesson_average_speed = models.IntegerField(default=0)
    lesson_maximum_speed = models.IntegerField(default=0)
    lesson_minimum_speed = models.IntegerField(default=0)

    def __str__(self):
        return self.user.get_username()